'use client';

import { useEffect, useRef, useState } from 'react';
import EditorContent from '@/app/_components/EditorContent';
import { TLEditorSnapshot } from '@tldraw/tldraw';
import '@tldraw/tldraw/tldraw.css';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import BackButton from '@/components/buttons/BackButton';
import GalleryButton from '@/components/buttons/GalleryButton';
import ModifyButton from '@/components/buttons/ModifyButton';
import NewProjectButtonInsideEditor from '@/components/buttons/NewProjectButtonInsideEditor';
import RecognizeButton from '@/components/buttons/RecognizeButton';
import SaveButton from '@/components/buttons/SaveButton';
import Error from '@/components/error/Error';
import Header from '@/components/header/Header';
import Loading from '@/components/loading/Loading';
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
			setProjectName(project ? decodeURIComponent(project) : null);
		}
	}, []);

	const resetProjectName = () => {
		setProjectName(null);
		setTimeout(() => setProjectName(''), 0);
	};

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
							<Link href='/' className='z-10 max-w-fit'>
								<BackButton />
							</Link>

							<Link href='/gallery' className='z-10 max-w-fit'>
								<GalleryButton />
							</Link>

							<NewProjectButtonInsideEditor
								onResetProjectName={resetProjectName}
							/>
						</div>

						<div className='absolute right-2 top-16 flex flex-col-reverse gap-2 sm:right-1/2 sm:top-2 sm:translate-x-1/2 sm:flex-row'>
							<ModifyButton />
							<RecognizeButton />
						</div>

						<SaveButton projectName={projectName} />
					</nav>
				</Header>

				<EditorContent />
			</Tldraw>
		</div>
	);
}
