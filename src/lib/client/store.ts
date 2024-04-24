import { writable } from 'svelte/store';
import { resAiChatSchema } from '$lib/client/types';
import { derived, type Readable } from 'svelte/store';
import MarkdownIt from 'markdown-it';
import Shiki from '@shikijs/markdown-it';
import type { Message, RenderedMessage } from '$lib/client/types';

export const messages = writable<Message[]>([]);
export function addMessage(msg: Message) {
	messages.update((m) => [...m, msg]);
}

messages.subscribe(async (msgs) => {
	if (msgs.length === 0 || msgs[msgs.length - 1].role !== 'user') return;

	const answer = await fetch(`/api/loggedIn/aiChat`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ messages: msgs })
	});

	const res = await answer.json();
	addMessage(resAiChatSchema.parse(res).completion);
});

let markdownIt: MarkdownIt;

function getMd(): Promise<MarkdownIt> {
	if (markdownIt) return Promise.resolve(markdownIt);
	return new Promise(async (resolve) => {
		markdownIt = MarkdownIt();
		const shiki = await Shiki({
			themes: { light: 'github-dark' }
		});
		markdownIt.use(shiki);
		resolve(markdownIt);
	});
}

export const renderedMessages = derived<Readable<Message[]>, RenderedMessage[]>(
	messages,
	($messages, set) => {
		getMd().then((md) => {
			set($messages.map((message) => ({ ...message, renderedText: md.render(message.content) })));
		});
	},
	[]
);
