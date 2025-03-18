import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { getSnapshot, loadSnapshot, useEditor } from '@tldraw/tldraw';
import { debounce } from 'lodash';
import { api } from '@/lib/api';
import { loadProject } from '@/lib/storage';

export function useEditorProject() {
	const editor = useEditor();
	const [projectName, setProjectName] = useState<string | null>(null);

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const project = params.get('project');
		setProjectName(project ? decodeURIComponent(project) : null);
	}, []);

	const mutation = api.setData.useMutation();

	const debouncedSave = useCallback(
		debounce(snapshot => mutation.mutate(snapshot), 500),
		[mutation]
	);

	const loadData = useCallback(() => {
		if (!editor) return;

		try {
			if (projectName) {
				const snapshot = loadProject(projectName);
				if (snapshot) {
					loadSnapshot(editor.store, snapshot);
					return;
				}
			}
			const shapes = editor.getCurrentPageShapes();
			editor.deleteShapes(shapes);
		} catch (error) {
			toast.error(`Error loading snapshot:\n${error}`);
		}
	}, [editor, projectName]);

	const saveData = useCallback(() => {
		if (!editor) return;

		try {
			const snapshot = getSnapshot(editor.store);
			debouncedSave(snapshot);
		} catch (error) {
			toast.error(`Error saving snapshot:\n${error}`);
		}
	}, [editor, debouncedSave]);

	useEffect(() => {
		if (editor) loadData();
	}, [editor, loadData]);

	useEffect(() => {
		if (!editor) return;

		const unsubscribe = editor.store.listen(saveData);
		return () => {
			unsubscribe();
			debouncedSave.cancel();
		};
	}, [editor, saveData, debouncedSave]);

	return { projectName };
}
