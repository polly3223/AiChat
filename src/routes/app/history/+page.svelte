<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="flex flex-col h-[calc(100dvh-56px)] lg:h-dvh">
	<div class="overflow-auto p-2">
		<p>History</p>
		{JSON.stringify(data)}
	</div>
</div>
