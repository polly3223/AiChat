import { writable } from 'svelte/store';
import { resAiChatSchema } from '$lib/client/types';
import { browser } from '$app/environment';
import { derived, type Readable } from 'svelte/store';
import MarkdownIt from 'markdown-it';
import Shiki from '@shikijs/markdown-it';
import type { Message, RenderedMessage } from '$lib/client/types';

// AUTH

export const psw = writable<string | null>(
	browser && localStorage.getItem('psw') ? localStorage.getItem('psw') : null
);

psw.subscribe((value) => {
	if (browser) {
		if (value !== null && value.length > 0) localStorage.setItem('psw', value);
		else localStorage.removeItem('psw');
	}
});

// END AUTH

export const messages = writable<Message[]>([]);
export function addMessage(msg: Message) {
	messages.update((m) => [...m, msg]);
}

messages.subscribe(async (msgs) => {
	if (browser) {
		const p = localStorage.getItem('psw');

		if (msgs.length === 0 || msgs[msgs.length - 1].role !== 'user' || p === null) return;

		const answer = await fetch(`/api/aiChat`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', psw: p },
			body: JSON.stringify({ messages: msgs })
		});

		const res = await answer.json();
		addMessage(resAiChatSchema.parse(res).completion);
	}
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
