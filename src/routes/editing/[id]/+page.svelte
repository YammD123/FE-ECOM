<script lang="ts">
	import { page } from "$app/state";
	import { PUBLIC_API_URL_BE } from "$env/static/public";
	import { Upload } from "@lucide/svelte";
	import { onMount } from "svelte";
    import { Input } from "$lib/components/ui/input/index.js";
	import { toast } from "svelte-sonner";

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
        toast.success('berhasil update product')
    }
</script>

<main class="p-8 space-y-6">
	<h1 class="text-3xl font-bold text-gray-800">Edit Product</h1>
	<p class="text-gray-500">Manage your product on the client side</p>

	<div class="w-4/6 min-h-screen space-y-6 bg-white p-6 rounded-2xl shadow-md">
		<div class="w-full  overflow-hidden rounded-lg border border-gray-200">
            {#if selectImage}
                <img src={selectImage} alt="Product preview" class="w-full h-full object-cover" />
            {:else}
            <img
            src={dataProduct.data?.product_image}
            alt=""
            class="object-cover w-full h-full"
        />
            {/if}
		</div>

        <div class="relative">
            <Input onchange={handleFileChange} type="file" class="pr-10 cursor-pointer file:cursor-pointer" />
            <Upload class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
        </div>
        <Input bind:value={productName} type="text" placeholder="Product Name" />
        <Input bind:value={price} type="number" placeholder="Product Price" />
        <Input bind:value={description} type="text" placeholder="Product Description" />
        <button onclick={updateProduct} class="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out">Update Product</button>
	</div>
</main>
