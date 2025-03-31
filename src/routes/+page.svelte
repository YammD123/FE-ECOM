<script lang="ts">
	import { toast } from 'svelte-sonner';

	function showToast() {
		toast.success("askddddd");
	}
</script>

<main class="items-center flex justify-center min-h-screen flex-col">
	<h1 class="text-4xl text-yellow-400">SELAMAT HARI RAYA</h1>
	<button onclick={showToast} class="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
		Tampilkan Toast
	</button>
</main>
