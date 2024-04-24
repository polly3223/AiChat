<script lang="ts">
	import Chat from './Chat.svelte';
	import TextArea from './TextArea.svelte';
	import { resAiChatSchema } from '$lib/client/types';
	import { addMessage, messages } from '$lib/client/store';

	messages.subscribe(async (msgs) => {
		if (msgs.length === 0 || msgs[msgs.length - 1].role !== 'user') return;

		const answer = await fetch(`/api/aiChat`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ messages: msgs })
		});

		const res = await answer.json();
		const resParsed = resAiChatSchema.safeParse(res);

		if (resParsed.success) {
			addMessage(resParsed.data.completion);
		} else {
			console.error(resParsed.error);
		}
	});
</script>

<div class="flex flex-col h-[calc(100dvh-56px)] lg:h-dvh">
	<div class="overflow-auto p-2">
		<Chat />
	</div>
	<div class="mt-auto p-2 pt-0">
		<TextArea
			on:message={(evt) => {
				addMessage({ role: 'user', content: evt.detail.text });
			}}
		/>
	</div>
</div>
