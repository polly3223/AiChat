import { json, type RequestHandler } from '@sveltejs/kit';
import { reqAuth } from '$lib/client/types';
import { SECRET_PSW } from '$env/static/private';

export const POST: RequestHandler = async ({ request, cookies }) => {
	const x = await request.json();
	const req = reqAuth.safeParse(x);
	if (!req.success) return json({ success: false });
	if (req.data.psw !== SECRET_PSW) return json({ success: false });
	cookies.set('psw', req.data.psw, { path: '/' });
	return json({ success: true });
};
