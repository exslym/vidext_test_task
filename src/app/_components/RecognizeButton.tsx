'use client';

import { useEditor } from '@tldraw/tldraw';
import { Button } from '@/components/ui/button';
import { api } from '../_utils/api';
import { Loader2 } from 'lucide-react';

export default function RecognizeButton() {
	const editor = useEditor();
	const mutation = api.recognizeShape.useMutation();

	const recognizeShape = async () => {
		if (!editor) return;

		const selectedShapes = editor.getSelectedShapes();

		if (selectedShapes.length === 0) {
			alert('No shape selected.');
			return;
		}

		const svgString = await editor.getSvgString(selectedShapes.map(s => s.id));
		if (!svgString?.svg) {
			alert('Could not generate SVG.');
			return;
		}

		const svgBase64 = `data:image/svg+xml;base64, ${btoa(svgString.svg)}`;

		const img = new Image();
		img.src = svgBase64;

		img.onload = () => {
			const canvas = document.createElement('canvas');
			canvas.width = img.width;
			canvas.height = img.height;

			const ctx = canvas.getContext('2d');
			ctx?.drawImage(img, 0, 0);

			const pngBase64 = canvas.toDataURL('image/png');

			mutation
				.mutateAsync({ image: pngBase64 })
				.then(response => {
					const recognizedShape = response.shape;

					if (!recognizedShape) {
						alert('Could not recognize shape.');
						return;
					}

					const bounds = editor.getShapePageBounds(selectedShapes[0].id);
					if (!bounds) {
						alert('Could not get shape bounds.');
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
				})
				.catch(error => {
					alert(`Error recognizing shape.\n${error}`);
				});
		};

		img.onerror = error => {
			alert(`Failed to load SVG as image.\n${error}`);
		};
	};

	return (
		<>
			<Button
				onClick={recognizeShape}
				disabled={mutation.isLoading}
				className='absolute right-2 top-2 z-10 translate-x-0 rounded-lg bg-green-600 px-5 py-2 text-white shadow-md transition hover:bg-green-500 sm:right-1/2 sm:translate-x-1/2'
				size={'lg'}
			>
				{mutation.isLoading && <Loader2 className='mr-2 h-5 w-5 animate-spin' />}
				{mutation.isLoading ? 'Recognizing...' : 'Recognize Shape (AI)'}
			</Button>
		</>
	);
}
