<script lang="ts">
	import SvelteMarkdown from 'svelte-markdown';
	export let messages: { user: 'user' | 'ai'; text: string }[];
</script>

<!-- <div class="flex justify-center pt-4">
	<div class="overflow-hidden rounded-md bg-white px-6 py-4 shadow">Msg 1</div>
	<div class="overflow-hidden rounded-md bg-white px-6 py-4 shadow">Msg 2</div>
</div> -->

<div class="flex flex-col pt-4">
	{#each messages as message (message.text)}
		<div
			class={`overflow-hidden rounded-md bg-white px-6 py-4 m-2 shadow ${message.user === 'user' ? 'ml-auto' : 'mr-auto'}`}
		>
			<div class="prose">
				<SvelteMarkdown source={message.text} />
			</div>
		</div>
	{/each}
</div>
