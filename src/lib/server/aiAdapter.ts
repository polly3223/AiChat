import { SECRET_GROQ_API_KEY } from '$env/static/private';
import { type Message } from '../client/types';
import { insertLog } from './mongo';
import Groq from 'groq-sdk';

interface AiClient {
	simpleCompletion: (operation: string, messages: Message[]) => Promise<string | null>;
	advancedCompletion: (operation: string, messages: Message[]) => Promise<string | null>;
}

class GroqClient implements AiClient {
	private client = new Groq({ apiKey: SECRET_GROQ_API_KEY });

	async simpleCompletion(operation: string, messages: Message[]): Promise<string | null> {
		const model = 'llama3-8b-8192';
		const apiProvider = 'groq';
		try {
			const response = await this.client.chat.completions.create({ model, messages });
			const content = response.choices[0].message.content;
			insertLog({ model, apiProvider, operation, messages, usage: response.usage, res: content });
			return content;
		} catch (error: any) {
			insertLog({ model, apiProvider, operation, messages, res: error.error });
			return null;
		}
	}

	async advancedCompletion(operation: string, messages: Message[]): Promise<string | null> {
		const model = 'llama3-70b-8192';
		const apiProvider = 'groq';
		try {
			const response = await this.client.chat.completions.create({ model, messages });
			const content = response.choices[0].message.content;
			insertLog({ model, apiProvider, operation, messages, usage: response.usage, res: content });
			return content;
		} catch (error: any) {
			insertLog({ model, apiProvider, operation, messages, res: error.error });
			return null;
		}
	}
}

export const aiClient: AiClient = new GroqClient();
