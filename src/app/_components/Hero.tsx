'use client';

import { useState } from 'react';
import FeatureCard from '@/app/_components/FeatureCard';
import { Button } from '@/components/ui/button';
import { features } from '@/constants/features';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';

export default function Hero() {
	const [loading, setLoading] = useState(false);

	const handleClick = () => {
		setLoading(true);
	};

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
			<div className='mt-12 grid w-full grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3'>
				{features.map(({ icon: Icon, color, title, description }) => (
					<FeatureCard
						key={title}
						icon={<Icon size={30} className={color} />}
						title={title}
						description={description}
					/>
				))}
			</div>

			<Link href='/editor'>
				<Button
					onClick={handleClick}
					disabled={loading}
					className='rounded-lg bg-gray-secondary px-4 py-2 shadow-lg hover:bg-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-500'
					size='lg'
				>
					{loading ? (
						<>
							<Loader2 size={18} className='mr-2 animate-spin' />
							<span>Loading...</span>
						</>
					) : (
						<>Open Editor</>
					)}
				</Button>
			</Link>
		</section>
	);
}
