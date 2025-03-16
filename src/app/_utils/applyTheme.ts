export function applyTheme(
	theme: 'light' | 'dark',
	tldrawElement: HTMLElement
) {
	tldrawElement.setAttribute('data-color-mode', theme);
	tldrawElement.classList.remove('tl-theme__light', 'tl-theme__dark');
	tldrawElement.classList.add(`tl-theme__${theme}`);
}
