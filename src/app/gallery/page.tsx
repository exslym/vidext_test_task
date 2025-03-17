'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getProjects, deleteProject } from '../_utils/storage';

export default function GalleryPage() {
	const [projects, setProjects] = useState<Record<string, unknown>>({});

	useEffect(() => {
		const projects = getProjects();
		setProjects(projects);
	}, []);

	const handleDelete = (name: string) => {
		deleteProject(name);

		const updatedProjects = getProjects();
		setProjects(updatedProjects);
	};

	return (
		<div className='bg-light min-h-screen p-4 dark:bg-dark-secondary'>
			<h1 className='mb-4 text-2xl font-bold'>Saved Projects</h1>

			{Object.keys(projects).length === 0 ? (
				<p>No saved projects yet.</p>
			) : (
				<ul className='space-y-2'>
					{Object.entries(projects).map(([name]) => (
						<li
							key={name}
							className='flex items-center justify-between rounded border bg-white p-2 dark:border-gray-700 dark:bg-gray-800'
						>
							<Link
								href={`/editor?project=${encodeURIComponent(name)}`}
								className='cursor-pointer text-blue-500 hover:text-blue-600'
							>
								{name}
							</Link>
							<button
								onClick={() => handleDelete(name)}
								className='ml-2 text-red-500 hover:text-red-600'
							>
								Delete
							</button>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
