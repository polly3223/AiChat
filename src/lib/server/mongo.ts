import { SECRET_MONGO_CONNECTION } from '$env/static/private';
import type { Chat, Log } from '$lib/client/types';
import { MongoClient } from 'mongodb';

const client = new MongoClient(SECRET_MONGO_CONNECTION);
await client.connect();

const db = client.db('AiChat', { ignoreUndefined: true });
const chats = db.collection<Chat>('chats');
const logs = db.collection<Log>('logs');

export async function insertChat(chat: Chat) {
	return chats.replaceOne({ _id: chat._id }, chat, { upsert: true });
}

export async function insertLog(log: Log) {
	return logs.insertOne(log);
}

export async function getChatHistory(): Promise<{ _id: string; title: string }[]> {
	return chats
		.aggregate([
			{
				$project: {
					_id: 1,
					title: 1
				}
			}
		])
		.toArray() as Promise<{ _id: string; title: string }[]>;
}

export async function getChat(chatId: string): Promise<Chat | null> {
	return chats.findOne({ _id: chatId });
}

export async function getLogs(): Promise<Log[]> {
	return logs.find().toArray();
}
