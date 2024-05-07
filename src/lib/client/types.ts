import { z } from 'zod';

export const messageSchema = z.object({
	role: z.enum(['user', 'system', 'assistant']),
	content: z.string()
});

export const chatSchema = z.object({
	_id: z.string(),
	title: z.string(),
	messages: z.array(messageSchema)
});

export const logSchema = z.object({
	_id: z.string(),
	date: z.date(),
	apiProvider: z.string(),
	model: z.string(),
	operation: z.string(),
	messages: z.array(messageSchema),
	usage: z.any(),
	res: z.union([messageSchema, z.any()])
});

export type Message = z.infer<typeof messageSchema>;
export type Chat = z.infer<typeof chatSchema>;
export type Log = z.infer<typeof logSchema>;
export type RenderedMessage = Message & { renderedText: string };

export const reqAiChatSchema = z.object({
	chat: chatSchema
});

export const reqAuth = z.object({
	psw: z.string()
});

export const resAiChatSchema = z.object({
	chat: chatSchema
});
