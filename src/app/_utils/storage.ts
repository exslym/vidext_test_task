import { TLEditorSnapshot } from '@tldraw/tldraw';

const STORAGE_KEY = 'tldraw_projects';

export function saveProject(name: string, snapshot: TLEditorSnapshot) {
	const projects = getProjects();
	projects[name] = snapshot;
	localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

export function getProjects(): Record<string, TLEditorSnapshot> {
	if (typeof window === 'undefined') return {};
	const projects = localStorage.getItem(STORAGE_KEY);
	return projects ? JSON.parse(projects) : {};
}

export function loadProject(name: string): TLEditorSnapshot | null {
	const projects = getProjects();
	return projects[name] || null;
}

export function deleteProject(name: string) {
	const projects = getProjects();
	delete projects[name];
	localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

export function getLastEditedProject(): string | null {
	return localStorage.getItem('lastEditedProject');
}
