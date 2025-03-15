'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function OpenButton() {
	return (
		<Link href='/editor' className='z-10 h-full max-w-fit'>
			<Button
				className='rounded-lg bg-gray-secondary px-5 py-2 shadow-sm hover:bg-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-500'
				size='lg'
			>
				<ArrowRight size={18} />
				Open Editor
			</Button>
		</Link>
	);
}
