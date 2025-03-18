'use client';

import { useState } from 'react';
import { api } from '@/lib/api';

export default function TestApiPage() {
	const [dataResult, setDataResult] = useState<Record<string, unknown> | null>(
		null
	);
	const [setDataResponse, setSetDataResponse] = useState<Record<
		string,
		unknown
	> | null>(null);
	const [recognitionResult, setRecognitionResult] = useState('');
	const [error, setError] = useState('');
	const [showData, setShowData] = useState(false);

	const getDataQuery = api.getData.useQuery(undefined, { enabled: false });
	const setDataMutation = api.setData.useMutation();
	const deleteDataMutation = api.deleteData.useMutation();
	const recognizeShapeTestMutation = api.recognizeShapeTest.useMutation();

	const handleGetData = async () => {
		const result = await getDataQuery.refetch();
		setDataResult(result.data ?? null);
		setShowData(true);
	};

	const handleSetData = () => {
		const projects = { sampleProject1: {}, sampleProject2: {} };
		setDataMutation.mutate(projects, {
			onSuccess: data => setSetDataResponse(data ?? null),
			onError: err => setError(err.message),
		});
	};

	const handleDeleteData = () => {
		deleteDataMutation.mutate(undefined, {
			onSuccess: () => {
				setDataResult(null);
				setSetDataResponse(null);
				setRecognitionResult('');
				setError('');
			},
			onError: err => setError(err.message),
		});
	};

	const handleRecognizeShapeTest = () => {
		recognizeShapeTestMutation.mutate(
			{ shape: 'ellipse' },
			{
				onSuccess: data => setRecognitionResult(data.shape),
				onError: err => setError(err.message),
			}
		);
	};

	return (
		<div className='flex w-full flex-col gap-4 p-4'>
			<h1 className='text-xl font-bold'>Test API Calls</h1>

			<button
				onClick={handleGetData}
				className='max-w-56 rounded bg-blue-500 px-4 py-2 text-white'
			>
				Get Data
			</button>

			{dataResult && (
				<div className='mt-2'>
					<button
						onClick={() => setShowData(prev => !prev)}
						className='text-blue-600 underline'
					>
						{showData ? 'Hide Data' : 'Show Data'}
					</button>

					{showData && (
						<pre className='mt-1 rounded bg-gray-100 p-2'>
							{JSON.stringify(dataResult, null, 2)}
						</pre>
					)}
				</div>
			)}

			<button
				onClick={handleSetData}
				className='max-w-56 rounded bg-purple-500 px-4 py-2 text-white'
			>
				Set Data
			</button>
			{setDataResponse && (
				<pre className='mt-1 rounded bg-gray-100 p-2'>
					{JSON.stringify(setDataResponse, null, 2)}
				</pre>
			)}

			<button
				onClick={handleDeleteData}
				className='max-w-56 rounded bg-red-500 px-4 py-2 text-white'
			>
				Delete All Data
			</button>

			<button
				onClick={handleRecognizeShapeTest}
				className='max-w-56 rounded bg-green-500 px-4 py-2 text-white'
			>
				Recognize Shape (Mock)
			</button>

			{recognitionResult && (
				<pre className='mt-1 rounded bg-gray-100 p-2'>
					Recognized Shape: {recognitionResult}
				</pre>
			)}
			{error && (
				<pre className='mt-1 rounded bg-gray-100 p-2 text-red-500'>
					Error: {error}
				</pre>
			)}
		</div>
	);
}
