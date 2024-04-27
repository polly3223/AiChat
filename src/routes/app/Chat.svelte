<script lang="ts">
	import { chatStore, renderedMessages } from '$lib/client/store';
</script>

<h1 class="text-lg text-center md:text-left px-3 font-semibold">{$chatStore.title}</h1>
<div class="flex flex-col pt-4">
	{#each $renderedMessages as message}
		<div
			class={`overflow-hidden px-3 py-2 m-2 rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 ${message.role === 'user' ? 'ml-auto bg-blue-100' : 'mr-auto bg-white'}`}
		>
			<div class="prose prose-sm max-w-[250px] md:max-w-[500px] lg:max-w-[1200px] overflow-y-auto">
				{@html message.renderedText}
			</div>
		</div>
	{/each}
</div>
