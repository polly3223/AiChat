import { SECRET_GROQ_API_KEY, SECRET_TOGHETERAI_API_KEY } from '$env/static/private';
import { type Message } from '../client/types';
import { insertLog } from './mongo';
import Groq from 'groq-sdk';
import OpenAI from 'openai';

export type Tool = {
	type: 'function';
	function: {
		name: string;
		description: string;
		parameters: {
			type: 'object';
			properties: {
				[key: string]: {
					type: string;
					description: string;
				};
			};
			required: string[];
		};
	};
};

interface AiClient {
	simpleCompletion: (operation: string, messages: Message[]) => Promise<string | null>;
	advancedCompletion: (
		operation: string,
		messages: Message[],
		tools?: Tool[]
	) => Promise<string | null>;
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

	async advancedCompletion(
		operation: string,
		messages: Message[],
		tools?: Tool[]
	): Promise<string | null> {
		const model = 'llama3-70b-8192';
		const apiProvider = 'groq';
		try {
			const response = await this.client.chat.completions.create({
				model,
				messages,
				tools
			});
			let content = response.choices[0].message.content;
			const tool_calls = response.choices[0].message.tool_calls;
			if (tool_calls) {
				content = JSON.stringify(tool_calls, null, 2);
			}
			insertLog({ model, apiProvider, operation, messages, usage: response.usage, res: content });
			return content;
		} catch (error: any) {
			insertLog({ model, apiProvider, operation, messages, res: error.error });
			return null;
		}
	}
}

class ToghetherAiClient implements AiClient {
	private client = new OpenAI({
		apiKey: SECRET_TOGHETERAI_API_KEY,
		baseURL: 'https://api.together.xyz/v1'
	});

	async simpleCompletion(operation: string, messages: Message[]): Promise<string | null> {
		const model = 'meta-llama/Llama-3-8b-chat-hf';
		const apiProvider = 'TogetherAI';
		try {
			const response = await this.client.chat.completions.create({ model, messages });
			const content = response.choices[0].message.content;
			insertLog({ model, apiProvider, operation, messages, usage: response.usage, res: content });
			return content;
		} catch (error: any) {
			insertLog({ model, apiProvider, operation, messages, res: error });
			return null;
		}
	}

	async advancedCompletion(
		operation: string,
		messages: Message[],
		tools?: Tool[]
	): Promise<string | null> {
		// const model = 'meta-llama/Llama-3-70b-chat-hf'; // This is better but can't handle tools for now
		const model = 'togethercomputer/CodeLlama-34b-Instruct';
		const apiProvider = 'TogetherAI';
		try {
			const response = await this.client.chat.completions.create({
				model,
				messages,
				tools,
				tool_choice: 'auto'
			});
			let content = response.choices[0].message.content;
			const tool_calls = response.choices[0].message.tool_calls;
			if (tool_calls) {
				content += JSON.stringify(tool_calls, null, 2);
			}
			insertLog({ model, apiProvider, operation, messages, usage: response.usage, res: content });
			return content;
		} catch (error: any) {
			insertLog({ model, apiProvider, operation, messages, res: error });
			return null;
		}
	}
}

export const aiClient: AiClient = new GroqClient();
// export const aiClient: AiClient = new ToghetherAiClient();
