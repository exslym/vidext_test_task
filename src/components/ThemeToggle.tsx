'use client';

import { useEffect, useState } from 'react';

import { Laptop, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';

export default function ThemeToggle() {
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme } = useTheme();

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;

	const toggleTheme = () => {
		if (theme === 'dark') {
			setTheme('light');
		} else if (theme === 'light') {
			setTheme('system');
		} else {
			setTheme('dark');
		}
	};

	return (
		<Button
			size='lg'
			onClick={toggleTheme}
			className='z-20 rounded-lg bg-gray-secondary p-2 shadow-sm hover:bg-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-500'
		>
			{theme === 'dark' ? (
				<Sun size={24} key='sun' />
			) : theme === 'light' ? (
				<Moon size={24} key='moon' />
			) : (
				<Laptop size={24} key='laptop' />
			)}
		</Button>
	);
}
