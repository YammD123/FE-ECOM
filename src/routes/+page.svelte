<script lang="ts">
	import { PUBLIC_API_URL_BE } from '$env/static/public';
	import { toast } from 'svelte-sonner';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import Banner from '../components/Banner.svelte';

	let data: any = $state([]);
	async function getProduct() {
		const res = await fetch(`${PUBLIC_API_URL_BE}/product/all`);
		data = await res.json();
		console.log(data);
	}

	$effect(() => {
		getProduct();
	});

	
	let categoryProducts: any = $state([]);
	async function categoryProduct() {
		const res = await fetch(`${PUBLIC_API_URL_BE}/category`);
		categoryProducts = await res.json();
		console.log(categoryProducts);
	}
	let categori = $state('Baju-Anak');

	let category: any = $state([]);
	async function getCategory() {
		const res = await fetch(`${PUBLIC_API_URL_BE}/category/${categori}`);
		category = await res.json();
		console.log(category);
	}

	$effect(() => {
		getCategory();
		categoryProduct();
	});

	function handleCategoryChange(categoriesName: string) {
		categori = categoriesName
	}
</script>

<main class="px-4 py-20 sm:px-6 lg:px-8 max-w-7xl mx-auto">
	<Banner />
	<h2
		class="text-3xl font-extrabold text-gray-900 mb-10 tracking-tight sm:text-4xl"
	>
		Semua Produk
	</h2>
	<div
		class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6"
	>
		{#each data.data as product, index (index)}
			<a href={`/detail/${product.id}`} data-sveltekit-preload-data="hover">
				<div class="group relative">
					<Card.Root
						class="w-full rounded-xl bg-white border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
					>
						<Card.Content class="p-4">
							<div class="relative overflow-hidden rounded-lg">
								<img
									src={product.product_image}
									alt={product.name}
									class="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
								/>
								<div
									class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
								></div>
							</div>
							<div class="mt-4">
								<h3
									class="text-base font-semibold text-gray-900 truncate leading-tight"
								>
									{product.product_name}
								</h3>
								<p
									class="text-sm font-medium text-gray-500 mt-1"
								>
									Rp. {product.price.toLocaleString()}
								</p>
							</div>
						</Card.Content>
					</Card.Root>
				</div>
			</a>
		{/each}
	</div>
</main>

<section class="px-4 py-16 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
	<div class="max-w-7xl mx-auto">
		<div
			class="flex flex-wrap gap-2 sm:gap-3 mb-10 justify-center sm:justify-start"
		>
			{#each categoryProducts.data as categories, index (index)}
				<Button
					variant="ghost"
					onclick={() => handleCategoryChange(categories.category_name)}
					class="{categori === categories.category_name
						? 'bg-blue-800 text-white hover:bg-blue-900'
						: 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-800'} px-5 py-2.5 rounded-full font-medium text-sm shadow-sm hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
				>
					{categories.category_name}
				</Button>
			{/each}
		</div>

		<h2
			class="text-3xl font-extrabold text-gray-900 mb-10 tracking-tight sm:text-4xl"
		>
			Produk {categori}
		</h2>
		<div
			class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6"
		>
			{#each category.data as product, index (index)}
				{#each product.product as products, index (index)}
					<a href={`/detail/${products.id}`} data-sveltekit-preload-data="hover">
						<div class="group relative">
							<Card.Root
								class="w-full rounded-xl bg-white border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
							>
								<Card.Content class="p-4">
									<div class="relative overflow-hidden rounded-lg">
										<img
											src={products.product_image}
											alt={products.name}
											class="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-105"
										/>
										<div
											class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
										></div>
									</div>
									<div class="mt-4">
										<h3
											class="text-base font-semibold text-gray-900 truncate leading-tight"
										>
											{products.product_name}
										</h3>
										<p
											class="text-sm font-medium text-gray-500 mt-1"
										>
											Rp. {products.price.toLocaleString()}
										</p>
									</div>
								</Card.Content>
							</Card.Root>
						</div>
					</a>
				{/each}
			{/each}
		</div>
	</div>
</section>

<style>
	:global(.shadow-md) {
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
			0 2px 4px -2px rgba(0, 0, 0, 0.1);
	}
	:global(.shadow-xl) {
		box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
			0 4px 6px -4px rgba(0, 0, 0, 0.1);
	}
	:global(body) {
		scroll-behavior: smooth;
	}
</style>