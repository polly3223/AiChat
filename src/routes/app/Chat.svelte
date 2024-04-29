<script lang="ts">
	import { chatStore, renderedMessages } from '$lib/client/store';

	function copyMessage(message: string) {
		navigator.clipboard.writeText(message);
	}
</script>

<h1 class="text-lg text-center md:text-left px-3 font-semibold">{$chatStore.title}</h1>
<div class="flex flex-col pt-4">
	{#each $renderedMessages as message}
		<div
			class={`overflow-hidden px-3 pt-2 m-2 rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 ${message.role === 'user' ? 'ml-auto bg-blue-100' : 'mr-auto bg-white'}`}
		>
			<div
				class="pb-2 prose prose-sm max-w-[250px] md:max-w-[500px] lg:max-w-[1200px] overflow-y-auto"
			>
				{@html message.renderedText}
			</div>
			<div class="py-2">
				<button
					class="text-gray-500 hover:text-gray-700"
					on:click={() => copyMessage(message.content)}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-5 h-5"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
						/>
					</svg>
				</button>

				<button class="text-gray-500 hover:text-gray-700">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="ml-1 w-5 h-5"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
						/>
					</svg>
				</button>
			</div>
		</div>
	{/each}
</div>
