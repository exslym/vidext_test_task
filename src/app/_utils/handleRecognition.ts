import { toast } from 'react-hot-toast';
import { renderSvgToCanvas } from '@/app/_utils/renderSvgToCanvas';
import { svgToBase64 } from '@/app/_utils/svgToBase64';
import { UseMutationResult } from '@tanstack/react-query';
import { useEditor } from '@tldraw/tldraw';

type RecognizeShapeMutation = UseMutationResult<
	{ shape?: string },
	unknown,
	{ image: string }
>;

export const handleRecognition = async (
	editor: ReturnType<typeof useEditor>,
	recognizeShapeMutation: RecognizeShapeMutation
) => {
	if (!editor) {
		toast.error('Editor is not available.');
		return;
	}

	const selectedShapes = editor.getSelectedShapes();
	if (selectedShapes.length === 0) {
		toast.error('No shape selected to recognize.');
		return;
	}

	const svgString = await editor.getSvgString(selectedShapes.map(s => s.id));
	if (!svgString?.svg) {
		toast.error('Could not generate SVG.');
		return;
	}

	const svgBase64 = svgToBase64(svgString.svg);

	try {
		const pngBase64 = await renderSvgToCanvas(svgBase64);

		const response = await recognizeShapeMutation.mutateAsync({
			image: pngBase64,
		});

		const recognizedShape = response?.shape ?? null;
		if (!recognizedShape) {
			toast.error('Could not recognize shape.');
			return;
		}

		const bounds = editor.getShapePageBounds(selectedShapes[0].id);
		if (!bounds) {
			toast.error('Could not get shape bounds.');
			return;
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
	} catch (error) {
		toast.error(`AI recognition failed:\n${error}`);
	}
};
