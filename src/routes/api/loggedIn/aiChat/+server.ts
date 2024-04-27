import { error, json, type RequestHandler } from '@sveltejs/kit';
import { reqAiChatSchema } from '$lib/client/types';
import { aiChatMsg, aiChatTitle } from '$lib/server/ai';
import { insertChat } from '$lib/server/mongo';

export const POST: RequestHandler = async ({ request }) => {
	const x = await request.json();
	const req = reqAiChatSchema.safeParse(x);
	if (!req.success) error(404, 'Invalid request');
	const chat = req.data.chat;
	insertChat(chat);
	const completion = await aiChatMsg(chat);
	if (!completion) return error(500, 'Error fetching completion');
	chat.messages.push(completion);
	if (chat.title === 'New chat') chat.title = await aiChatTitle(chat);
	insertChat(chat);
	return json({ chat });
};
