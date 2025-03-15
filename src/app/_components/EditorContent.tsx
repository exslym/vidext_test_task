'use client';

import { debounce } from 'lodash';
import { useTheme } from 'next-themes';

import { useCallback, useEffect } from 'react';

import { getSnapshot, loadSnapshot, useEditor } from '@tldraw/tldraw';
import '@tldraw/tldraw/tldraw.css';

import { api } from '../_utils/api';
import Error from './Error';
import Loading from './Loading';

export default function EditorContent() {
	const editor = useEditor();

	const { resolvedTheme, systemTheme } = useTheme();
	const { data, isLoading, isError } = api.getData.useQuery();
	const mutation = api.setData.useMutation();

	const debouncedSave = useCallback(
		debounce(snapshot => {
			mutation.mutate(snapshot);
		}, 500),
		[mutation],
	);

	useEffect(() => {
		if (!editor) return;

		const themeToApply =
			resolvedTheme === 'system' ? systemTheme : resolvedTheme;
		const tldrawContainer = document.querySelector('.tl-container');

		if (tldrawContainer) {
			if (themeToApply === 'dark') {
				tldrawContainer.classList.add('tl-theme__dark');
				tldrawContainer.classList.remove('tl-theme__light');
			} else {
				tldrawContainer.classList.add('tl-theme__light');
				tldrawContainer.classList.remove('tl-theme__dark');
			}
		}
	}, [editor, resolvedTheme, systemTheme]);

	useEffect(() => {
		if (!editor || !data) return;
		try {
			loadSnapshot(editor.store, data);
		} catch (error) {
			console.error('Error loading snapshot:', error);
		}
	}, [editor, data]);

	useEffect(() => {
		if (!editor) return;

		const unsubscribe = editor.store.listen(() => {
			try {
				const snapshot = getSnapshot(editor.store);
				debouncedSave(snapshot);
			} catch (error) {
				console.error('Error saving snapshot:', error);
			}
		});

		return () => {
			unsubscribe();
			debouncedSave.cancel();
		};
	}, [editor, debouncedSave]);

	if (isLoading || !editor) return <Loading />;
	if (isError) return <Error />;
}
