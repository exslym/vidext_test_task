import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { getSnapshot, loadSnapshot, useEditor } from '@tldraw/tldraw';
import { debounce } from 'lodash';
import { api } from '@/lib/api';
import { loadProject } from '@/lib/storage';

export function useEditorProject() {
	const editor = useEditor();
	const [projectName, setProjectName] = useState<string | null>(null);

	// Extracts project name from URL parameters
	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const project = params.get('project');
		setProjectName(project ? decodeURIComponent(project) : null);
	}, []);

	// Mutation to save data via API
	const mutation = api.setData.useMutation();

	// Debounced function to prevent excessive API calls
	const debouncedSave = useCallback(
		debounce(snapshot => mutation.mutate(snapshot), 500),
		[mutation]
	);

	// Debounced function to prevent excessive API calls
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
			// Clear all shapes if no project is loaded
			const shapes = editor.getCurrentPageShapes();
			editor.deleteShapes(shapes);
		} catch (error) {
			toast.error(`Error loading snapshot:\n${error}`);
		}
	}, [editor, projectName]);

	// Saves the current editor state with debounce to prevent frequent API calls
	const saveData = useCallback(() => {
		if (!editor) return;

		try {
			const snapshot = getSnapshot(editor.store);
			debouncedSave(snapshot);
		} catch (error) {
			toast.error(`Error saving snapshot:\n${error}`);
		}
	}, [editor, debouncedSave]);

	// Load project when the editor initializes
	useEffect(() => {
		if (editor) loadData();
	}, [editor, loadData]);

	// Listen for editor changes and trigger save
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
