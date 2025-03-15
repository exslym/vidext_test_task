export const svgToBase64 = (svgString: string): string => {
	return `data:image/svg+xml;base64,${btoa(svgString)}`;
};
