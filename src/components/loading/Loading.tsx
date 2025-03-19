'use client';

import { Loader2 } from 'lucide-react';

export default function Loading() {
	return (
		<div
			className='absolute inset-0 flex items-center justify-center dark:bg-dark-secondary'
			role='status'
			aria-live='polite'
			aria-busy='true'
		>
			<Loader2
				size={32}
				className='mr-2 animate-spin dark:text-white'
				aria-hidden='true'
			/>
			<p className='text-lg dark:text-white'>Loading...</p>
		</div>
	);
}
