'use client';

import { useEffect, useState } from 'react';
import { handleSave } from '@/app/_utils/handleSave';
import { useEditor } from '@tldraw/tldraw';
import { Save } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

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
				className='border-lightgray h-10 max-w-40 bg-background text-sm font-medium leading-none shadow-none dark:border-none dark:bg-gray-500 dark:placeholder-gray-300 sm:max-w-24 md:max-w-36 lg:max-w-48'
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
				className='gap-0 rounded-lg bg-gray-secondary px-3 py-2 text-center shadow-sm hover:bg-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-500 lg:px-4'
				size='lg'
			>
				<Save size={16} />
				<p className='ml-0 hidden lg:ml-2 lg:block'>Save</p>
			</Button>
		</div>
	);
}
