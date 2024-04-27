<script lang="ts">
	import { goto } from '$app/navigation';
	import { chatStore } from '$lib/client/store';
	import { resAiChatSchema } from '$lib/client/types';
	import type { PageData } from './$types';

	export let data: PageData;

	async function loadChat(chatId: string) {
		const res = await fetch(`/api/loggedIn/getChat?chatId=${chatId}`, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' }
		});
		const resJson = await res.json();
		const chat = resAiChatSchema.parse(resJson).chat;
		chatStore.set(chat);
		goto(`/app`);
	}
</script>

<div class="flex flex-col h-[calc(100dvh-56px)] lg:h-dvh">
	<div class="overflow-auto p-4">
		<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
			{#each data.history as c}
				<div
					class="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm hover:border-gray-400"
				>
					<div class="min-w-0 flex-1">
						<button class="focus:outline-none" on:click={() => loadChat(c._id)}>
							<span class="absolute inset-0" aria-hidden="true"></span>
							<p class="text-sm font-medium text-gray-900 text-left">{c.title}</p>
						</button>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
