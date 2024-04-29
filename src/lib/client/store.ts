import { writable } from 'svelte/store';
import { resAiChatSchema } from '$lib/client/types';
import { derived, type Readable } from 'svelte/store';
import MarkdownIt from 'markdown-it';
import Shiki from '@shikijs/markdown-it';
import type { Chat, Message, RenderedMessage } from '$lib/client/types';
import { v4 } from 'uuid';

export const chatStore = writable<Chat>({ _id: v4(), title: 'New chat', messages: [] });
export function deleteMessage(index: number) {
	chatStore.update((c) => ({ ...c, messages: c.messages.filter((_, i) => i !== index) }));
}

export async function addUserMessage(msg: Message) {
	if (!msg.content || msg.role !== 'user') return;

	chatStore.update((c) => {
		const updatedChat = { ...c, messages: [...c.messages, msg] };
		queryAiChat(updatedChat);
		return updatedChat;
	});
}

async function queryAiChat(chat: Chat) {
	const res = await fetch(`/api/loggedIn/aiChat`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ chat })
	});
	const resJson = await res.json();
	chatStore.set(resAiChatSchema.parse(resJson).chat);
}

let markdownIt: MarkdownIt;
function getMd(): Promise<MarkdownIt> {
	if (markdownIt) return Promise.resolve(markdownIt);
	return new Promise(async (resolve) => {
		markdownIt = MarkdownIt();
		const shiki = await Shiki({ themes: { light: 'github-dark' } });
		markdownIt.use(shiki);
		resolve(markdownIt);
	});
}

export const renderedMessages = derived<Readable<Chat>, RenderedMessage[]>(
	chatStore,
	($chat, set) => {
		getMd().then((md) => {
			set(
				$chat.messages.map((message) => ({ ...message, renderedText: md.render(message.content) }))
			);
		});
	},
	[]
);
