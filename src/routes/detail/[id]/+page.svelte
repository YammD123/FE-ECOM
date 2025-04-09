<script lang="ts">
	import { page } from "$app/state";
	import { PUBLIC_API_URL_BE } from "$env/static/public";
	import { Button } from "$lib/components/ui/button/index.js";
	import { ShoppingCart, Store } from "@lucide/svelte";
	import { onMount } from "svelte";
	import { toast } from "svelte-sonner";
	let id = page.params.id;
	let {data} = $props()
	let token: string | null = null;
	onMount(() => {
		token = localStorage.getItem('token');
	});


	async function orderProduct(productId: string){
		try {	
			const res = await fetch(`${PUBLIC_API_URL_BE}/order`,{
				method:'POST',
				headers:{
					'Content-Type':'application/json',
					Authorization: `Bearer ${token}`
				},
				body:JSON.stringify({
					status:'PENDING',
					productId:productId
				})
			})
			if(res.ok){
				toast.success('Berhasil menambah produk')
				location.reload()
			}else{
				toast.error('Gagal gagal menambah produk')
			}
		} catch (error) {
			toast.error('Gagal menambah produk')
		}
	}
</script>

<main class="flex flex-col items-center justify-center px-4">
	<div class="flex flex-col md:flex-row gap-7 mt-10 w-full max-w-7xl">
		<!-- Product Section -->
		<div class="flex flex-col md:flex-row bg-white gap-4 w-full">
			<img class="w-full md:w-96 h-72 md:h-96 object-cover" src={data.product.data.product_image} alt="">
			<div class="p-6 md:p-10 flex-1">
				<div class="bg-orange-600 h-9 w-40 md:w-56 rounded-lg"></div>
				<h1 class="text-xl md:text-2xl py-1 font-serif">{data.product.data.product_name}</h1>
				<p class="text-sm md:text-base">{data.product.data.description}</p>
				<p class="text-xl md:text-2xl text-yellow-500 italic font-serif mt-4">Rp. {data.product.data.price.toLocaleString()}</p>
				<div class="flex flex-col sm:flex-row gap-4 mt-8">
					<Button class="bg-gradient-to-r from-orange-600 to-orange-400 w-full sm:w-auto" variant="default" size="lg" onclick={() => alert('Buy Now')}>Buy Now</Button>
					<Button class="w-full sm:w-auto" variant="outline" size="lg" onclick={() => {orderProduct(data.product.data.id)}}>
                        <ShoppingCart class="w-4 h-4 mr-2" />
                        Add to Cart
                    </Button>
				</div>
				<div class="flex gap-4 mt-4">
					<Button variant="ghost">
						<Store class="w-4 h-4 mr-2" />
						{data.product.data.store.store_name}
					</Button>
				</div>
			</div>
		</div>

		<div class="bg-gray-700 w-full md:w-56 h-56 md:h-96 flex flex-col justify-center items-center rounded-md">
			<h1 class="text-xl md:text-2xl text-white font-serif">Payment</h1>
		</div>
	</div>
    <div>
        <h1 class="text-2xl italic text-black/70 font-semibold mt-10">Related Product</h1>
        <div class="grid grid-cols-6 py-5">
            {#each data.category.data as product, index (index)}
            {#each product.product as item, index (index)}
			<a data-sveltekit-preload-data="hover" href={`/detail/${item.id}`}>	
                <div class="w-56 h-72 bg-white">
                    <img class="w-full h-56" src={item.product_image} alt="">
					<div class="p-2">
						<h1 class="text-lg font-semibold">{item.product_name}</h1>
						<p class="text-sm text-gray-600 italic">Rp {item.price.toLocaleString()}</p>
					</div>
                </div>
			</a>
            {/each}
            {/each}
        </div>
    </div>
</main>
