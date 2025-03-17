import { useEditor } from '@tldraw/tldraw';
import { getSnapshot } from '@tldraw/tldraw';
import { saveProject, getProjects } from './storage';
import { useRouter } from 'next/navigation';

export async function handleSave(
	editor: ReturnType<typeof useEditor>,
	inputValue: string,
	projectName: string | null,
	setInputValue: (value: string) => void,
	router: ReturnType<typeof useRouter>
) {
	if (!editor) return;

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
	} catch (error) {
		alert(`Error saving project:\n${error}`);
	}
}
