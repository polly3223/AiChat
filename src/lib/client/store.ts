import { writable } from 'svelte/store';
import { type Message } from '$lib/client/types';

export const messages = writable<Message[]>([]);

export function addMessage(msg: Message) {
	messages.update((m) => [...m, msg]);
}
