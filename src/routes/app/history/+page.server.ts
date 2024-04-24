import { getChats } from '$lib/server/mongo';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({}) => {
	const chats = await getChats();
	return { chats };
};
