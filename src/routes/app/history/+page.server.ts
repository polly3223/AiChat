import { getChatHistory } from '$lib/server/mongo';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({}) => {
	const history = await getChatHistory();
	return { history };
};
