import { SECRET_MONGO_CONNECTION } from '$env/static/private';
import { MongoClient } from 'mongodb';

const client = new MongoClient(SECRET_MONGO_CONNECTION);
await client.connect();

const db = client.db('AiChat', { ignoreUndefined: true });
const chats = db.collection('chats');

export async function createChat() {
	try {
		await chats.insertOne({ name: 'test chat' });
	} catch (err) {}
}
