import { toast } from 'react-hot-toast';
import { getProjects, saveProject } from '@/app/_utils/storage';
import { useEditor } from '@tldraw/tldraw';
import { getSnapshot } from '@tldraw/tldraw';
import { useRouter } from 'next/navigation';

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
			.slice(0, -5)}`; // untitled-YYYY-MM-DDTHH-mm-ss

		let finalName = inputValue.trim() || defaultName;

		const projects = getProjects();
		if (finalName !== projectName && projects[finalName]) {
			let counter = 1;
			while (projects[finalName]) {
				finalName = `${inputValue.trim()} (${counter})`;
				counter++;
			}
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
