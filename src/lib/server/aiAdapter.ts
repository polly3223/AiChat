import { SECRET_TOGHETERAI_API_KEY } from '$env/static/private';
import { type Message } from '../client/types';
import { insertLog } from './mongo';
import { v4 } from 'uuid';
import OpenAI from 'openai';

const client = new OpenAI({
	apiKey: SECRET_TOGHETERAI_API_KEY,
	baseURL: 'https://api.together.xyz/v1'
});

type ModelAllowTools = 'mistralai/Mixtral-8x7B-Instruct-v0.1';
type ModelNoTools = 'meta-llama/Llama-3-70b-chat-hf' | 'meta-llama/Llama-3-8b-chat-hf';

export async function completion(
	model: ModelAllowTools | ModelNoTools,
	operation: string,
	msgList: Message[]
): Promise<string | null> {
	try {
		const response = await client.chat.completions.create({
			model,
			messages: msgList
		});
		const content = response.choices[0].message.content;
		insertLog({
			_id: v4(),
			date: new Date(),
			model,
			operation,
			messages: msgList,
			res: content
		});
		return content;
	} catch (error: any) {
		insertLog({
			_id: v4(),
			date: new Date(),
			model,
			operation,
			messages: msgList,
			res: error.error
		});
		return null;
	}
}
