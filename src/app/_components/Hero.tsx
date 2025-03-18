'use client';

import { features } from '@/constants/features';
import FeatureCard from '@/components/FeatureCard';
import GalleryButton from '@/components/GalleryButton';
import OpenButton from '@/components/OpenButton';

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
				<GalleryButton classes={'hero-gallery-button'} />
				<OpenButton classes={'hero-editor-button'} />
			</div>
		</section>
	);
}
