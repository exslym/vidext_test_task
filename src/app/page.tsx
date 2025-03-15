'use client';

import Header from '@/app/_components/Header';
import OpenButton from '@/app/_components/OpenButton';
import ThemeToggle from '@/components/ThemeToggle';
import Link from 'next/link';
import Hero from '@/app/_components/Hero';

export default function HomePage() {
	return (
		<div className='flex h-screen w-full flex-col'>
			<Header>
				<nav
					aria-label='Main navigation'
					className='container mx-auto flex items-center justify-between'
				>
					<Link href='/'>
						<p className='text-3xl font-bold dark:text-gray-200'>Tldraw</p>
					</Link>
					<div className='flex items-center gap-2'>
						<OpenButton />
						<ThemeToggle />
					</div>
				</nav>
			</Header>
			<main className='flex h-full w-full items-start justify-center bg-white px-4 dark:bg-dark-secondary dark:text-white'>
				<Hero />
			</main>
		</div>
	);
}
