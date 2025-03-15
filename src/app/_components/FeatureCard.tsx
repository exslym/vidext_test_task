'use client';

export default function FeatureCard({
	icon,
	title,
	description,
}: {
	icon: React.ReactNode;
	title: string;
	description: string;
}) {
	return (
		<div className='bg-light flex flex-col items-center rounded-lg p-6 shadow-lg dark:bg-gray-800'>
			<div className='rounded-full bg-gray-primary p-3 dark:bg-gray-700'>
				{icon}
			</div>
			<h2 className='mt-4 text-xl font-semibold dark:text-gray-200'>{title}</h2>
			<p className='mt-2 text-center text-sm text-gray-700 dark:text-gray-400'>
				{description}
			</p>
		</div>
	);
}
