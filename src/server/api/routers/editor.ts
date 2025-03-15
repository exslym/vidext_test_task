import { router, publicProcedure } from '../trpc';
import { z } from 'zod';
import { shapeSequence, type ShapeType } from '@/constants/shapes';

const openrouterai = process.env.OPENROUTER_API_KEY;
let editorData = {};

export const editorRouter = router({
	getData: publicProcedure.query(() => editorData),
	// getData: publicProcedure.query(() => {
	//   throw new Error("Forced API Error");
	// }),

	setData: publicProcedure.input(z.any()).mutation(({ input }) => {
		editorData = input;
		return editorData;
	}),

	recognizeShape: publicProcedure
		.input(z.object({ image: z.string() }))
		.mutation(async ({ input }) => {
			const prompt = `
        Identify the geometric shape in this image from these shapes: ${shapeSequence.join(', ')}.
        Respond ONLY with the exact shape name from the provided shapes.
        `;

			// Remove data URL prefix
			const base64Image = input.image.replace(/^data:image\/\w+;base64,/, '');

			const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${openrouterai}`,
					'HTTP-Referer': '<YOUR_SITE_URL>', // Optional. Site URL for rankings on openrouter.ai.
					'X-Title': '<YOUR_SITE_NAME>', // Optional. Site title for rankings on openrouter.ai.
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					model: 'qwen/qwen2.5-vl-72b-instruct:free',
					messages: [
						{
							role: 'user',
							content: [
								{
									type: 'image_url',
									image_url: { url: `data:image/png;base64,${base64Image}` },
								},
								{ type: 'text', text: prompt },
							],
						},
					],
				}),
			});

			const responseData = await response.json();

			console.log('OpenRouter API response:', JSON.stringify(responseData, null, 2));

			if (!response.ok || !responseData.choices || responseData.choices.length === 0) {
				throw new Error(`AI recognition service failed: ${JSON.stringify(responseData)}`);
			}

			const recognizedShape = responseData.choices[0]?.message?.content?.trim().toLowerCase();

			if (!recognizedShape || !shapeSequence.includes(recognizedShape as ShapeType)) {
				throw new Error(`Shape recognition failed: "${recognizedShape}"`);
			}

			return { shape: recognizedShape };
		}),
});
