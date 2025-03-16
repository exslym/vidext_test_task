'use client';

import { useEffect } from 'react';

import {
	TLEditorSnapshot,
	getSnapshot,
	loadSnapshot,
	useEditor,
} from '@tldraw/tldraw';
import '@tldraw/tldraw/tldraw.css';
import { debounce } from 'lodash';

import { api } from '../_utils/api';

export default function EditorContent({
	data,
}: {
	data: TLEditorSnapshot | null;
}) {
	const editor = useEditor();

	const mutation = api.setData.useMutation();

	const debouncedSave = debounce((snapshot: TLEditorSnapshot) => {
		mutation.mutate(snapshot);
	}, 500);

	const loadData = () => {
		if (!editor || !data) return;
		try {
			loadSnapshot(editor.store, data);
		} catch (error) {
			alert(`Error loading snapshot:\n${error}`);
		}
	};

	const saveData = () => {
		if (!editor) return;
		try {
			const snapshot = getSnapshot(editor.store);
			debouncedSave(snapshot);
		} catch (error) {
			alert(`Error saving snapshot:\n${error}`);
		}
	};

	useEffect(() => {
		loadData();
	}, [editor, data]);

	useEffect(() => {
		if (!editor) return;

		const unsubscribe = editor.store.listen(saveData);

		return () => {
			unsubscribe();
			debouncedSave.cancel();
		};
	}, [editor]);

	return null;
}
