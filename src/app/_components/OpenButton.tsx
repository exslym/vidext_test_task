'use client';

import { useEffect, useState } from 'react';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { getLastEditedProject } from '@/app/_utils/storage';

export default function OpenButton() {
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
				className='w-36 rounded-lg bg-gray-secondary px-4 py-2 text-center shadow-sm hover:bg-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-500'
				size='lg'
			>
				Open Editor
				<ArrowRight size={18} />
			</Button>
		</Link>
	);
}
