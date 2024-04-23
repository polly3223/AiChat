<script lang="ts">
	import { onMount } from 'svelte';
	import MarkdownIt from 'markdown-it';
	import Shiki from '@shikijs/markdown-it';

	let md: MarkdownIt;
	let renderedMessages: { user: 'user' | 'ai'; text: string; renderedText: string }[] = [];

	async function init() {
		md = MarkdownIt();

		const shiki = await Shiki({
			themes: {
				light: 'slack-dark'
			}
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
			class={`overflow-hidden rounded-md bg-white px-6 py-4 m-2 shadow ${message.user === 'user' ? 'ml-auto' : 'mr-auto'}`}
		>
			<div class="prose">
				{@html message.renderedText}
			</div>
		</div>
	{/each}
</div>
