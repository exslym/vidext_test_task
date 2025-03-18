'use client';

import { Pencil } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NewProjectButton({ classes }: { classes?: string }) {
	return (
		<Link href='/editor' className='z-10 h-full max-w-fit'>
			<Button
				size='lg'
				className={`gap-0 rounded-lg bg-gray-secondary px-3 py-2 text-center shadow-sm hover:bg-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-500 lg:px-4 ${classes}`}
			>
				<Pencil size={16} />
				<p className='ml-0 hidden lg:ml-2 lg:block'>New Project</p>
			</Button>
		</Link>
	);
}
