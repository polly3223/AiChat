import { json, type RequestHandler } from '@sveltejs/kit';
import { reqAuth } from '$lib/client/types';
import { SECRET_PSW } from '$env/static/private';

export const POST: RequestHandler = async ({ request, cookies }) => {
	if (cookies.get('psw') === SECRET_PSW) return json({ success: true });

	try {
		const x = await request.json();
		const req = reqAuth.safeParse(x);
		if (!req.success) return json({ success: false });
		if (req.data.psw !== SECRET_PSW) return json({ success: false });

		// Set the cookie to expire in 30 days
		const expiryDate = new Date();
		expiryDate.setDate(expiryDate.getDate() + 30);
		cookies.set('psw', req.data.psw, { path: '/', expires: expiryDate });

		return json({ success: true });
	} catch (err) {
		return json({ success: false });
	}
};
