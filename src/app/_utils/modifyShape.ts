import { shapeSequence } from '@/constants/shapes';
import { TLGeoShape, TLShapeId, useEditor } from '@tldraw/tldraw';

export function modifyShape(editor: ReturnType<typeof useEditor>) {
	if (!editor) return;

	const selectedShapes = editor.getSelectedShapes();

	if (selectedShapes.length === 0) {
		alert('No shape selected to modify.');
		return;
	}

	const shape = selectedShapes[0];

	if (shape.type !== 'geo') {
		alert('Selected shape is not a geometric shape.');
		return;
	}

	const currentShape = (shape as TLGeoShape).props.geo;
	const currentIndex = shapeSequence.indexOf(currentShape);

	if (currentIndex === -1) {
		alert('Unknown shape type.');
		return;
	}

	const nextShape = shapeSequence[(currentIndex + 1) % shapeSequence.length];

	editor.updateShape({
		id: shape.id as TLShapeId,
		type: 'geo',
		props: { geo: nextShape },
	});
}
