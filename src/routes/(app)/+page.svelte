<script lang="ts">
	import { writable } from 'svelte/store';
	import Chat from './Chat.svelte';
	import TextArea from './TextArea.svelte';
	import type { Message } from '$lib/types';

	const messages = writable<Message[]>([{ user: 'ai', text: 'Hello!' }]);

	function addMessage(msg: Message) {
		messages.update((m) => [...m, msg]);
	}
</script>

<div class="flex flex-col h-[calc(100dvh-56px)] lg:h-dvh">
	<div class="overflow-auto p-2">
		<Chat {messages} />
	</div>
	<div class="mt-auto p-2 pt-0">
		<TextArea
			on:message={(evt) => {
				addMessage({ user: 'user', text: evt.detail.text });
			}}
		/>
	</div>
</div>
