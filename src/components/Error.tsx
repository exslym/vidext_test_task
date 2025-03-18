'use client';

import BackButton from '@/components/BackButton';

export default function Error({ message }: { message?: string }) {
	return (
		<div className='absolute inset-0 mx-auto flex max-w-2xl flex-col items-center justify-center gap-3 p-4 text-lg text-red-500'>
			<p>Error loading editor data!</p>
			{message && <p className='mb-3'>Details: {message}</p>}
			<BackButton />
		</div>
	);
}
