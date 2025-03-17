'use client';

import { useEffect, useRef, useState } from 'react';

import SaveButton from '@/app/_components/SaveButton';
import BackButton from '@/app/_components/BackButton';
import EditorContent from '@/app/_components/EditorContent';
import Error from '@/app/_components/Error';
import Header from '@/app/_components/Header';
import Loading from '@/app/_components/Loading';
import ModifyButton from '@/app/_components/ModifyButton';
import RecognizeButton from '@/app/_components/RecognizeButton';
import { api } from '@/app/_utils/api';
import { applyTheme } from '@/app/_utils/applyTheme';
import { TLEditorSnapshot } from '@tldraw/tldraw';
import '@tldraw/tldraw/tldraw.css';
import { useTheme } from 'next-themes';
import dynamic from 'next/dynamic';

import ThemeToggle from '@/components/ThemeToggle';
import GalleryButton from '../_components/GalleryButton';

const Tldraw = dynamic(async () => (await import('@tldraw/tldraw')).Tldraw, {
	ssr: false,
});

export default function EditorPage() {
	const { data, isLoading, isError, error } =
		api.getData.useQuery<TLEditorSnapshot>();
	const { resolvedTheme } = useTheme();
	const tldrawContainerRef = useRef<HTMLDivElement>(null);
	const [projectName, setProjectName] = useState<string | null>(null);

	useEffect(() => {
		if (!tldrawContainerRef.current || !tldrawContainerRef.current.firstChild)
			return;
		const theme = resolvedTheme === 'dark' ? 'dark' : 'light';
		const tldraw = tldrawContainerRef.current.firstChild as HTMLElement;
		applyTheme(theme, tldraw);
	}, [resolvedTheme]);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const params = new URLSearchParams(window.location.search);
			const project = params.get('project');
			if (project) {
				setProjectName(decodeURIComponent(project));
			}
		}
	}, []);

	if (isLoading) return <Loading />;
	if (isError) return <Error message={error?.message} />;

	return (
		<div
			ref={tldrawContainerRef}
			className='bg-light relative flex h-screen w-full dark:bg-dark-secondary'
		>
			<Tldraw inferDarkMode persistenceKey='key' className={'pt-14'}>
				<Header classes='absolute top-0'>
					<nav
						aria-label='Editor navigation'
						className='mx-auto flex w-full items-center justify-between'
					>
						<div className='flex items-center gap-2'>
							<BackButton />
							<GalleryButton />
						</div>

						<div className='absolute right-2 top-16 flex flex-col-reverse gap-2 sm:right-1/2 sm:top-2 sm:translate-x-1/2 sm:flex-row'>
							<ModifyButton />
							<RecognizeButton />
						</div>

						<div className='flex items-center gap-2'>
							<SaveButton projectName={projectName} />
							<ThemeToggle />
						</div>
					</nav>
				</Header>

				<EditorContent data={data} />
			</Tldraw>
		</div>
	);
}
