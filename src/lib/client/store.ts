import { writable } from 'svelte/store';
import { resAiChatSchema } from '$lib/client/types';
import { derived, type Readable } from 'svelte/store';
import MarkdownIt from 'markdown-it';
import Shiki from '@shikijs/markdown-it';
import type { Chat, Message, RenderedMessage } from '$lib/client/types';
import { v4 } from 'uuid';

export const chatStore = writable<Chat>({ _id: v4(), title: 'New chat', messages: [] });
export function addMessage(msg: Message) {
	chatStore.update((c) => ({ ...c, messages: [...c.messages, msg] }));
}

chatStore.subscribe(async (c) => {
	const msgs = c.messages;
	if (msgs.length === 0 || msgs[msgs.length - 1].role !== 'user') return;

	const res = await fetch(`/api/loggedIn/aiChat`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ chat: c })
	});

	const resJson = await res.json();
	const chat = resAiChatSchema.parse(resJson).chat;
	chatStore.set(chat);
});

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
