'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function BackButton() {
	return (
		<Link href='/' className='z-10 max-w-fit'>
			<Button
				className='rounded-lg bg-gray-secondary px-5 py-2 shadow-sm hover:bg-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-500'
				size='lg'
			>
				<ArrowLeft size={18} />
				Back to Home
			</Button>
		</Link>
	);
}
