<script>
	import { Toaster } from 'svelte-sonner';
	import '../app.css';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';

	if (browser && localStorage.getItem('token')===null) {
		goto('/user/login');
	}
</script>

<Toaster position="top-right" richColors />
<slot></slot>
