<script lang="ts">
	import Sidebar from './Sidebar.svelte';

	let mobileShowSidebar = false;
</script>

<div>
	<div
		class:hidden={!mobileShowSidebar}
		class="relative z-50 lg:hidden"
		role="dialog"
		aria-modal="true"
	>
		<div class="fixed inset-0 bg-gray-900/80"></div>

		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div class="fixed inset-0 flex" on:click={() => (mobileShowSidebar = false)}>
			<div class="relative mr-16 flex w-full max-w-xs flex-1">
				<div class="absolute left-full top-0 flex w-16 justify-center pt-5">
					<button type="button" class="-m-2.5 p-2.5">
						<span class="sr-only">Close sidebar</span>
						<svg
							class="h-6 w-6 text-white"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							aria-hidden="true"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<div
					on:click|stopPropagation
					class="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-2 ring-1 ring-white/10"
				>
					<Sidebar />
				</div>
			</div>
		</div>
	</div>

	<div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
		<div class="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6">
			<Sidebar />
		</div>
	</div>

	<div
		class="sticky top-0 z-40 flex items-center gap-x-6 bg-gray-900 px-4 py-4 shadow-sm sm:px-6 lg:hidden"
	>
		<button
			on:click={() => (mobileShowSidebar = true)}
			type="button"
			class="-m-2.5 p-2.5 text-gray-400 lg:hidden"
		>
			<span class="sr-only">Open sidebar</span>
			<svg
				class="h-6 w-6"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				aria-hidden="true"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
				/>
			</svg>
		</button>
	</div>

	<main class="py-10 lg:pl-72">
		<div class="px-4 sm:px-6 lg:px-8">
			<slot />
		</div>
	</main>
</div>
