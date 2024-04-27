import { getChat } from '$lib/server/mongo';
import { error, json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
	const chatId = url.searchParams.get('chatId');
	if (!chatId) return error(404, 'No chatId provided');
	const chat = await getChat(chatId);
	if (!chat) return error(404, 'Chat not found');
	return json({ chat });
};
