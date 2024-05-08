import {
	SECRET_GROQ_API_KEY,
	SECRET_TOGHETERAI_API_KEY,
	SECRET_FIREWORKS_API_KEY
} from '$env/static/private';
import { type Message } from '../client/types';
import { insertLog } from './mongo';
import Groq from 'groq-sdk';
import OpenAI from 'openai';

interface AiClient {
	simpleCompletion: (operation: string, messages: Message[]) => Promise<string | null>;
	completion: (operation: string, messages: Message[]) => Promise<string | null>;
}

async function c(
	apiProvider: string,
	operation: string,
	client: any,
	model: string,
	messages: Message[]
): Promise<string | null> {
	try {
		const response = await client.chat.completions.create({ model, messages });
		insertLog({ apiProvider, model, operation, messages, response });
		return response.choices[0].message.content;
	} catch (error: any) {
		insertLog({ apiProvider, model, operation, messages, error });
		return null;
	}
}

class GroqClient implements AiClient {
	private client = new Groq({ apiKey: SECRET_GROQ_API_KEY });
	async simpleCompletion(operation: string, messages: Message[]): Promise<string | null> {
		return c('groq', operation, this.client, 'llama3-8b-8192', messages);
	}
	async completion(operation: string, messages: Message[]): Promise<string | null> {
		return c('groq', operation, this.client, 'llama3-70b-8192', messages);
	}
}

class ToghetherAiClient implements AiClient {
	private client = new OpenAI({
		apiKey: SECRET_TOGHETERAI_API_KEY,
		baseURL: 'https://api.together.xyz/v1'
	});
	async simpleCompletion(operation: string, messages: Message[]): Promise<string | null> {
		return c('TogetherAI', operation, this.client, 'meta-llama/Llama-3-8b-chat-hf', messages);
	}
	async completion(operation: string, messages: Message[]): Promise<string | null> {
		return c('TogetherAI', operation, this.client, 'meta-llama/Llama-3-70b-chat-hf', messages);
	}
}

class FireworksAiClient implements AiClient {
	private client = new OpenAI({
		apiKey: SECRET_FIREWORKS_API_KEY,
		baseURL: 'https://api.fireworks.ai/inference/v1'
	});
	async simpleCompletion(operation: string, messages: Message[]): Promise<string | null> {
		const model = 'accounts/fireworks/models/llama-v3-8b-instruct-hf';
		return c('FireworksAi', operation, this.client, model, messages);
	}
	async completion(operation: string, messages: Message[]): Promise<string | null> {
		const model = 'accounts/fireworks/models/llama-v3-70b-instruct-hf';
		return c('FireworksAi', operation, this.client, model, messages);
	}
}

// export const aiClient: AiClient = new GroqClient();
// export const aiClient: AiClient = new ToghetherAiClient();
export const aiClient: AiClient = new FireworksAiClient();
