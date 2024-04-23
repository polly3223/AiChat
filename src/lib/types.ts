import { z } from 'zod';

export const messageSchema = z.object({
	role: z.enum(['user', 'assistant']),
	content: z.string()
});

export type Message = z.infer<typeof messageSchema>;
export type RenderedMessage = Message & { renderedText: string };

export const chatCompletionSchema = z.object({
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

export type ChatCompletion = z.infer<typeof chatCompletionSchema>;

export const reqAiChatSchema = z.object({
	messages: z.array(messageSchema)
});

export const resAiChatSchema = z.object({
	completion: messageSchema
});
