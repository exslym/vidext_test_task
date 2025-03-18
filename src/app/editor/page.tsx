'use client';

import { useEffect, useRef, useState } from 'react';
import EditorContent from '@/app/_components/EditorContent';
import { TLEditorSnapshot } from '@tldraw/tldraw';
import '@tldraw/tldraw/tldraw.css';
import dynamic from 'next/dynamic';
import BackButton from '@/components/BackButton';
import Error from '@/components/Error';
import GalleryButton from '@/components/GalleryButton';
import Header from '@/components/Header';
import Loading from '@/components/Loading';
import ModifyButton from '@/components/ModifyButton';
import RecognizeButton from '@/components/RecognizeButton';
import SaveButton from '@/components/SaveButton';
import { api } from '@/lib/api';

const Tldraw = dynamic(async () => (await import('@tldraw/tldraw')).Tldraw, {
	ssr: false,
});

export default function EditorPage() {
	const { isLoading, isError, error } =
		api.getData.useQuery<TLEditorSnapshot>();
	const tldrawContainerRef = useRef<HTMLDivElement>(null);
	const [projectName, setProjectName] = useState<string | null>(null);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const params = new URLSearchParams(window.location.search);
			const project = params.get('project');
			if (project) {
				setProjectName(decodeURIComponent(project));
			} else {
				setProjectName(null);
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
			<Tldraw inferDarkMode className={'pt-14'}>
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
						</div>
					</nav>
				</Header>

				<EditorContent />
			</Tldraw>
		</div>
	);
}
