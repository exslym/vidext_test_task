'use client';

import BackButton from '@/app/_components/BackButton';
import GalleryContent from '@/app/_components/GalleryContent';
import Header from '@/app/_components/Header';
import OpenButton from '@/app/_components/OpenButton';

export default function GalleryPage() {
	return (
		<div className='flex h-screen w-full flex-col'>
			<Header>
				<nav
					aria-label='Gallery navigation'
					className='container mx-auto flex items-center justify-between'
				>
					<BackButton />
					<div className='flex items-center gap-2'>
						<OpenButton />
					</div>
				</nav>
			</Header>
			<main className='flex h-full w-full items-start justify-center bg-white px-4 dark:bg-dark-secondary dark:text-white'>
				<GalleryContent />
			</main>
		</div>
	);
}
