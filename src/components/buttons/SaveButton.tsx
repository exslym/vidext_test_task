'use client';

import { Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSaveProject } from '@/hooks/useSaveProject';

interface SaveButtonProps {
	projectName?: string | null;
}

export default function SaveButton({ projectName }: SaveButtonProps) {
	const { inputValue, setInputValue, handleSelectText, onSave } =
		useSaveProject(projectName);

	return (
		<div className='relative flex items-center gap-2'>
			<Input
				type='text'
				placeholder='Enter project name'
				value={inputValue}
				onChange={e => setInputValue(e.target.value)}
				onFocus={handleSelectText}
				className='h-10 max-w-40 border-gray-300 bg-background text-sm font-medium leading-none shadow-none dark:border-none dark:bg-gray-500 dark:placeholder-gray-300 sm:max-w-24 md:max-w-40 lg:max-w-48'
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
