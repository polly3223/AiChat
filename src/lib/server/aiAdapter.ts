import { SECRET_GROQ_API_KEY } from '$env/static/private';
import { type Message } from '../client/types';
import { insertLog } from './mongo';
import Groq from 'groq-sdk';

const client = new Groq({ apiKey: SECRET_GROQ_API_KEY });

type ModelType = 'llama3-8b-8192' | 'llama3-70b-8192';

export async function completion(
	model: ModelType,
	operation: string,
	messages: Message[]
): Promise<string | null> {
	try {
		const response = await client.chat.completions.create({
			model,
			messages
		});
		const content = response.choices[0].message.content;
		insertLog({ model, operation, messages, usage: response.usage, res: content });
		return content;
	} catch (error: any) {
		insertLog({ model, operation, messages, res: error.error });
		return error.error.message;
	}
}
