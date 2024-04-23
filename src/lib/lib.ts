import { SECRET_TOGHETERAI_API_KEY } from '$env/static/private';
import { chatCompletionSchema, type Message } from './types';

export async function fetchCompletion(messages: Message[]): Promise<Message | null> {
	try {
		const response = await fetch('https://api.together.xyz/v1/chat/completions', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${SECRET_TOGHETERAI_API_KEY}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				model: 'meta-llama/Llama-3-8b-chat-hf',
				max_tokens: 5000,
				temperature: 0.7,
				top_p: 0.7,
				top_k: 50,
				repetition_penalty: 1,
				stop: ['<|eot_id|>'],
				messages
			})
		});
		if (!response.ok) {
			console.log(response);
			return null;
		}

		const data = await response.json();
		const completion = chatCompletionSchema.safeParse(data);

		if (!completion.success) {
			console.log(completion.error);
			return null;
		}

		return completion.data.choices[0].message;
	} catch (error) {
		console.log(error);
		return null;
	}
}
