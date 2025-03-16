'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function BackButton() {
	return (
		<Link href='/' className='z-10 max-w-fit'>
			<Button
				className='rounded-lg bg-gray-secondary px-4 py-2 shadow-sm hover:bg-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-500'
				size='lg'
			>
				<ArrowLeft size={18} />
				Back to Home
			</Button>
		</Link>
	);
}
