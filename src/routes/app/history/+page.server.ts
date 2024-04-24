import type { PageServerLoad } from './$types';
import { getChats } from '$lib/server/mongo';

export const load: PageServerLoad = async ({}) => {
	const chats = await getChats();
	return { chats };
};
