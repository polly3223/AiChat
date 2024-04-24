<script lang="ts">
	import { psw } from '$lib/client/store';
</script>

<div class="flex h-16 shrink-0 items-center">
	<img
		class="h-8 w-auto"
		src="https://tailwindui.com/img/logos/mark.svg?color=blue&shade=500"
		alt="Your Company"
	/>
</div>
<nav class="flex flex-1 flex-col">
	<ul role="list" class="flex flex-1 flex-col gap-y-7">
		<li>
			<div class="text-xs font-semibold leading-6 text-gray-400">Your chats</div>
			<ul role="list" class="-mx-2 mt-2 space-y-1">
				<li>
					<!-- Current: "bg-gray-800 text-white", Default: "text-gray-400 hover:text-white hover:bg-gray-800" -->
					<a
						href="#"
						class="text-gray-400 hover:text-white hover:bg-gray-800 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
					>
						<span
							class="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white"
							>H</span
						>
						<span class="truncate">Heroicons</span>
					</a>
				</li>
				<li>
					<a
						href="#"
						class="text-gray-400 hover:text-white hover:bg-gray-800 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
					>
						<span
							class="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white"
							>T</span
						>
						<span class="truncate">Tailwind Labs</span>
					</a>
				</li>
				<li>
					<a
						href="#"
						class="text-gray-400 hover:text-white hover:bg-gray-800 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
					>
						<span
							class="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white"
							>W</span
						>
						<span class="truncate">Workcation</span>
					</a>
				</li>
			</ul>
		</li>
		<li class="-mx-6 mt-auto">
			<a
				href="/psw"
				class="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-gray-800"
			>
				{#if $psw !== null}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
						class="w-6 h-6"
					>
						<path
							fill-rule="evenodd"
							d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
							clip-rule="evenodd"
						/>
					</svg>
					<span>Authenticated</span>
				{:else}<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
						class="w-6 h-6"
					>
						<path
							fill-rule="evenodd"
							d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
							clip-rule="evenodd"
						/>
					</svg>
					<span>Log In</span>
				{/if}
			</a>
		</li>
	</ul>
</nav>
