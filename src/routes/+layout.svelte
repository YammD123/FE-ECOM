<script>
	import { Toaster } from 'svelte-sonner';
	import '../app.css';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import { page } from '$app/state';
	import Navbar from '../components/Navbar.svelte';
	import Footer from '../components/Footer.svelte';

	if (browser && localStorage.getItem('token') === null) {
		goto('/user/login');
	}

	let { children } = $props();
</script>

{#if page.url.pathname === '/user/login' || page.url.pathname === '/user/register' || page.url.pathname === '/dashboard/user' || page.url.pathname === '/dashboard/category' || page.url.pathname==="/dashboard/order"}
	<Toaster position="top-right" richColors />
	{@render children()}
	{:else}
	<Toaster position="top-right" richColors />
	<Navbar/>
	{@render children()}
	<Footer/>
{/if}
