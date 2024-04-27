<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="flex flex-col h-[calc(100dvh-56px)] lg:h-dvh">
	<div class="overflow-auto p-4">
		<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
			{#each data.chats as c}
				<div
					class="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm hover:border-gray-400"
				>
					<div class="min-w-0 flex-1">
						<a href="/" class="focus:outline-none">
							<span class="absolute inset-0" aria-hidden="true"></span>
							<p class="text-sm font-medium text-gray-900">{c.title}</p>
						</a>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
