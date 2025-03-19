'use client';

import { useEffect, useState } from 'react';
import { Previews, Projects } from '@/types/types';
import ProjectCard from '@/components/cards/ProjectCard';
import Selector from '@/components/selector/Selector';
import { handleDelete, sortProjects } from '@/lib/galleryUtils';
import { getPreviews, getProjects } from '@/lib/storage';

export default function GalleryContent() {
	const [projects, setProjects] = useState<Projects>({});
	const [previews, setPreviews] = useState<Previews>({});
	const [sortType, setSortType] = useState<
		'lastEdited' | 'alphabeticalAsc' | 'alphabeticalDesc' | 'createdAt'
	>('lastEdited');

	// Load saved projects and their previews from localStorage
	useEffect(() => {
		const projects = getProjects();
		const previews = getPreviews();
		setProjects(projects);
		setPreviews(previews);
	}, []);

	// Sort projects based on the selected sorting type
	const sortedProjects = sortProjects(projects, sortType);

	return (
		<section className='container flex w-full items-center justify-center py-14 text-center'>
			{Object.keys(projects).length === 0 ? (
				<h1 className='text-5xl font-bold dark:text-gray-200'>
					No saved projects yet.
				</h1>
			) : (
				<div
					className='flex w-full flex-col items-center justify-start gap-8'
					aria-labelledby='gallery-heading'
					role='region'
				>
					<h1
						id='gallery-heading'
						className='text-5xl font-bold dark:text-gray-200'
					>
						Saved Projects
					</h1>

					<Selector onSortChange={setSortType} aria-label='Sort projects' />

					<div
						role='list'
						aria-label='Project list'
						className='grid w-full grid-cols-auto-fit-238 justify-center gap-6'
					>
						{sortedProjects.map(([name, data]) => (
							<ProjectCard
								key={name}
								name={name}
								data={data}
								preview={previews[name]}
								onDelete={() => handleDelete(name, setProjects, setPreviews)}
							/>
						))}
					</div>
				</div>
			)}
		</section>
	);
}
