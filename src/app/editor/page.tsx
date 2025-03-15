'use client';

import BackButton from '@/app/_components/BackButton';
import EditorContent from '@/app/_components/EditorContent';
import Header from '@/app/_components/Header';
import ModifyButton from '@/app/_components/ModifyButton';
import RecognizeButton from '@/app/_components/RecognizeButton';
import ThemeToggle from '@/components/ThemeToggle';
import { useTheme } from 'next-themes';

import { useEffect } from 'react';

import { Tldraw } from '@tldraw/tldraw';
import '@tldraw/tldraw/tldraw.css';

export default function EditorPage() {
	const { resolvedTheme, systemTheme } = useTheme();

	useEffect(() => {
		const themeToApply =
			resolvedTheme === 'system' ? systemTheme : resolvedTheme;

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
		<div className='bg-light relative flex h-screen w-full dark:bg-dark-secondary'>
			<Tldraw className='pt-14'>
				<Header classes='absolute top-0'>
					<nav
						aria-label='Editor navigation'
						className='mx-auto flex w-full items-center justify-between'
					>
						<BackButton />

						<div className='absolute right-2 top-16 flex flex-col-reverse gap-2 sm:right-1/2 sm:top-2 sm:translate-x-1/2 sm:flex-row'>
							<ModifyButton />
							<RecognizeButton />
						</div>

						<ThemeToggle />
					</nav>
				</Header>

				<EditorContent />
			</Tldraw>
		</div>
	);
}
