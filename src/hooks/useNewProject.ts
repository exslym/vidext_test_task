import { useEditor } from '@tldraw/tldraw';
import { useRouter } from 'next/navigation';

export function useNewProject(onResetProjectName: () => void) {
	const editor = useEditor();
	const router = useRouter();

	const handleNewProject = () => {
		if (editor) {
			const shapes = editor.getCurrentPageShapes();
			editor.deleteShapes(shapes.map(shape => shape.id));

			editor.zoomToFit();
			editor.markHistoryStoppingPoint();
		}

		onResetProjectName();
		setTimeout(onResetProjectName, 0);

		router.replace('/editor');
	};

	return { handleNewProject };
}
