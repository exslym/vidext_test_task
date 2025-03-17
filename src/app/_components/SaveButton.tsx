'use client';

import { useEditor } from '@tldraw/tldraw';
import { getSnapshot } from '@tldraw/tldraw';
import { saveProject, getProjects } from '../_utils/storage';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { Save } from 'lucide-react';

interface SaveButtonProps {
	projectName?: string | null;
}

export default function SaveButton({ projectName }: SaveButtonProps) {
	const editor = useEditor();
	const [inputValue, setInputValue] = useState('');
	const router = useRouter();

	useEffect(() => {
		if (projectName) {
			setInputValue(projectName);
		}
	}, [projectName]);

	const handleSelectText = (event: React.FocusEvent<HTMLInputElement>) => {
		event.target.select();
	};

	const handleSave = () => {
		if (!editor) return;

		try {
			const snapshot = getSnapshot(editor.store);

			const defaultName = `untitled-${new Date()
				.toISOString()
				.replace(/[:.]/g, '-')
				.slice(0, -5)}`; // untitled-YYYY-MM-DDTHH-mm-ss

			let finalName = inputValue.trim() || defaultName;

			const projects = getProjects();
			if (finalName !== projectName && projects[finalName]) {
				let counter = 1;
				while (projects[finalName]) {
					finalName = `${inputValue.trim()} (${counter})`;
					counter++;
				}
			}

			saveProject(finalName, snapshot);
			localStorage.setItem('lastEditedProject', finalName);
			router.replace(`/editor?project=${encodeURIComponent(finalName)}`);

			alert(`Project "${finalName}" saved successfully!`);

			setInputValue(finalName);
		} catch (error) {
			alert(`Error saving project:\n${error}`);
		}
	};

	return (
		<div className='relative flex items-center gap-2'>
			<Input
				type='text'
				placeholder='Enter project name'
				value={inputValue}
				onChange={e => {
					setInputValue(e.target.value);
				}}
				onFocus={handleSelectText}
				className='border-lightgray h-10 bg-background font-medium leading-none shadow-none'
			/>

			<Button
				onClick={handleSave}
				className='w-28 rounded-lg bg-gray-secondary px-4 py-2 text-center shadow-sm hover:bg-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-500'
				size='lg'
			>
				<Save size={16} />
				Save
			</Button>
		</div>
	);
}
