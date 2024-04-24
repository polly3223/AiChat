import { z } from 'zod';

export const messageSchema = z.object({
	role: z.enum(['user', 'system', 'assistant']),
	content: z.string()
});

export const chatSchema = z.object({
	_id: z.string(),
	name: z.string(),
	messages: z.array(messageSchema)
});

export type Message = z.infer<typeof messageSchema>;
export type Chat = z.infer<typeof chatSchema>;
export type RenderedMessage = Message & { renderedText: string };

export const reqAiChatSchema = z.object({
	chat: chatSchema
});

export const reqAuth = z.object({
	psw: z.string()
});

export const resAiChatSchema = z.object({
	completion: messageSchema
});
