<script>
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import Sidebar from '../../components/Sidebar.svelte';
	if (browser && localStorage.getItem('role') === 'USER') {
	  goto('/');
	}
  </script>
  
  <div class="flex">
	<div class="sticky top-0 w-64 h-screen border bg-white">
	  <Sidebar />
	</div>
  
	<slot></slot>
  </div>
  