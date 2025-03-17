import { TLEditorSnapshot } from '@tldraw/tldraw';
import { Projects, Previews } from './types';

const STORAGE_KEY = 'tldraw_projects';
const PREVIEW_STORAGE_KEY = 'tldraw_previews';

export function saveProject(
	name: string,
	snapshot: TLEditorSnapshot,
	previewSvg?: string
) {
	const projects = getProjects();
	const previews = getPreviews();

	const now = Date.now();

	projects[name] = {
		snapshot,
		createdAt: projects[name]?.createdAt || now,
		updatedAt: now,
	};

	if (previewSvg) {
		previews[name] = previewSvg;
		localStorage.setItem(PREVIEW_STORAGE_KEY, JSON.stringify(previews));
	}

	localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

export function getProjects(): Projects {
	if (typeof window === 'undefined') return {};
	const projects = localStorage.getItem(STORAGE_KEY);
	return projects ? JSON.parse(projects) : {};
}

export function loadProject(name: string): TLEditorSnapshot | null {
	const projects = getProjects();
	return projects[name]?.snapshot || null;
}

export function deleteProject(name: string) {
	const projects = getProjects();
	const previews = getPreviews();

	delete projects[name];
	delete previews[name];

	localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
	localStorage.setItem(PREVIEW_STORAGE_KEY, JSON.stringify(previews));
}

export function getPreviews(): Previews {
	if (typeof window === 'undefined') return {};
	const previews = localStorage.getItem(PREVIEW_STORAGE_KEY);
	return previews ? JSON.parse(previews) : {};
}

export function getLastEditedProject(): string | null {
	return localStorage.getItem('lastEditedProject');
}
