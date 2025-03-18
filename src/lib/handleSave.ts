import { toast } from 'react-hot-toast';
import { useEditor } from '@tldraw/tldraw';
import { getSnapshot } from '@tldraw/tldraw';
import { useRouter } from 'next/navigation';
import { getProjects, saveProject } from '@/lib/storage';

function generateUniqueName(
	baseName: string,
	projects: Record<string, unknown>
): string {
	let counter = 1;
	const nameRegex = /(.*?)(\s\((\d+)\))?$/;

	const match = baseName.match(nameRegex);
	const originalBaseName = match ? match[1] : baseName;

	const existingNumbers = Object.keys(projects)
		.map(project => {
			const projectMatch = project.match(
				new RegExp(`^${originalBaseName}\\s\\((\\d+)\\)$`)
			);
			return projectMatch ? parseInt(projectMatch[1], 10) : null;
		})
		.filter((num): num is number => num !== null);

	if (!projects[originalBaseName]) {
		return originalBaseName;
	}

	while (existingNumbers.includes(counter)) {
		counter++;
	}

	return `${originalBaseName} (${counter})`;
}

export async function handleSave(
	editor: ReturnType<typeof useEditor>,
	inputValue: string,
	projectName: string | null,
	setInputValue: (value: string) => void,
	router: ReturnType<typeof useRouter>
) {
	if (!editor) {
		toast.error('Editor is not initialized.');
		return;
	}

	try {
		const snapshot = getSnapshot(editor.store);

		const defaultName = `untitled-${new Date()
			.toISOString()
			.replace(/[:.]/g, '-')
			.slice(0, -5)}`;

		const inputName = inputValue.trim() || defaultName;

		const projects = getProjects();
		let finalName: string;

		if (projectName === inputName) {
			finalName = projectName;
		} else {
			finalName = generateUniqueName(inputName, projects);
		}

		const shapes = editor.getCurrentPageShapes();
		const svgElement = await editor.getSvg(shapes);
		const svgString = svgElement
			? new XMLSerializer().serializeToString(svgElement)
			: undefined;

		saveProject(finalName, snapshot, svgString);
		localStorage.setItem('lastEditedProject', finalName);
		router.replace(`/editor?project=${encodeURIComponent(finalName)}`);

		setInputValue(finalName);

		toast.success('Project saved successfully!');
	} catch (error) {
		toast.error(`Error saving project: ${error}`);
	}
}
