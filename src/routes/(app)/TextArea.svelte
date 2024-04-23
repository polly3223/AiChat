<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const msgPlaceholder = 'Message AI...';

	let text = '';

	const dispatch = createEventDispatcher();

	function sendMessage() {
		if (text.trim() === '') return;
		dispatch('message', { text });
		text = '';
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
					rows="5"
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

<div class="flex justify-center pt-4">
	<div class="flex-shrink-0">
		<button
			on:click={sendMessage}
			type="submit"
			class="inline-flex items-center align-items-center justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
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
</div>
