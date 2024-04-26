<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	function login() {
		fetch('/api/auth', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' }
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.success) {
					goto('/app');
				} else {
					goto('/auth');
				}
			});
	}

	onMount(() => login());
</script>

<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
	<h1 class="text-xl">Loading...</h1>
</div>
