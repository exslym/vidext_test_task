'use client';

import { useEffect } from 'react';

import BackButton from '@/app/_components/BackButton';
import EditorContent from '@/app/_components/EditorContent';
import Header from '@/app/_components/Header';
import ThemeToggle from '@/components/ThemeToggle';
import { Tldraw } from '@tldraw/tldraw';
import '@tldraw/tldraw/tldraw.css';
import { useTheme } from 'next-themes';

export default function EditorPage() {
	const { resolvedTheme, systemTheme } = useTheme();

	useEffect(() => {
		const themeToApply = resolvedTheme === 'system' ? systemTheme : resolvedTheme;

		setTimeout(() => {
			if (document.querySelector('.tl-container')) {
				const tldrawContainer = document.querySelector('.tl-container');

				if (themeToApply === 'dark') {
					tldrawContainer?.classList.add('tl-theme__dark');
					tldrawContainer?.classList.remove('tl-theme__light');
				} else {
					tldrawContainer?.classList.add('tl-theme__light');
					tldrawContainer?.classList.remove('tl-theme__dark');
				}
			}
		}, 50);
	}, [resolvedTheme, systemTheme]);

	return (
		<div className='bg-light flex h-screen w-full flex-col dark:bg-dark-secondary'>
			<Header>
				<div className='mx-auto flex w-full items-center justify-between'>
					<BackButton />
					<ThemeToggle />
				</div>
			</Header>

			<main className='flex h-full w-full'>
				<section className='relative flex-1'>
					<Tldraw>
						<EditorContent />
					</Tldraw>
				</section>
			</main>
		</div>
	);
}
