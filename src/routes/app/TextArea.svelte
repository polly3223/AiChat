<script lang="ts">
	import { v4 } from 'uuid';
	import { createEventDispatcher } from 'svelte';
	import { chatStore } from '$lib/client/store';

	const msgPlaceholder = 'Message AI...';

	let text = '';

	const dispatch = createEventDispatcher();

	function sendMessage() {
		if (text.trim() === '') return;
		dispatch('message', { text });
		text = '';
	}

	function clearChat() {
		chatStore.set({ _id: v4(), title: 'New chat', messages: [] });
	}
</script>

<div class="flex items-start space-x-4">
	<div class="min-w-0 flex-1">
		<form action="#" class="relative">
			<div
				class="overflow-hidden rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-blue-600 bg-white"
			>
				<label for="comment" class="sr-only">{msgPlaceholder}</label>
				<textarea
					rows="4"
					bind:value={text}
					name="comment"
					id="comment"
					class="block w-full resize-none border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
					placeholder={msgPlaceholder}
				></textarea>
			</div>
		</form>
	</div>
</div>
<div class="flex justify-center pt-2 gap-2">
	<button
		on:click={clearChat}
		class="min-w-36 inline-flex items-center align-items-center justify-center rounded-md bg-red-100 px-2.5 py-1.5 text-sm font-semibold text-red-600 shadow-sm hover:bg-red-200"
	>
		Clear Chat
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 16 16"
			fill="currentColor"
			class="w-4 h-4 ml-1"
		>
			<path
				fill-rule="evenodd"
				d="M5 3.25V4H2.75a.75.75 0 0 0 0 1.5h.3l.815 8.15A1.5 1.5 0 0 0 5.357 15h5.285a1.5 1.5 0 0 0 1.493-1.35l.815-8.15h.3a.75.75 0 0 0 0-1.5H11v-.75A2.25 2.25 0 0 0 8.75 1h-1.5A2.25 2.25 0 0 0 5 3.25Zm2.25-.75a.75.75 0 0 0-.75.75V4h3v-.75a.75.75 0 0 0-.75-.75h-1.5ZM6.05 6a.75.75 0 0 1 .787.713l.275 5.5a.75.75 0 0 1-1.498.075l-.275-5.5A.75.75 0 0 1 6.05 6Zm3.9 0a.75.75 0 0 1 .712.787l-.275 5.5a.75.75 0 0 1-1.498-.075l.275-5.5a.75.75 0 0 1 .786-.711Z"
				clip-rule="evenodd"
			/>
		</svg>
	</button>
	<button
		on:click={sendMessage}
		class="min-w-36 inline-flex items-center align-items-center justify-center rounded-md bg-blue-100 px-2.5 py-1.5 text-sm font-semibold text-blue-600 shadow-sm hover:bg-blue-200"
	>
		Send message
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 16 16"
			fill="currentColor"
			class="w-4 h-4 ml-1"
		>
			<path
				d="M2.87 2.298a.75.75 0 0 0-.812 1.021L3.39 6.624a1 1 0 0 0 .928.626H8.25a.75.75 0 0 1 0 1.5H4.318a1 1 0 0 0-.927.626l-1.333 3.305a.75.75 0 0 0 .811 1.022 24.89 24.89 0 0 0 11.668-5.115.75.75 0 0 0 0-1.175A24.89 24.89 0 0 0 2.869 2.298Z"
			/>
		</svg>
	</button>
</div>
