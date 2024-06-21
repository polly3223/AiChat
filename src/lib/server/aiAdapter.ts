import {
	SECRET_GROQ_API_KEY,
	SECRET_TOGHETERAI_API_KEY,
	SECRET_FIREWORKS_API_KEY,
	SECRET_OPENAI_API_KEY,
	SECRET_ANTHROPIC_API_KEY
} from '$env/static/private';
import { type Message } from '../client/types';
import { insertLog } from './mongo';
import Groq from 'groq-sdk';
import OpenAI from 'openai';
import Anthropic from '@anthropic-ai/sdk';

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
		const response = await client.chat.completions.create({ model, messages, max_tokens: 4095 });
		insertLog({ apiProvider, model, operation, messages, response });
		return response.choices[0].message.content;
	} catch (error: any) {
		insertLog({ apiProvider, model, operation, messages, error });
		return null;
	}
}

async function cAnt(
	apiProvider: string,
	operation: string,
	client: Anthropic,
	model: string,
	messages: Message[]
): Promise<string | null> {
	const messagesAnthropicFormat = messages
		.filter((message) => message.role !== 'system')
		.map((message) => {
			return {
				role: message.role,
				content: [{ type: 'text', text: message.content }]
			};
		}) as any;

	const system = messages.find((message) => message.role === 'system')?.content;

	try {
		const response = await client.messages.create({
			model,
			messages: messagesAnthropicFormat,
			max_tokens: 4095,
			system
		});
		console.log(response);
		insertLog({ apiProvider, model, operation, messages, response });
		return response.content[0].type === 'text' ? response.content[0].text : null;
	} catch (error: any) {
		console.log(error);
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

class OpenAiClient implements AiClient {
	private client = new OpenAI({ apiKey: SECRET_OPENAI_API_KEY });
	async simpleCompletion(operation: string, messages: Message[]): Promise<string | null> {
		return c('OpenAi', operation, this.client, 'gpt-3.5-turbo', messages);
	}
	async completion(operation: string, messages: Message[]): Promise<string | null> {
		return c('OpenAi', operation, this.client, 'gpt-4o', messages);
	}
}

class AnthropicClient implements AiClient {
	private client = new Anthropic({ apiKey: SECRET_ANTHROPIC_API_KEY });
	async simpleCompletion(operation: string, messages: Message[]): Promise<string | null> {
		return cAnt('Anthropic', operation, this.client, 'claude-3-haiku-20240307', messages);
	}
	async completion(operation: string, messages: Message[]): Promise<string | null> {
		return cAnt('Anthropic', operation, this.client, 'claude-3-5-sonnet-20240620', messages);
	}
}

// export const aiClient: AiClient = new GroqClient();
// export const aiClient: AiClient = new ToghetherAiClient();
// export const aiClient: AiClient = new FireworksAiClient();
// export const aiClient: AiClient = new OpenAiClient();
export const aiClient: AiClient = new AnthropicClient();
