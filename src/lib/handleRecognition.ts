import { toast } from 'react-hot-toast';
import { UseMutationResult } from '@tanstack/react-query';
import { useEditor } from '@tldraw/tldraw';
import { renderSvgToCanvas } from '@/lib/renderSvgToCanvas';
import { svgToBase64 } from '@/lib/svgToBase64';

type RecognizeShapeMutation = UseMutationResult<
	{ shape?: string },
	unknown,
	{ image: string }
>;

// Handles shape recognition using AI.
export const handleRecognition = async (
	editor: ReturnType<typeof useEditor>,
	recognizeShapeMutation: RecognizeShapeMutation
) => {
	if (!editor) {
		toast.error('Editor is not available.');
		return;
	}

	// Get selected shapes
	const selectedShapes = editor.getSelectedShapes();
	if (selectedShapes.length === 0) {
		toast.error('No shape selected to recognize.');
		return;
	}

	// Convert selected shapes to SVG string
	const svgString = await editor.getSvgString(selectedShapes.map(s => s.id));
	if (!svgString?.svg) {
		toast.error('Could not generate SVG.');
		return;
	}

	// Convert SVG to Base64 format
	const svgBase64 = svgToBase64(svgString.svg);

	try {
		// Convert SVG to PNG Base64 for AI recognition
		const pngBase64 = await renderSvgToCanvas(svgBase64);

		// Send image to AI for recognition
		const response = await recognizeShapeMutation.mutateAsync({
			image: pngBase64,
		});

		const recognizedShape = response?.shape ?? null;
		if (!recognizedShape) {
			toast.error('Could not recognize shape.');
			return;
		}

		// Get the bounding box of the selected shape
		const bounds = editor.getShapePageBounds(selectedShapes[0].id);
		if (!bounds) {
			toast.error('Could not get shape bounds.');
			return;
		}

		// Replace the selected shape with the recognized one
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
	} catch (error) {
		toast.error(`AI recognition failed:\n${error}`);
	}
};
