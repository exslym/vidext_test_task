'use client';

import { features } from '@/constants/features';
import Link from 'next/link';
import GalleryButton from '@/components/buttons/GalleryButton';
import NewProjectButton from '@/components/buttons/NewProjectButton';
import FeatureCard from '@/components/cards/FeatureCard';

export default function Hero() {
	return (
		<section className='container flex w-full flex-col items-center justify-start space-y-10 py-14 text-center'>
			<h1 className='text-5xl font-bold dark:text-gray-200'>
				Welcome to Tldraw Editor!
			</h1>
			<p className='max-w-xl text-xl text-gray-800 dark:text-gray-400 md:max-w-full'>
				A simple and powerful drawing editor lets you create and save your
				sketches.
				<br />
				With this multifunctional tool you can do a lot of things.
			</p>
			<div className='grid w-full grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3'>
				{features.map(({ icon: Icon, color, title, description }) => (
					<FeatureCard
						key={title}
						icon={<Icon size={30} stroke={color} />}
						title={title}
						description={description}
					/>
				))}
			</div>

			<div className='flex gap-2'>
				<Link href='/gallery' className='max-w-fit'>
					<GalleryButton classes={'hero-gallery-button'} />
				</Link>

				<Link href='/editor' className='max-w-fit'>
					<NewProjectButton classes={'hero-editor-button'} />
				</Link>
			</div>
		</section>
	);
}
