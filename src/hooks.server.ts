import { SECRET_PSW } from '$env/static/private';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	if (event.request.url.includes('api/loggedin') || event.request.url.includes('app'))
		if (event.cookies.get('psw') !== SECRET_PSW)
			return new Response('Not authorized', { status: 401 });
	return resolve(event);
};
