// Converts an SVG (base64 encoded) into a PNG data URL using an HTML5 canvas.
// This function helps in rendering the SVG onto a canvas and extracting it as a PNG.

export const renderSvgToCanvas = (svgBase64: string): Promise<string> => {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.src = svgBase64;

		// Handle successful image load
		img.onload = () => {
			const canvas = document.createElement('canvas');
			canvas.width = img.width;
			canvas.height = img.height;

			const ctx = canvas.getContext('2d');
			if (!ctx) {
				reject(new Error('Could not get canvas context.'));
				return;
			}

			// Draw the loaded SVG image onto the canvas
			ctx.drawImage(img, 0, 0);
			// Convert canvas content to PNG data URL and resolve
			resolve(canvas.toDataURL('image/png'));
		};

		// Handle image loading error
		img.onerror = error => {
			reject(new Error(`Failed to load SVG as image.\n${error}`));
		};
	});
};
