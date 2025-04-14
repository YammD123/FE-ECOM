<script lang="ts">
	import { page } from '$app/state';
	import { PUBLIC_API_URL_BE } from '$env/static/public';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import * as Card from '$lib/components/ui/card/index.js';
	$: id = page.params.id;
	let product: any = null;
	let loading = true;
	let error: string | null = null;

	async function fetchProduct() {
		try {
			const res = await fetch(`${PUBLIC_API_URL_BE}/product/search/${id}`);
			if (!res.ok) throw new Error('Failed to fetch product');
			const data = await res.json();
			if (data.status === 404) {
				error = 'Product not found';
				return;
			}
			product = data;
		} catch (err) {
			console.error('Error fetching product:', err);
			error = 'Unable to load product. Please try again later.';
		} finally {
			loading = false;
		}
	}

	onMount(fetchProduct);
</script>

<div class="container mx-auto flex min-h-[60vh] flex-col items-center px-6 py-12">
	{#if loading}
		<p class="animate-pulse text-xl font-medium text-gray-500" transition:fade={{ duration: 300 }}>
			Loading product...
		</p>
	{:else if error}
		<p
			class="max-w-xl rounded-lg bg-red-100 px-6 py-4 text-center text-base font-medium text-red-600 shadow-sm sm:text-lg"
			transition:fade={{ duration: 300 }}
		>
			{error}
		</p>
	{:else if product?.data?.length}
		<div
			class="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
		>
			{#each product.data as prodd, index (index)}
				<a href={`/detail/${prodd.id}`} data-sveltekit-preload-data="hover">
					<div class="group relative">
						<Card.Root
							class="w-full overflow-hidden rounded-xl border border-gray-100 bg-white shadow-md transition-all duration-300 hover:shadow-xl"
						>
							<Card.Content class="p-4">
								<div class="relative overflow-hidden rounded-lg">
									<img
										src={prodd.product_image}
										alt={prodd.name}
										class="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
									/>
									<div
										class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
									></div>
								</div>
								<div class="mt-4">
									<h3 class="truncate text-base font-semibold leading-tight text-gray-900">
										{prodd.product_name}
									</h3>
									<p class="mt-1 text-sm font-medium text-gray-500">
										Rp. {prodd.price.toLocaleString()}
									</p>
								</div>
							</Card.Content>
						</Card.Root>
					</div>
				</a>
			{/each}
		</div>
	{:else}
		<p
			class="max-w-xl rounded-lg bg-red-100 px-6 py-4 text-center text-base font-medium text-red-600 shadow-sm sm:text-lg"
			transition:fade={{ duration: 300 }}
		>
			No products found.
		</p>
	{/if}
</div>
