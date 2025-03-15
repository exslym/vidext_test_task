'use client';

import { debounce } from 'lodash';

import { useEffect, useMemo } from 'react';

import {
	TLEditorSnapshot,
	getSnapshot,
	loadSnapshot,
	useEditor,
} from '@tldraw/tldraw';
import '@tldraw/tldraw/tldraw.css';

import { api } from '../_utils/api';

// interface EditorContentProps {
// 	data: TLEditorSnapshot | null;
// }

export default function EditorContent({
	data,
}: {
	data: TLEditorSnapshot | null;
}) {
	const editor = useEditor();
	const mutation = api.setData.useMutation();

	const debouncedSave = useMemo(
		() =>
			debounce((snapshot: TLEditorSnapshot) => {
				mutation.mutate(snapshot);
			}, 500),
		[mutation],
	);

	useEffect(() => {
		if (!editor || !data) return;
		try {
			loadSnapshot(editor.store, data);
		} catch (error) {
			alert(`Error loading snapshot:\n${error}`);
		}
	}, [editor, data]);

	useEffect(() => {
		if (!editor) return;

		const unsubscribe = editor.store.listen(() => {
			try {
				const snapshot = getSnapshot(editor.store);
				debouncedSave(snapshot);
			} catch (error) {
				alert(`Error saving snapshot:\n${error}`);
			}
		});

		return () => {
			unsubscribe();
			debouncedSave.cancel();
		};
	}, [editor, debouncedSave]);

	return null;
}
