import { useState } from 'react';
import { type ShapeType } from '@/constants/shapes';
import { api } from '@/lib/api';

export const useApiTest = () => {
	const [dataResult, setDataResult] = useState<Record<string, unknown> | null>(
		null
	);
	const [setDataResponse, setSetDataResponse] = useState<Record<
		string,
		unknown
	> | null>(null);
	const [recognitionResult, setRecognitionResult] = useState('');
	const [error, setError] = useState('');

	const getDataQuery = api.getData.useQuery(undefined, { enabled: false });
	const setDataMutation = api.setData.useMutation();
	const deleteDataMutation = api.deleteData.useMutation();
	const recognizeShapeTestMutation = api.recognizeShapeTest.useMutation();

	const handleGetData = async () => {
		const result = await getDataQuery.refetch();
		setDataResult(result.data ?? null);
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
