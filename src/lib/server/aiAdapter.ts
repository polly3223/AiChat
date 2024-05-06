import { SECRET_TOGHETERAI_API_KEY } from '$env/static/private';
import { type Message } from '../client/types';
import { insertLog } from './mongo';
import { v4 } from 'uuid';
import OpenAI from 'openai';

const client = new OpenAI({
	apiKey: SECRET_TOGHETERAI_API_KEY,
	baseURL: 'https://api.together.xyz/v1'
});

type ModelType = 'meta-llama/Llama-3-70b-chat-hf' | 'meta-llama/Llama-3-8b-chat-hf';

async function aiCall(model: ModelType, msgList: Message[]): Promise<Message | string> {
	const response = await client.chat.completions.create({
		model,
		messages: msgList
	});

	const completion = response.choices[0].message;
	if (completion.content === null) return 'Invalid completion data';

	return {
		role: completion.role,
		content: completion.content
	};
}

export async function ai(
	model: ModelType,
	operation: string,
	msgList: Message[]
): Promise<Message | string> {
	const completion = await aiCall(model, msgList);
	insertLog({
		_id: v4(),
		date: new Date(),
		model,
		operation,
		messages: msgList,
		answer: completion
	});
	return completion;
}
