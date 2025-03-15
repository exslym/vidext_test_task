export const renderSvgToCanvas = (svgBase64: string): Promise<string> => {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.src = svgBase64;

		img.onload = () => {
			const canvas = document.createElement('canvas');
			canvas.width = img.width;
			canvas.height = img.height;

			const ctx = canvas.getContext('2d');
			if (!ctx) {
				reject(new Error('Could not get canvas context.'));
				return;
			}

			ctx.drawImage(img, 0, 0);
			resolve(canvas.toDataURL('image/png'));
		};

		img.onerror = error => {
			reject(new Error(`Failed to load SVG as image.\n${error}`));
		};
	});
};
