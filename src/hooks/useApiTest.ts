import { useState } from 'react';
import { type ShapeType } from '@/constants/shapes';
import { api } from '@/lib/api';

export const useApiTest = () => {
	// Store API responses and errors
	const [dataResult, setDataResult] = useState<Record<string, unknown> | null>(
		null
	);
	const [setDataResponse, setSetDataResponse] = useState<Record<
		string,
		unknown
	> | null>(null);
	const [recognitionResult, setRecognitionResult] = useState('');
	const [error, setError] = useState('');

	// Define API queries and mutations using tRPC
	const getDataQuery = api.getData.useQuery(undefined, { enabled: false });
	const setDataMutation = api.setData.useMutation();
	const deleteDataMutation = api.deleteData.useMutation();
	const recognizeShapeTestMutation = api.recognizeShapeTest.useMutation();

	// Fetch stored data from the API
	const handleGetData = async () => {
		const result = await getDataQuery.refetch();
		setDataResult(result.data ?? null);
	};

	// Save sample projects to storage
	const handleSetData = () => {
		const projects = { sampleProject1: {}, sampleProject2: {} };
		setDataMutation.mutate(projects, {
			onSuccess: data => setSetDataResponse(data ?? null),
			onError: err => setError(err.message),
		});
	};

	// Delete all stored data
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

	// Test AI shape recognition with a default shape ('ellipse')
	const handleRecognizeShapeTest = (shape: ShapeType = 'ellipse') => {
		recognizeShapeTestMutation.mutate(
			{ shape },
			{
				onSuccess: data => setRecognitionResult(data.shape),
				onError: err => setError(err.message),
			}
		);
	};

	return {
		dataResult,
		setDataResponse,
		recognitionResult,
		error,
		handleGetData,
		handleSetData,
		handleDeleteData,
		handleRecognizeShapeTest,
	};
};
