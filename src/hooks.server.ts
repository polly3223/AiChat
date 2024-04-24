import { SECRET_PSW } from '$env/static/private';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const route = event.route.id;
	if (route && (route.includes('api/loggedin') || route.includes('app')))
		if (event.cookies.get('psw') !== SECRET_PSW)
			return new Response('Not authorized', { status: 401 });
	return resolve(event);
};
