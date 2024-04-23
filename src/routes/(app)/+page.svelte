<script lang="ts">
	import Chat from './Chat.svelte';
	import TextArea from './TextArea.svelte';
</script>

<div class="flex flex-col h-[calc(100dvh-56px)] lg:h-dvh">
	<div class="overflow-auto px-6 py-4">
		<Chat />
	</div>
	<div class="mt-auto px-6 py-4">
		<TextArea />
	</div>
</div>
