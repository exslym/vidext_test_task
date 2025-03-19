import { toast } from 'react-hot-toast';
import { useEditor } from '@tldraw/tldraw';
import { getSnapshot } from '@tldraw/tldraw';
import { useRouter } from 'next/navigation';
import { getProjects, saveProject } from '@/lib/storage';

// Generates a unique project name by appending a counter if necessary.
// Ensures that the name does not overwrite an existing project.
function generateUniqueName(
	baseName: string,
	projects: Record<string, unknown>
): string {
	let counter = 1;
	const nameRegex = /(.*?)(\s\((\d+)\))?$/;

	const match = baseName.match(nameRegex);
	const originalBaseName = match ? match[1] : baseName;

	// Extract existing numbered project names
	const existingNumbers = Object.keys(projects)
		.map(project => {
			const projectMatch = project.match(
				new RegExp(`^${originalBaseName}\\s\\((\\d+)\\)$`)
			);
			return projectMatch ? parseInt(projectMatch[1], 10) : null;
		})
		.filter((num): num is number => num !== null);

	// If base name is available, return it directly
	if (!projects[originalBaseName]) {
		return originalBaseName;
	}

	// Increment counter until a unique name is found
	while (existingNumbers.includes(counter)) {
		counter++;
	}

	return `${originalBaseName} (${counter})`;
}

// Handles saving the current project.
// Captures the editor state and saves it locally, ensuring unique project naming.
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
		// Capture the editor state snapshot
		const snapshot = getSnapshot(editor.store);

		// Generate a default project name if none is provided
		const defaultName = `untitled-${new Date()
			.toISOString()
			.replace(/[:.]/g, '-')
			.slice(0, -5)}`;

		const inputName = inputValue.trim() || defaultName;

		// Retrieve existing projects
		const projects = getProjects();
		let finalName: string;

		// If editing the same project, keep its name; otherwise, generate a unique one
		if (projectName === inputName) {
			finalName = projectName;
		} else {
			finalName = generateUniqueName(inputName, projects);
		}

		// Generate an SVG preview of the project
		const shapes = editor.getCurrentPageShapes();
		const svgElement = await editor.getSvg(shapes);
		const svgString = svgElement
			? new XMLSerializer().serializeToString(svgElement)
			: undefined;

		// Save the project to local storage
		saveProject(finalName, snapshot, svgString);
		localStorage.setItem('lastEditedProject', finalName);

		// Update the URL to reflect the saved project
		router.replace(`/editor?project=${encodeURIComponent(finalName)}`);

		// Update input field with the final project name
		setInputValue(finalName);

		toast.success('Project saved successfully!');
	} catch (error) {
		toast.error(`Error saving project: ${error}`);
	}
}
