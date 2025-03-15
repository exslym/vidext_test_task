'use client';

import { Loader2 } from 'lucide-react';

export default function Loading() {
	return (
		<div className='absolute inset-0 flex items-center justify-center'>
			<Loader2 className='mr-2 h-8 w-8 animate-spin' />
			<p className='text-lg'>Loading...</p>
		</div>
	);
}
