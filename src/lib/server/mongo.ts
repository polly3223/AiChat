import { SECRET_MONGO_CONNECTION } from '$env/static/private';
import type { Chat, Log } from '$lib/client/types';
import { MongoClient } from 'mongodb';
import { v4 } from 'uuid';
import type { Info } from './ai';

const connection = process.env.MONGODB_URI ? process.env.MONGODB_URI : SECRET_MONGO_CONNECTION;

const client = new MongoClient(connection);
await client.connect();

const db = client.db('AiChat', { ignoreUndefined: true });
const chats = db.collection<Chat>('chats');
const logs = db.collection<Log>('logs');
const infos = db.collection<Info>('infos');

export async function insertChat(chat: Chat) {
	return chats.replaceOne({ _id: chat._id }, chat, { upsert: true });
}

export async function insertLog(log: Omit<Log, '_id' | 'date'>) {
	return logs.insertOne({ date: new Date(), _id: v4(), ...log });
}

export async function insertInfolist(infolist: Info[]) {
	return infos.insertMany(infolist);
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
