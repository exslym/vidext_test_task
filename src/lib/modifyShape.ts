import { toast } from 'react-hot-toast';
import { shapeSequence } from '@/constants/shapes';
import { TLGeoShape, TLShapeId, useEditor } from '@tldraw/tldraw';

// Modifies the currently selected geometric shape in the editor.
// The shape cycles to the next available shape in `shapeSequence`.
export function modifyShape(editor: ReturnType<typeof useEditor>) {
	if (!editor) {
		toast.error('Editor is not initialized.');
		return;
	}

	// Get the currently selected shapes
	const selectedShapes = editor.getSelectedShapes();

	// Ensure at least one shape is selected
	if (selectedShapes.length === 0) {
		toast.error('No shape selected to modify.');
		return;
	}

	const shape = selectedShapes[0];

	// Ensure the selected shape is of type "geo"
	if (shape.type !== 'geo') {
		toast.error('Selected shape is not a geometric shape.');
		return;
	}

	const currentShape = (shape as TLGeoShape).props.geo;
	const currentIndex = shapeSequence.indexOf(currentShape);

	// If the shape type is not found in shapeSequence, return an error
	if (currentIndex === -1) {
		toast.error('Unknown shape type.');
		return;
	}

	// Determine the next shape in the sequence, cycling back to the start if at the end
	const nextShape = shapeSequence[(currentIndex + 1) % shapeSequence.length];

	try {
		// Update the shape to the next in the sequence
		editor.updateShape({
			id: shape.id as TLShapeId,
			type: 'geo',
			props: { geo: nextShape },
		});
	} catch (error) {
		toast.error(`Error modifying shape: ${error}`);
	}
}
