'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getProjects, getPreviews, deleteProject } from '@/app/_utils/storage';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GalleryContentProps {
	onProjectClick?: (name: string) => void;
}

export default function GalleryContent({
	onProjectClick,
}: GalleryContentProps) {
	const [projects, setProjects] = useState<Record<string, unknown>>({});
	const [previews, setPreviews] = useState<Record<string, string>>({});

	const handleDelete = (name: string) => {
		deleteProject(name);

		const updatedProjects = getProjects();
		const updatedPreviews = getPreviews();
		setProjects(updatedProjects);
		setPreviews(updatedPreviews);
	};

	useEffect(() => {
		const projects = getProjects();
		const previews = getPreviews();
		setProjects(projects);
		setPreviews(previews);
	}, []);

	return (
		<section className='container flex w-full items-center justify-center py-14 text-center'>
			{Object.keys(projects).length === 0 ? (
				<h1 className='text-5xl font-bold dark:text-gray-200'>
					No saved projects yet.
				</h1>
			) : (
				<div className='flex w-full flex-col items-center justify-start space-y-10'>
					<h1 className='text-5xl font-bold dark:text-gray-200'>
						Saved Projects
					</h1>
					<ul className='grid-cols-auto-fit-238 grid w-full justify-center gap-6'>
						{Object.entries(projects).map(([name]) => (
							<li
								key={name}
								className='bg-light relative flex h-auto w-full items-center justify-center rounded-lg border border-gray-100 p-4 shadow-lg transition-transform hover:scale-105 dark:border-gray-600 dark:bg-gray-800'
							>
								<Link
									href={`/editor?project=${encodeURIComponent(name)}`}
									className='flex h-full w-full cursor-pointer flex-col items-start justify-between gap-3 text-gray-700 hover:text-blue-400 dark:text-gray-400 hover:dark:text-gray-300'
									onClick={() => onProjectClick?.(name)}
								>
									<div className='bg-light flex h-auto w-full items-center justify-center overflow-hidden rounded bg-gray-50 dark:bg-dark-secondary'>
										<div
											className='svg-container'
											dangerouslySetInnerHTML={{ __html: previews[name] || '' }}
										></div>
									</div>
									<p className='text-md w-10/12 truncate text-left leading-normal'>
										{name}
									</p>
								</Link>

								<Button
									onClick={() => handleDelete(name)}
									className='absolute bottom-2 right-2 bg-transparent p-2 text-red-500 shadow-none hover:bg-transparent'
									title='delete'
								>
									<Trash2 size={22} />
								</Button>
							</li>
						))}
					</ul>
				</div>
			)}
		</section>
	);
}
