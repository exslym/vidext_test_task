'use client';

import React from 'react';

import FeatureCard from '@/app/_components/FeatureCard';
import Header from '@/app/_components/Header';
import OpenButton from '@/app/_components/OpenButton';
import ThemeToggle from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { BrainCircuit, Download, Palette, Pencil, Save, Shapes } from 'lucide-react';
import Link from 'next/link';

const HomePage: React.FC = () => {
	return (
		<div className='flex h-screen w-full flex-col'>
			<Header>
				<div className='container mx-auto flex items-center justify-between'>
					<Link href='/'>
						<p className='text-3xl font-bold dark:text-gray-200'>Tldraw</p>
					</Link>
					<div className='flex items-center gap-2'>
						<OpenButton />
						<ThemeToggle />
					</div>
				</div>
			</Header>
			<main className='flex h-full w-full items-start justify-center bg-white px-4 dark:bg-dark-secondary dark:text-white'>
				<section className='container flex w-full flex-col items-center justify-start space-y-10 py-14 text-center'>
					<h1 className='text-5xl font-bold dark:text-gray-200'>Welcome to Tldraw Editor!</h1>
					<p className='text-xl text-gray-800 dark:text-gray-400'>
						A simple and powerful drawing editor lets you create and save your sketches.
						<br />
						With this multifunctional tool you can do a lot of things.
					</p>
					<div className='mt-12 grid w-full grid-cols-1 gap-6 md:grid-cols-3'>
						<FeatureCard
							icon={<Pencil className='h-8 w-8 text-blue-500' />}
							title='Draw & Edit'
							description='Create and modify sketches with an easy-to-use canvas.'
						/>
						<FeatureCard
							icon={<Save className='h-8 w-8 text-yellow-500' />}
							title='Auto Save'
							description='Your sketches are saved automatically, so you never lose your progress.'
						/>
						<FeatureCard
							icon={<Shapes className='h-8 w-8 text-purple-500' />}
							title='Shape Modification'
							description='Select a shape and easily switch between different geometric shapes using a dedicated button.'
						/>
						<FeatureCard
							icon={<Palette className='h-8 w-8 text-red-500' />}
							title='Clean & User-friendly Design'
							description='Minimalist UI for distraction-free sketching and better user experience.'
						/>
						<FeatureCard
							icon={<Download className='h-8 w-8 text-indigo-500' />}
							title='Export Options'
							description='Download your work in multiple formats, including SVG and PNG.'
						/>
						<FeatureCard
							icon={<BrainCircuit className='h-8 w-8 text-green-500' />}
							title='AI Shape Recognition'
							description='Select a hand-drawn shape and press the AI button to convert it into a precise geometric form.'
						/>
					</div>

					<Link href='/editor'>
						<Button
							className='rounded-lg bg-gray-secondary px-5 py-2 shadow-lg hover:bg-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-500'
							size='lg'
						>
							Open Editor
						</Button>
					</Link>
				</section>
			</main>
		</div>
	);
};
export default HomePage;
