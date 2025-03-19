'use client';

import Link from 'next/link';
import BackButton from '@/components/buttons/BackButton';

export default function Error({ message }: { message?: string }) {
	return (
		<div className='flex min-h-screen w-full flex-col items-center justify-center dark:bg-dark-secondary'>
			<div
				className='mx-auto flex h-full max-w-2xl flex-1 flex-col items-center justify-center gap-3 p-4 text-lg text-red-500'
				role='alert'
				aria-live='assertive'
			>
				<h1 className='text-xl font-bold'>Error loading editor data</h1>

				{message && (
					<p className='mb-3' aria-label='Error details'>
						Details: {message}
					</p>
				)}
				<Link href='/' className='max-w-fit'>
					<BackButton />
				</Link>
			</div>
		</div>
	);
}
