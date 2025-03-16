export const applyTheme = (
	resolvedTheme: string | undefined,
	systemTheme: string | undefined,
) => {
	const themeToApply = resolvedTheme === 'system' ? systemTheme : resolvedTheme;

	if (!themeToApply) return;

	document.documentElement.setAttribute('data-theme', themeToApply);

	setTimeout(() => {
		if (document.querySelector('.tl-container')) {
			const tldrawContainer = document.querySelector('.tl-container');
			const tldrawStylePanelColors = document.querySelector(
				"[data-testid='style.color']",
			);
			const firstDefaultColor = tldrawStylePanelColors?.children[0];

			if (themeToApply === 'dark') {
				tldrawContainer?.setAttribute('data-color-mode', 'dark');
				tldrawContainer?.classList.remove('tl-theme__light');
				tldrawContainer?.classList.add('tl-theme__dark');
				firstDefaultColor?.setAttribute('style', 'color: rgb(242, 242, 242)');
			} else {
				tldrawContainer?.setAttribute('data-color-mode', 'light');
				tldrawContainer?.classList.remove('tl-theme__dark');
				tldrawContainer?.classList.add('tl-theme__light');
				firstDefaultColor?.setAttribute('style', 'color: rgb(29, 29, 29)');
			}
		}
	}, 50);
};
