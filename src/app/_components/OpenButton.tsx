'use client';

import { useState } from 'react';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function OpenButton() {
	const [loading, setLoading] = useState(false);

	const handleClick = () => {
		setLoading(true);
	};

	return (
		<Link href='/editor' className='z-10 h-full max-w-fit'>
			<Button
				onClick={handleClick}
				disabled={loading}
				className='w-36 rounded-lg bg-gray-secondary px-4 py-2 text-center shadow-sm hover:bg-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-500'
				size='lg'
			>
				Open Editor
				<ArrowRight size={18} />
			</Button>
		</Link>
	);
}
