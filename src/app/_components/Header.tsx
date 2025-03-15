'use client';

import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

export interface IHeaderProps {
	classes?: string;
	children?: ReactNode;
}

export const Header: React.FC<IHeaderProps> = ({ children, classes }: IHeaderProps) => {
	return (
		<header
			className={cn(
				'relative z-10 flex w-full bg-gray-primary p-2 shadow-inset-bottom-lightgray dark:bg-dark-primary dark:shadow-inset-bottom-black',
				classes,
			)}
		>
			{children}
		</header>
	);
};
export default Header;
