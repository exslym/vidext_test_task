import { shapeSequence } from '@/constants/shapes';
import { TLGeoShape, TLShapeId, useEditor } from '@tldraw/tldraw';
import { toast } from 'react-hot-toast';

export function modifyShape(editor: ReturnType<typeof useEditor>) {
	if (!editor) {
		toast.error('Editor is not initialized.');
		return;
	}

	const selectedShapes = editor.getSelectedShapes();

	if (selectedShapes.length === 0) {
		toast.error('No shape selected to modify.');
		return;
	}

	const shape = selectedShapes[0];

	if (shape.type !== 'geo') {
		toast.error('Selected shape is not a geometric shape.');
		return;
	}

	const currentShape = (shape as TLGeoShape).props.geo;
	const currentIndex = shapeSequence.indexOf(currentShape);

	if (currentIndex === -1) {
		toast.error('Unknown shape type.');
		return;
	}

	const nextShape = shapeSequence[(currentIndex + 1) % shapeSequence.length];

	try {
		editor.updateShape({
			id: shape.id as TLShapeId,
			type: 'geo',
			props: { geo: nextShape },
		});
	} catch (error) {
		toast.error(`Error modifying shape: ${error}`);
	}
}
