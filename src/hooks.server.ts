import { SECRET_PSW } from '$env/static/private';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	console.log('event.request.url', event.request.url);
	console.log('psw', event.request.headers.get('psw'));
	if (event.request.url.includes('api'))
		if (event.request.headers.get('psw') !== SECRET_PSW)
			return new Response('Not authorized', { status: 401 });
	return resolve(event);
};
