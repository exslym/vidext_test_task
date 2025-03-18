'use client';

import { GalleryThumbnails } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function GalleryButton({ classes }: { classes?: string }) {
	return (
		<Link href='/gallery' className='z-10 max-w-fit'>
			<Button
				className={`gap-0 rounded-lg bg-gray-secondary px-3 py-2 shadow-sm hover:bg-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-500 lg:px-4 ${classes}`}
				size='lg'
			>
				<GalleryThumbnails size={16} />
				<p className='ml-0 hidden lg:ml-2 lg:block'>Gallery</p>
			</Button>
		</Link>
	);
}
