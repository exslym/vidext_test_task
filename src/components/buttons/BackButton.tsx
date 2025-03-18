'use client';

import { House } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function BackButton() {
	return (
		<Button
			className='gap-0 rounded-lg bg-gray-secondary px-3 py-2 shadow-sm hover:bg-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-500 lg:px-4'
			size='lg'
		>
			<House size={16} />
			<p className='ml-0 hidden lg:ml-2 lg:block'>Back to Home</p>
		</Button>
	);
}
