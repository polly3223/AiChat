import { writable } from 'svelte/store';
import { type Message } from '$lib/client/types';
import { browser } from '$app/environment';

// AUTH

export const psw = writable<string | null>(browser ? localStorage.getItem('psw') : null);

psw.subscribe((value) => {
	if (browser && value !== null) {
		if (value.length > 5) localStorage.setItem('psw', value);
		else localStorage.removeItem('psw');
	}
});

// END AUTH

export const messages = writable<Message[]>([]);
export function addMessage(msg: Message) {
	messages.update((m) => [...m, msg]);
}
