'use client';

import { Button } from '@/components/ui/button';
import { useApiTest } from '@/hooks/useApiTest';

export default function TestApiPage() {
	const {
		dataResult,
		setDataResponse,
		recognitionResult,
		error,
		showData,
		setShowData,
		handleGetData,
		handleSetData,
		handleDeleteData,
		handleRecognizeShapeTest,
	} = useApiTest();

	return (
		<div className='mx-auto flex w-full max-w-xl flex-col items-center gap-4 p-4'>
			<h1 className='text-2xl font-bold'>Test API Calls</h1>

			<Button
				onClick={handleGetData}
				className='w-full max-w-56 rounded bg-blue-500 px-4 py-2 text-white'
			>
				Get Data
			</Button>

			{dataResult && (
				<div className='flex w-full flex-col items-center'>
					<Button
						onClick={() => setShowData(prev => !prev)}
						className='mx-auto h-full bg-transparent p-0 leading-none text-blue-600 underline shadow-none hover:bg-transparent hover:text-blue-400'
					>
						{showData ? 'Hide Data' : 'Show Data'}
					</Button>

					{showData && (
						<pre className='mt-4 w-full rounded bg-gray-100 p-2'>
							{JSON.stringify(dataResult, null, 2)}
						</pre>
					)}
				</div>
			)}

			<Button
				onClick={handleSetData}
				className='w-full max-w-56 rounded bg-green-500 px-4 py-2 text-white'
			>
				Set Data
			</Button>
			{setDataResponse && (
				<pre className='w-full rounded bg-gray-100 p-2'>
					{JSON.stringify(setDataResponse, null, 2)}
				</pre>
			)}

			<Button
				onClick={handleDeleteData}
				className='w-full max-w-56 rounded bg-red-500 px-4 py-2 text-white'
			>
				Delete All Data
			</Button>

			<Button
				onClick={handleRecognizeShapeTest}
				className='w-full max-w-56 rounded bg-purple-500 px-4 py-2 text-white'
			>
				Recognize Shape (Mock)
			</Button>

			{recognitionResult && (
				<pre className='w-full rounded bg-gray-100 p-2'>
					Recognized Shape: {recognitionResult}
				</pre>
			)}
			{error && (
				<pre className='w-full rounded bg-gray-100 p-2 text-red-500'>
					Error: {error}
				</pre>
			)}
		</div>
	);
}
