'use client';

import { useEffect, useState } from 'react';
import {
	TLEditorSnapshot,
	getSnapshot,
	loadSnapshot,
	useEditor,
} from '@tldraw/tldraw';
import '@tldraw/tldraw/tldraw.css';
import { debounce } from 'lodash';
import { loadProject } from '../_utils/storage';
import { api } from '../_utils/api';
import { toast } from 'react-hot-toast';

export default function EditorContent({
	data,
}: {
	data: TLEditorSnapshot | null;
}) {
	const editor = useEditor();
	const [projectName, setProjectName] = useState<string | null>(null);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const params = new URLSearchParams(window.location.search);
			const project = params.get('project');
			if (project) {
				setProjectName(decodeURIComponent(project));
			}
		}
	}, []);

	const mutation = api.setData.useMutation();

	const debouncedSave = debounce((snapshot: TLEditorSnapshot) => {
		mutation.mutate(snapshot);
	}, 500);

	const loadData = () => {
		if (!editor) return;

		try {
			if (projectName) {
				const snapshot = loadProject(projectName);
				if (snapshot) {
					loadSnapshot(editor.store, snapshot);
				}
			} else if (data) {
				loadSnapshot(editor.store, data);
			}
		} catch (error) {
			toast.error(`Error loading snapshot:\n${error}`);
		}
	};

	const saveData = () => {
		if (!editor) return;

		try {
			const snapshot = getSnapshot(editor.store);
			debouncedSave(snapshot);
		} catch (error) {
			toast.error(`Error saving snapshot:\n${error}`);
		}
	};

	useEffect(() => {
		if (projectName) {
			loadData();
		}
	}, [projectName, editor]);

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
