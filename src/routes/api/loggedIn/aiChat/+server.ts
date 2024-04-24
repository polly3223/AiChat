import { error, json, type RequestHandler } from '@sveltejs/kit';
import { reqAiChatSchema } from '$lib/client/types';
import { fetchCompletion } from '$lib/server/lib';
import { insertChat } from '$lib/server/mongo';

export const POST: RequestHandler = async ({ request }) => {
	const x = await request.json();
	const req = reqAiChatSchema.safeParse(x);
	if (!req.success) error(404, 'Invalid request');
	const chat = req.data.chat;
	await insertChat(chat);
	const completion = await fetchCompletion(chat);
	if (!completion) return error(500, 'Error fetching completion');
	chat.messages.push(completion);
	await insertChat(chat);
	return json({ completion });
};
