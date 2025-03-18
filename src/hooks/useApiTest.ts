import { useState } from 'react';
import { api } from '@/lib/api';

export function useApiTest() {
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
		try {
			const result = await getDataQuery.refetch();
			setDataResult(result.data ?? null);
			setShowData(true);
		} catch (err: any) {
			setError(err.message);
		}
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

	return {
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
	};
}
