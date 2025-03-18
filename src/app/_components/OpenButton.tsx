'use client';

import { useEffect, useState } from 'react';
import { getLastEditedProject } from '@/app/_utils/storage';
import { Pencil } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function OpenButton({ classes }: { classes: string }) {
	const [lastProjectName, setLastProjectName] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const lastEditedProject = getLastEditedProject();
		setLastProjectName(lastEditedProject);
	}, []);

	const handleClick = () => {
		setLoading(true);
	};

	return (
		<Link
			href={
				lastProjectName
					? `/editor?project=${encodeURIComponent(lastProjectName)}`
					: '/editor'
			}
			className='z-10 h-full max-w-fit'
		>
			<Button
				onClick={handleClick}
				disabled={loading}
				size='lg'
				className={`gap-0 rounded-lg bg-gray-secondary px-3 py-2 text-center shadow-sm hover:bg-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-500 lg:px-4 ${classes}`}
			>
				<Pencil size={16} />
				<p className='ml-0 hidden lg:ml-2 lg:block'>Open Editor</p>
			</Button>
		</Link>
	);
}
