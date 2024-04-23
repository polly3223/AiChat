<script lang="ts">
	import { onMount } from 'svelte';
	import MarkdownIt from 'markdown-it';
	import Shiki from '@shikijs/markdown-it';

	let md: MarkdownIt;
	let renderedMessages: { user: 'user' | 'ai'; text: string; renderedText: string }[] = [];

	async function init() {
		md = MarkdownIt();

		const shiki = await Shiki({
			themes: { light: 'github-dark' }
		});

		md.use(shiki);

		renderedMessages = messages.map((message) => ({
			...message,
			renderedText: md ? md.render(message.text) : ''
		}));
	}

	onMount(init);

	export let messages: { user: 'user' | 'ai'; text: string }[];
</script>

<div class="flex flex-col pt-4">
	{#each renderedMessages as message}
		<div
			class={`overflow-hidden px-3 py-2 m-2 rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 bg-white ${message.user === 'user' ? 'ml-auto bg-blue-50' : 'mr-auto'}`}
		>
			<div class="prose prose-sm max-w-[250px] md:max-w-[500px] lg:max-w-[1200px] overflow-y-auto">
				{@html message.renderedText}
			</div>
		</div>
	{/each}
</div>
