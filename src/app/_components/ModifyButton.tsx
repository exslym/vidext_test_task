'use client';

import { shapeSequence } from '@/constants/shapes';
import { TLGeoShape, TLShapeId, useEditor } from '@tldraw/tldraw';

import { Button } from '@/components/ui/button';

export default function ModifyButton() {
	const editor = useEditor();

	const modifyShape = () => {
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

		const nextShape = shapeSequence[(currentIndex + 1) % shapeSequence.length];

		editor.updateShape({
			id: shape.id as TLShapeId,
			type: 'geo',
			props: { geo: nextShape },
		});
	};

	return (
		<Button
			onClick={modifyShape}
			className='w-max-fit relative z-10 rounded-lg bg-blue-primary px-4 py-2 text-center text-white shadow-sm transition hover:bg-blue-400'
			size={'lg'}
		>
			Modify Shape
		</Button>
	);
}
