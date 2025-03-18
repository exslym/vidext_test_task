import { toast } from 'react-hot-toast';
import { Previews, Projects } from '@/types/types';
import { TLEditorSnapshot } from '@tldraw/tldraw';

const STORAGE_KEY = 'tldraw_projects';
const PREVIEW_STORAGE_KEY = 'tldraw_previews';

function safeParse<T>(key: string, defaultValue: T): T {
	try {
		const item = localStorage.getItem(key);
		return item ? JSON.parse(item) : defaultValue;
	} catch (error) {
		toast.error(`Failed to load data from storage.\n${error}`);
		return defaultValue;
	}
}

export function saveProject(
	name: string,
	snapshot: TLEditorSnapshot,
	previewSvg?: string
) {
	try {
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
	} catch (error) {
		toast.error(`Failed to save project "${name}".\n${error}`);
	}
}

export function getProjects(): Projects {
	if (typeof window === 'undefined') return {};
	return safeParse<Projects>(STORAGE_KEY, {});
}

export function loadProject(name: string): TLEditorSnapshot | null {
	try {
		const projects = getProjects();
		return projects[name]?.snapshot || null;
	} catch (error) {
		toast.error(`Failed to load project "${name}".\n${error}`);
		return null;
	}
}

export function deleteProject(name: string) {
	try {
		const projects = getProjects();
		const previews = getPreviews();

		delete projects[name];
		delete previews[name];

		localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
		localStorage.setItem(PREVIEW_STORAGE_KEY, JSON.stringify(previews));
	} catch (error) {
		toast.error(`Failed to delete project "${name}".\n${error}`);
	}
}

export function getPreviews(): Previews {
	if (typeof window === 'undefined') return {};
	return safeParse<Previews>(PREVIEW_STORAGE_KEY, {});
}

export function getLastEditedProject(): string | null {
	try {
		return localStorage.getItem('lastEditedProject');
	} catch (error) {
		toast.error(`Failed to retrieve the last edited project.\n${error}`);
		return null;
	}
}
