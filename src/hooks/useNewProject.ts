import { useEditor } from '@tldraw/tldraw';
import { useRouter } from 'next/navigation';

export function useNewProject(onResetProjectName: () => void) {
	const editor = useEditor();
	const router = useRouter();

	// Handles creating a new project by clearing the editor and resetting the state
	const handleNewProject = () => {
		if (editor) {
			// Remove all existing shapes from the current page
			const shapes = editor.getCurrentPageShapes();
			editor.deleteShapes(shapes.map(shape => shape.id));

			// Adjust view to fit the cleared canvas
			editor.zoomToFit();

			// Mark history stopping point to prevent undo issues
			editor.markHistoryStoppingPoint();
		}

		// Reset the project name to ensure a clean start
		onResetProjectName();
		setTimeout(onResetProjectName, 0);

		// Redirect to the editor page to reflect the new project state
		router.replace('/editor');
	};

	return { handleNewProject };
}
