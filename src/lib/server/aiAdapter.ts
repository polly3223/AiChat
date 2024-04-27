import { z } from 'zod';
import { SECRET_TOGHETERAI_API_KEY } from '$env/static/private';
import { messageSchema, type Message } from '../client/types';
import { insertLog } from './mongo';
import { v4 } from 'uuid';

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

type ModelType = 'meta-llama/Llama-3-70b-chat-hf' | 'meta-llama/Llama-3-8b-chat-hf';

async function aiCall(model: ModelType, msgList: Message[]): Promise<Message | string> {
	try {
		const response = await fetch('https://api.together.xyz/v1/chat/completions', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${SECRET_TOGHETERAI_API_KEY}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				model,
				max_tokens: 5000,
				temperature: 1,
				top_p: 1,
				repetition_penalty: 1,
				stop: ['<|eot_id|>'],
				messages: msgList
			})
		});
		if (!response.ok) return response.statusText;

		const data = await response.json();
		const completion = chatCompletionSchema.safeParse(data);
		if (!completion.success) return 'Invalid completion data';

		return completion.data.choices[0].message;
	} catch {
		return 'Connection error';
	}
}

export async function ai(model: ModelType, msgList: Message[]): Promise<Message | string> {
	const completion = await aiCall(model, msgList);
	insertLog({ _id: v4(), date: new Date(), model, messages: msgList, answer: completion });
	return completion;
}
