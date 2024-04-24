import { z } from 'zod';

export const messageSchema = z.object({
	role: z.enum(['user', 'system', 'assistant']),
	content: z.string()
});

export type Message = z.infer<typeof messageSchema>;
export type RenderedMessage = Message & { renderedText: string };

export const reqAiChatSchema = z.object({
	messages: z.array(messageSchema)
});

export const reqAuth = z.object({
	psw: z.string()
});

export const resAiChatSchema = z.object({
	completion: messageSchema
});
