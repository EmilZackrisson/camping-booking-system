<script lang="ts">
	import Navbar from '../components/Navbar.svelte';
	import { AppBar, AppRail, AppRailAnchor, AppRailTile, AppShell } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import { Avatar } from '@skeletonlabs/skeleton';
	import { autoModeWatcher } from '@skeletonlabs/skeleton';

	// Your selected Skeleton theme:
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';

	// This contains the bulk of Skeletons required styles:
	import '@skeletonlabs/skeleton/styles/skeleton.css';

	// Finally, your application's global stylesheet (sometimes labeled 'app.css')
	import '../app.css';
</script>

<!-- <Navbar /> -->

<svelte:head
	>{@html `<script>${autoModeWatcher.toString()} autoModeWatcher();</script>`}</svelte:head
>

<AppShell>
	<svelte:fragment slot="pageHeader">
		<AppBar>Camping Booking System</AppBar>
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
		<AppRail>
			<svelte:fragment slot="lead">
				<AppRailAnchor href="/">(icon)</AppRailAnchor>
			</svelte:fragment>
			<!-- --- -->
			<AppRailAnchor href="/admin" selected={$page.url.pathname === '/admin'}>
				<svelte:fragment slot="lead">
					<svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"
						><path
							d="M120-510v-330h330v330H120Zm0 390v-330h330v330H120Zm390-390v-330h330v330H510Zm0 390v-330h330v330H510ZM180-570h210v-210H180v210Zm390 0h210v-210H570v210Zm0 390h210v-210H570v210Zm-390 0h210v-210H180v210Zm390-390Zm0 180Zm-180 0Zm0-180Z"
							fill="currentColor"
						/></svg
					>
				</svelte:fragment>
				<span>Admin</span>
			</AppRailAnchor>
			<AppRailAnchor href="/admin/bookings" selected={$page.url.pathname === '/admin/bookings'}>
				<svelte:fragment slot="lead">
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M15 17C16.1046 17 17 16.1046 17 15C17 13.8954 16.1046 13 15 13C13.8954 13 13 13.8954 13 15C13 16.1046 13.8954 17 15 17Z"
							fill="currentColor"
						/>
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M6 3C4.34315 3 3 4.34315 3 6V18C3 19.6569 4.34315 21 6 21H18C19.6569 21 21 19.6569 21 18V6C21 4.34315 19.6569 3 18 3H6ZM5 18V7H19V18C19 18.5523 18.5523 19 18 19H6C5.44772 19 5 18.5523 5 18Z"
							fill="currentColor"
						/>
					</svg>
				</svelte:fragment>
				<span>Bokningar</span>
			</AppRailAnchor>
			<AppRailAnchor
				href="/admin/accomodations"
				selected={$page.url.pathname === '/admin/accomodations'}
			>
				<svelte:fragment slot="lead">
					<svg
						class="w-6 h-6 text-gray-800 dark:text-white"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 20 20"
					>
						<path
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M3 8v10a1 1 0 0 0 1 1h4v-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5h4a1 1 0 0 0 1-1V8M1 10l9-9 9 9"
						/>
					</svg>
				</svelte:fragment>
				<span>Boenden</span>
			</AppRailAnchor>
			<AppRailAnchor href="/admin/employees" selected={$page.url.pathname === '/admin/employees'}>
				<svelte:fragment slot="lead">
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M8 11C10.2091 11 12 9.20914 12 7C12 4.79086 10.2091 3 8 3C5.79086 3 4 4.79086 4 7C4 9.20914 5.79086 11 8 11ZM8 9C9.10457 9 10 8.10457 10 7C10 5.89543 9.10457 5 8 5C6.89543 5 6 5.89543 6 7C6 8.10457 6.89543 9 8 9Z"
							fill="currentColor"
						/>
						<path
							d="M11 14C11.5523 14 12 14.4477 12 15V21H14V15C14 13.3431 12.6569 12 11 12H5C3.34315 12 2 13.3431 2 15V21H4V15C4 14.4477 4.44772 14 5 14H11Z"
							fill="currentColor"
						/>
						<path d="M22 11H16V13H22V11Z" fill="currentColor" />
						<path d="M16 15H22V17H16V15Z" fill="currentColor" />
						<path d="M22 7H16V9H22V7Z" fill="currentColor" />
					</svg>
				</svelte:fragment>
				<span>Anställda</span>
			</AppRailAnchor>
			<svelte:fragment slot="trail">
				<AppRailAnchor href="/" target="_blank" title="Account">
					<Avatar initials="EZ" class="w-9/12 self-center" background="bg-primary-500" />
				</AppRailAnchor>
			</svelte:fragment>
		</AppRail>
	</svelte:fragment>
	<!-- (sidebarRight) -->
	<!-- (pageHeader) -->
	<!-- Router Slot -->
	<slot />
	<!-- ---- / ---- -->
	<!-- (pageFooter) -->
	<!-- (footer) -->
</AppShell>

<style global>
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style>
