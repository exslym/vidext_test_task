'use client';

import { useEffect, useState } from 'react';
import { useEditor } from '@tldraw/tldraw';
import { Save } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { handleSave } from '@/lib/handleSave';

interface SaveButtonProps {
	projectName?: string | null;
}

export default function SaveButton({ projectName }: SaveButtonProps) {
	const editor = useEditor();
	const [inputValue, setInputValue] = useState('');
	const [currentProjectName, setCurrentProjectName] = useState<string | null>(
		projectName || null
	);
	const router = useRouter();

	useEffect(() => {
		if (projectName) {
			setInputValue(projectName);
			setCurrentProjectName(projectName);
		}
	}, [projectName]);

	const handleSelectText = (event: React.FocusEvent<HTMLInputElement>) => {
		event.target.select();
	};

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
				className='h-10 max-w-40 border-gray-300 bg-background text-sm font-medium leading-none shadow-none dark:border-none dark:bg-gray-500 dark:placeholder-gray-300 sm:max-w-24 md:max-w-36 lg:max-w-48'
			/>

			<Button
				onClick={onSave}
				className='gap-0 rounded-lg bg-gray-secondary px-3 py-2 text-center shadow-sm hover:bg-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-500 lg:px-4'
				size='lg'
			>
				<Save size={16} />
				<p className='ml-0 hidden lg:ml-2 lg:block'>Save</p>
			</Button>
		</div>
	);
}
