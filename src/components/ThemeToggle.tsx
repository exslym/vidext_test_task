'use client';

import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Sun, Moon } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;

	return (
		<Button
			size='lg'
			onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
			className='z-20 rounded-lg bg-gray-secondary p-2 shadow-sm hover:bg-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-500'
		>
			{theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
		</Button>
	);
}
