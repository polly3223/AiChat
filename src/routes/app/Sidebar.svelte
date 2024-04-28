<script lang="ts">
	import { page } from '$app/stores';
	import logo from '$lib/assets/logo.png';

	function classWhenActive(path: string, currentPath: string) {
		return path === currentPath
			? 'bg-gray-800 text-white gap-x-3 rounded-md p-2 text-sm group flex leading-6 font-semibold'
			: 'text-gray-400 hover:text-white hover:bg-gray-800 gap-x-3 rounded-md p-2 group flex text-sm leading-6 font-semibold';
	}
</script>

<div class="flex h-16 shrink-0 items-center text-white">
	<div class="flex items-center">
		<img class="h-8 pl-0" src={logo} alt="AiChat logo" />
		<span class="h-8 whitespace-nowrap pl-2 text-xl sm:text-2xl font-light">Ai</span>
		<span class="h-8 whitespace-nowrap text-xl sm:text-2xl font-bold">Chat</span>
	</div>
</div>
<nav class="flex flex-1 flex-col">
	<ul role="list" class="flex flex-1 flex-col gap-y-7">
		<li>
			<ul role="list" class="-mx-2 space-y-1">
				<li>
					<a href="/app" class={classWhenActive('/app', $page.url.pathname)}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="h-6 w-6 shrink-0"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
							/>
						</svg>

						Chat
					</a>
				</li>
				<li>
					<a href="/app/history" class={classWhenActive('/app/history', $page.url.pathname)}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="h-6 w-6 shrink-0"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
							/>
						</svg>

						History
					</a>
				</li>
			</ul>
		</li>
	</ul>
</nav>
