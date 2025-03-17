'use client';

import { useEditor } from '@tldraw/tldraw';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { Save } from 'lucide-react';
import { handleSave } from '@/app/_utils/handleSave';

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
				className='border-lightgray h-10 bg-background font-medium leading-none shadow-none dark:border-none dark:bg-gray-500 dark:placeholder-gray-300'
			/>

			<Button
				onClick={() =>
					handleSave(
						editor,
						inputValue,
						projectName ?? null,
						setInputValue,
						router
					)
				}
				className='rounded-lg bg-gray-secondary px-4 py-2 text-center shadow-sm hover:bg-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-500'
				size='lg'
			>
				<Save size={16} />
				Save
			</Button>
		</div>
	);
}
