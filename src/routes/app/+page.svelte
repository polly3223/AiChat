<script lang="ts">
	import Chat from './Chat.svelte';
	import TextArea from './TextArea.svelte';
	import { addUserMessage } from '$lib/client/store';
</script>

<div class="flex flex-col h-[calc(100dvh-64px)] lg:h-dvh">
	<div class="overflow-auto p-2">
		<Chat />
	</div>
	<div class="mt-auto p-2 pt-0">
		<TextArea
			on:message={(evt) => {
				addUserMessage({ role: 'user', content: evt.detail.text });
			}}
		/>
	</div>
</div>
