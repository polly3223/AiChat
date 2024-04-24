import { z } from 'zod';
import { SECRET_TOGHETERAI_API_KEY } from '$env/static/private';
import { messageSchema, type Message } from '../client/types';

const chatCompletionSchema = z.object({
	id: z.string(),
	object: z.literal('chat.completion'),
	created: z.number(),
	model: z.string(),
	prompt: z.array(z.null()),
	choices: z.array(
		z.object({
			finish_reason: z.string(),
			logprobs: z.null(),
			index: z.number(),
			message: messageSchema
		})
	),
	usage: z.object({
		prompt_tokens: z.number(),
		completion_tokens: z.number(),
		total_tokens: z.number()
	})
});

const system = `You are an helpful assistant. You answer in markdown so that the message can be displayed correctly.
IMPORTANT: When you place code in the message, use the code block syntax specifing the language like this:

\`\`\`javascript
console.log('Hello, World!');
\`\`\`

so that the code is syntax highlighted.`;

export async function fetchCompletion(messages: Message[]): Promise<Message | null> {
	const msgList = [{ role: 'system', content: system }, ...messages];

	try {
		const response = await fetch('https://api.together.xyz/v1/chat/completions', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${SECRET_TOGHETERAI_API_KEY}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				model: 'meta-llama/Llama-3-70b-chat-hf', // or 'meta-llama/Llama-3-8b-chat-hf'
				max_tokens: 5000,
				temperature: 0.7,
				top_p: 0.7,
				top_k: 50,
				repetition_penalty: 1,
				stop: ['<|eot_id|>'],
				messages: msgList
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
