'use client';

import GalleryContent from '@/app/_components/GalleryContent';
import Link from 'next/link';
import BackButton from '@/components/buttons/BackButton';
import NewProjectButton from '@/components/buttons/NewProjectButton';
import Header from '@/components/header/Header';

export default function GalleryPage() {
	return (
		<div className='flex h-screen w-full flex-col'>
			<Header>
				<nav
					aria-label='Gallery navigation'
					className='container mx-auto flex items-center justify-between'
				>
					<Link href='/' className='z-10 max-w-fit'>
						<BackButton />
					</Link>

					<Link href='/editor' className='z-10 max-w-fit'>
						<NewProjectButton />
					</Link>
				</nav>
			</Header>
			<main className='flex h-full w-full items-start justify-center bg-white px-4 dark:bg-dark-secondary dark:text-white'>
				<GalleryContent />
			</main>
		</div>
	);
}
