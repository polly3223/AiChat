<script lang="ts">
	import { goto } from '$app/navigation';
	let psw = '';

	function login() {
		fetch('/api/auth', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ psw })
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.success) {
					goto('/app');
				}
			});
	}
</script>

<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
	<div class="mx-auto max-w-xs text-center">
		<div class="relative pb-4">
			<label
				for="Password"
				class="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
				>Password</label
			>
			<input
				type="text"
				name="Password"
				id="Password"
				bind:value={psw}
				class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring- -600 sm:text-sm sm:leading-6"
				placeholder="psw"
			/>
		</div>
		<button
			type="button"
			on:click={login}
			class="inline-block rounded-md bg-blue-100 px-2.5 py-1.5 text-sm font-semibold text-blue-600 shadow-sm hover:bg-blue-200"
			>Log In</button
		>
	</div>
</div>
