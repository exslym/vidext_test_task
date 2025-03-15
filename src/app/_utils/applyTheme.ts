export const applyTheme = (
	resolvedTheme: string | undefined,
	systemTheme: string | undefined,
) => {
	const themeToApply = resolvedTheme === 'system' ? systemTheme : resolvedTheme;

	if (!themeToApply) return;

	document.documentElement.setAttribute('data-theme', themeToApply);

	setTimeout(() => {
		const tldrawContainer = document.querySelector('.tl-container');

		if (tldrawContainer) {
			if (themeToApply === 'dark') {
				tldrawContainer.setAttribute('data-color-mode', 'dark');
				tldrawContainer.classList.add('tl-theme__dark');
				tldrawContainer.classList.remove('tl-theme__light');
			} else {
				tldrawContainer.setAttribute('data-color-mode', 'light');
				tldrawContainer.classList.add('tl-theme__light');
				tldrawContainer.classList.remove('tl-theme__dark');
			}
		}
	}, 50);
};
