<script lang="ts">
	import { PUBLIC_API_URL_BE } from '$env/static/public';
	import { toast } from 'svelte-sonner';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';

	let data: any = $state([]);
	async function getProduct() {
		const res = await fetch(`${PUBLIC_API_URL_BE}/product/all`);
		data = await res.json();
		console.log(data);
	}

	$effect(() => {
		getProduct();
	});
</script>

<main class="flex flex-col items-center justify-center px-4 pt-16">
	<div class="grid grid-cols-7">
		{#each data.data as product, index (index)}
			<a href={`/detail/${product.id}`} data-sveltekit-preload-data="hover">
				<div class="group w-52">
					<Card.Root
						class="flex w-52 rounded-none border  border-gray-300 bg-white group-hover:border-orange-700"
					>
						<Card.Content class="p-1">
							<img src={product.product_image} alt={product.name} class="h-52 w-full" />
							<div class="px-2">
								<h2 class="text-lg font-semibold">{product.product_name}</h2>
								<p class="text-sm text-gray-500">Rp. {product.price.toLocaleString()}</p>
							</div>
						</Card.Content>
					</Card.Root>
					<div class="h-6 w-full bg-orange-700 p-1 opacity-0 group-hover:opacity-100"></div>
				</div>
			</a>
		{/each}
	</div>
</main>
