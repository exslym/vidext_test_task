'use client';

import { ProjectMetadata } from '@/types/types';
import { Trash2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/galleryUtils';

interface ProjectCardProps {
	name: string;
	data: ProjectMetadata;
	preview: string | undefined;
	onDelete: () => void;
}

export default function ProjectCard({
	name,
	data,
	preview,
	onDelete,
}: ProjectCardProps) {
	const formattedDate = formatDate(data.updatedAt);

	return (
		<div
			className='bg-light relative flex h-auto w-full items-center justify-center truncate rounded-lg border border-gray-100 p-4 text-left text-gray-700 shadow-lg transition-transform hover:scale-105 hover:text-blue-400 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 hover:dark:text-gray-300'
			role='listitem'
		>
			<Link
				href={`/editor?project=${encodeURIComponent(name)}`}
				className='flex h-full w-full cursor-pointer flex-col items-start justify-between gap-3'
				aria-label={`Open project "${name}"`}
			>
				<div className='flex h-full max-h-36 w-full items-center justify-center overflow-hidden rounded-md bg-gray-50 dark:bg-dark-secondary'>
					{preview ? (
						<div
							className='svg-container max-h-full max-w-full object-contain'
							dangerouslySetInnerHTML={{ __html: preview }}
							aria-label={`Preview of ${name}`}
						></div>
					) : (
						<div
							className='flex h-36 w-full items-center justify-center text-gray-400 dark:text-gray-400'
							aria-label='No preview available'
						>
							<span>No preview available</span>
						</div>
					)}
				</div>

				<p className='text-md w-10/12 leading-normal'>{name}</p>

				<p className='w-10/12 text-sm leading-tight'>
					Last edited: {formattedDate}
				</p>
			</Link>

			<Button
				onClick={onDelete}
				className='absolute bottom-2 right-2 bg-transparent p-2 text-red-500 shadow-none hover:bg-transparent'
				title='delete'
				role='button'
			>
				<Trash2 size={24} aria-hidden='true' />
			</Button>
		</div>
	);
}
