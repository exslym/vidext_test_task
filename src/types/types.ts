import { TLEditorSnapshot } from '@tldraw/tldraw';

export interface ProjectMetadata {
	snapshot: TLEditorSnapshot;
	createdAt: number;
	updatedAt: number;
}

export type Projects = Record<string, ProjectMetadata>;

export type Previews = Record<string, string>;
