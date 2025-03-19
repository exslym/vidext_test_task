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

	useEffect(() => {
		setInputValue(initialProjectName ?? '');
	}, [initialProjectName]);

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
