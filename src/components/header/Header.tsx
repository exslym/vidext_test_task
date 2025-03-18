'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export default function Header({
	children,
	classes,
}: {
	classes?: string;
	children?: ReactNode;
}) {
	return (
		<header
			className={cn(
				'relative z-10 flex w-full bg-gray-primary p-2 shadow-inset-bottom-lightgray dark:bg-dark-primary dark:shadow-inset-bottom-black',
				classes
			)}
		>
			{children}
		</header>
	);
}
