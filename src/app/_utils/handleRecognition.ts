import { UseMutationResult } from '@tanstack/react-query';
import { useEditor } from '@tldraw/tldraw';

import { renderSvgToCanvas } from './renderSvgToCanvas';
import { svgToBase64 } from './svgToBase64';

type RecognizeShapeMutation = UseMutationResult<
	{ shape?: string },
	unknown,
	{ image: string }
>;

export const handleRecognition = async (
	editor: ReturnType<typeof useEditor>,
	recognizeShapeMutation: RecognizeShapeMutation,
) => {
	if (!editor) {
		throw new Error('Editor is not available.');
	}

	const selectedShapes = editor.getSelectedShapes();
	if (selectedShapes.length === 0) {
		throw new Error('No shape selected to recognize.');
	}

	const svgString = await editor.getSvgString(selectedShapes.map(s => s.id));
	if (!svgString?.svg) {
		throw new Error('Could not generate SVG.');
	}

	const svgBase64 = svgToBase64(svgString.svg);
	const pngBase64 = await renderSvgToCanvas(svgBase64);

	let response;
	try {
		response = await recognizeShapeMutation.mutateAsync({ image: pngBase64 });
	} catch (error) {
		alert(`Error during AI recognition:\n${error}`);
		throw new Error('AI recognition failed.');
	}

	const recognizedShape = response?.shape ?? null;
	if (!recognizedShape) {
		throw new Error('Could not recognize shape.');
	}

	const bounds = editor.getShapePageBounds(selectedShapes[0].id);
	if (!bounds) {
		throw new Error('Could not get shape bounds.');
	}

	editor.batch(() => {
		editor.deleteShapes(selectedShapes.map(shape => shape.id));

		editor.createShape({
			type: 'geo',
			props: {
				geo: recognizedShape,
				w: bounds.width,
				h: bounds.height,
			},
			x: bounds.x,
			y: bounds.y,
		});
	});
};
