import { TLEditorSnapshot } from '@tldraw/tldraw';

export function isTLEditorSnapshot(data: unknown): data is TLEditorSnapshot {
	if (typeof data !== 'object' || data === null) return false;
	if (!('document' in data) || !('session' in data)) return false;

	if (typeof (data as TLEditorSnapshot).document !== 'object') return false;
	if (typeof (data as TLEditorSnapshot).session !== 'object') return false;

	return true;
}
