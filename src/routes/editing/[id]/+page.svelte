<script lang="ts">
	import { page } from "$app/state";
	import { PUBLIC_API_URL_BE } from "$env/static/public";
	import { Upload } from "@lucide/svelte";
	import { onMount } from "svelte";
    import { Input } from "$lib/components/ui/input/index.js";
	import { toast } from "svelte-sonner";
	import { goto } from "$app/navigation";

    let id = page.params.id

    let dataProduct: any = $state({});
    let token: string | null = null;
    onMount(() => {
        token = localStorage.getItem('token');
    })
    $effect(() => {
        async function getProduct() {
            const res = await fetch(`${PUBLIC_API_URL_BE}/product/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            dataProduct = await res.json()
            console.log(dataProduct)
        }
        getProduct()
    })

    let selectImage: string | null = $state(null);
    let selectFile: File | null = $state(null);
    function handleFileChange(event: any) {
        const file = event.target.files[0];
        if (file) {
            selectImage = URL.createObjectURL(file);
            selectFile = file;
        }
    }

    let price: string = $state('');
    let productName: string = $state('');
    let description: string = $state('');

    $effect(() => {
        if(dataProduct.data){
            price = dataProduct.data.price;
            productName = dataProduct.data.product_name;
            description = dataProduct.data.description
        }
    })
    async function updateProduct(){
        const formData = new FormData();
        if(selectFile){
            formData.append('image', selectFile);
        }else{
            formData.append('image', dataProduct.data?.product_image);
        }
        formData.append('product_name', productName)
        formData.append('price', price.toString());
        formData.append('description', description);

        
        const res = await fetch(`${PUBLIC_API_URL_BE}/product/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            method: 'PATCH',
            body:formData
        })
        if(!res.ok){
            toast.error('gagal update product')
        }
        toast.success('berhasil update product')
        goto('/profile')
    }
</script>

<main class="p-8 max-w-4xl mx-auto">
	<h1 class="text-3xl font-bold text-gray-800 mb-2">Edit Product</h1>
	<p class="text-gray-500 mb-6">Manage your product on the client side</p>

	<div class="space-y-8 bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
		<!-- Image Preview -->
		<div class="w-full aspect-video overflow-hidden rounded-xl border">
			{#if selectImage}
				<img src={selectImage} alt="Product preview" class="w-full h-full object-cover" />
			{:else}
				<img
					src={dataProduct.data?.product_image}
					alt="Product"
					class="w-full h-full object-cover"
				/>
			{/if}
		</div>

		<!-- File Input -->
		<div class="relative">
			<Input
				onchange={handleFileChange}
				type="file"
				class="pr-10 file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-blue-600 file:text-white file:rounded-md file:cursor-pointer cursor-pointer"
			/>
			<Upload class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
		</div>

		<!-- Product Name -->
		<div class="space-y-2">
			<label for="productName" class="text-sm font-medium text-gray-700">Product Name</label>
			<Input
				bind:value={productName}
				type="text"
				placeholder="Enter product name"
				class="w-full"
			/>
		</div>

		<!-- Product Price -->
		<div class="space-y-2">
			<label for="price" class="text-sm font-medium text-gray-700">Price</label>
			<Input
				bind:value={price}
				type="number"
				placeholder="Enter product price"
				class="w-full"
			/>
		</div>

		<!-- Product Description -->
		<div class="space-y-2">
			<label for="description" class="text-sm font-medium text-gray-700">Description</label>
			<Input
				bind:value={description}
				type="text"
				placeholder="Enter product description"
				class="w-full"
			/>
		</div>

		<!-- Submit Button -->
		<div class="pt-4">
			<button
				onclick={updateProduct}
				class="w-full bg-blue-600 text-white py-3 px-6 rounded-xl text-sm font-medium hover:bg-blue-700 transition"
			>
				Update Product
			</button>
		</div>
	</div>
</main>

