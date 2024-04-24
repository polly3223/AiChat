<script lang="ts">
	import { derived, type Readable } from 'svelte/store';
	import MarkdownIt from 'markdown-it';
	import Shiki from '@shikijs/markdown-it';
	import type { Message, RenderedMessage } from '$lib/types';

	export let messages: Readable<Message[]>;

	let markdownIt: MarkdownIt;

	function getMd(): Promise<MarkdownIt> {
		if (markdownIt) return Promise.resolve(markdownIt);
		return new Promise(async (resolve) => {
			markdownIt = MarkdownIt();
			const shiki = await Shiki({
				themes: { light: 'github-dark' }
			});
			markdownIt.use(shiki);
			resolve(markdownIt);
		});
	}

	export const renderedMessages = derived<Readable<Message[]>, RenderedMessage[]>(
		messages,
		($messages, set) => {
			getMd().then((md) => {
				set($messages.map((message) => ({ ...message, renderedText: md.render(message.content) })));
			});
		},
		[]
	);
</script>

<div class="flex flex-col pt-4">
	{#each $renderedMessages as message}
		<div
			class={`overflow-hidden px-3 py-2 m-2 rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 bg-white ${message.role === 'user' ? 'ml-auto bg-blue-100' : 'mr-auto'}`}
		>
			<div class="prose prose-sm max-w-[250px] md:max-w-[500px] lg:max-w-[1200px] overflow-y-auto">
				{@html message.renderedText}
				<!-- <pre>{message.content}</pre> -->
			</div>
		</div>
	{/each}
</div>
