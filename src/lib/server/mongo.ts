import { SECRET_MONGO_CONNECTION } from '$env/static/private';
import type { Chat, Message } from '$lib/client/types';
import { MongoClient } from 'mongodb';

const client = new MongoClient(SECRET_MONGO_CONNECTION);
await client.connect();

const db = client.db('AiChat', { ignoreUndefined: true });
const chats = db.collection<Chat>('chats');

export async function insertChat(chat: Chat) {
	return chats.replaceOne({ _id: chat._id }, chat, { upsert: true });
}

export async function getChats(): Promise<Chat[]> {
	return chats.find().toArray();
}
