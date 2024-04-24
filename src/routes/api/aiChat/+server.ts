import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { reqAiChatSchema } from '$lib/client/types';
import { fetchCompletion } from '$lib/server/lib';
import { createChat } from '$lib/server/mongo';

export const POST: RequestHandler = async ({ request }) => {
	const x = await request.json();
	const req = reqAiChatSchema.safeParse(x);
	if (!req.success) error(404, 'Invalid request');

	await createChat();

	const completion = await fetchCompletion(req.data.messages);
	return json({ completion });
};
