import { useEffect, useState } from 'react';
import { useEditor } from '@tldraw/tldraw';
import { useRouter } from 'next/navigation';
import { handleSave } from '@/lib/handleSave';

export function useSaveProject(initialProjectName?: string | null) {
	const editor = useEditor();
	const router = useRouter();
	const [inputValue, setInputValue] = useState('');
	const [currentProjectName, setCurrentProjectName] = useState<string | null>(
		initialProjectName || null
	);

	// Update input field when project name changes (e.g., when opening a saved project)
	useEffect(() => {
		setInputValue(initialProjectName ?? '');
	}, [initialProjectName]);

	// Handles saving the project and updating the project name in state
	const onSave = async () => {
		await handleSave(
			editor,
			inputValue,
			currentProjectName,
			(newName: string) => {
				setInputValue(newName);
				setCurrentProjectName(newName);
			},
			router
		);
	};

	// Selects the entire text when the input field is focused for quick renaming
	const handleSelectText = (event: React.FocusEvent<HTMLInputElement>) => {
		event.target.select();
	};

	return {
		inputValue,
		setInputValue,
		handleSelectText,
		onSave,
	};
}
