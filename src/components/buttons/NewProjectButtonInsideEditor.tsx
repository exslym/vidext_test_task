'use client';

import { Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNewProject } from '@/hooks/useNewProject';

type NewProjectButtonInsideEditorProps = {
	onResetProjectName: () => void;
};

export default function NewProjectButtonInsideEditor({
	onResetProjectName,
}: NewProjectButtonInsideEditorProps) {
	const { handleNewProject } = useNewProject(onResetProjectName);

	return (
		<Button
			size='lg'
			onClick={handleNewProject}
			className='gap-0 rounded-lg bg-gray-secondary px-3 py-2 text-center shadow-sm hover:bg-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-500 lg:px-4'
		>
			<Pencil size={16} />
			<p className='ml-0 hidden lg:ml-2 lg:block'>New</p>
		</Button>
	);
}
