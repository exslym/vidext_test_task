'use client';

import { GalleryThumbnails } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function GalleryButton() {
	return (
		<Link href='/gallery' className='z-10 max-w-fit'>
			<Button
				className='rounded-lg bg-gray-secondary px-4 py-2 shadow-sm hover:bg-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-500'
				size='lg'
			>
				<GalleryThumbnails size={16} />
				Gallery
			</Button>
		</Link>
	);
}
