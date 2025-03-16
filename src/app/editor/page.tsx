'use client';

import BackButton from '@/app/_components/BackButton';
import EditorContent from '@/app/_components/EditorContent';
import Error from '@/app/_components/Error';
import Header from '@/app/_components/Header';
import Loading from '@/app/_components/Loading';
import ModifyButton from '@/app/_components/ModifyButton';
import RecognizeButton from '@/app/_components/RecognizeButton';
import { api } from '@/app/_utils/api';
import { applyTheme } from '@/app/_utils/applyTheme';
import ThemeToggle from '@/components/ThemeToggle';
import { useTheme } from 'next-themes';

import { useEffect, useState } from 'react';

import { TLEditorSnapshot } from '@tldraw/tldraw';
import { Tldraw } from '@tldraw/tldraw';
import '@tldraw/tldraw/tldraw.css';

export default function EditorPage() {
	const { data, isLoading, isError, error } =
		api.getData.useQuery<TLEditorSnapshot>();

	const { resolvedTheme, systemTheme } = useTheme();
	const [editorLoaded, setEditorLoaded] = useState(false);

	useEffect(() => {
		if (editorLoaded) {
			applyTheme(resolvedTheme, systemTheme);
		}
	}, [resolvedTheme, systemTheme, editorLoaded]);

	if (isLoading) return <Loading />;
	if (isError) return <Error message={error?.message} />;

	return (
		<div className='bg-light relative flex h-screen w-full dark:bg-dark-secondary'>
			<Tldraw
				onMount={() => {
					setEditorLoaded(true);
				}}
				className='pt-14'
			>
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

				<EditorContent data={data} />
			</Tldraw>
		</div>
	);
}
