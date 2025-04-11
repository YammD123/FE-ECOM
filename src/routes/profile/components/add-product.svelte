<script lang="ts">
	import { ImagePlus, Trash } from '@lucide/svelte';
	import * as Select from '$lib/components/ui/select/index.js';
	import { PUBLIC_API_URL_BE } from '$env/static/public';
	import { onMount } from 'svelte';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import YourProduct from './your-product.svelte';
	import { toast } from 'svelte-sonner';

	let { token } = $props();

	let selectImage: string | null = $state(null);
	let selectFile: File | null = $state(null);
	function handleFileChange(event: any) {
		const file = event.target.files[0];
		if (file) {
			selectImage = URL.createObjectURL(file);
			selectFile = file;
		}
	}

	function handleImageCancell() {
		selectImage = null;
	}

	let category: any = $state([]);
	async function getCategory() {
		const res = await fetch(`${PUBLIC_API_URL_BE}/category`);
		category = await res.json();
		console.log(category);
	}
	onMount(() => {
		getCategory();
	});

	let categoryId = $state('');
	const trigerContent = $derived(
		category?.data?.find((item: any) => item.id === categoryId)?.category_name ?? 'select category'
	);

	let store: any = $state([]);
	async function getStore() {
		try {
			
			const res = await fetch(`${PUBLIC_API_URL_BE}/store/user`, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
			store = await res.json();
			console.log(store);
		} catch (error) {
			console.error(error);
			store = { data: [] };
		}
	}
	onMount(() => {
		getStore();
	});

	let storeId = $state('');
	const trigerStore = $derived(
		store?.data?.find((item: any) => item.id === storeId)?.store_name ?? 'select store'
	);

	let yourProduct: any = $state([]);
	async function getYourProduct() {
		const res = await fetch(`${PUBLIC_API_URL_BE}/product`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
		yourProduct = await res.json();
		console.log(yourProduct);
	}

	onMount(() => {
		getYourProduct();
	});

	let isOpen = $state(false);
	let productName = $state('');
	let price: number = $state(1000);
	let description = $state('');
	let isLoading = $state(false);
	async function submitAddProduct() {
		try {
			isLoading = true;
			if (!selectFile) {
				toast.error('gambar harus ada');
				return;
			}
			const formData = new FormData();
			formData.append('image', selectFile);
			formData.append('categoryId', categoryId);
			formData.append('product_name', productName);
			formData.append('price', price.toString());
			formData.append('description', description);

			const res = await fetch(`${PUBLIC_API_URL_BE}/product/${storeId}`, {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${token}`
				},
				body: formData
			});
			if (!res) {
				toast.error('gagal menambah product');
				return;
			}
			if(res.status === 500){
                toast.error('Gagal menambah product silakan coba lagi')
                return
            }
			await getYourProduct();
			toast.success('berhasil menambah product');
			isOpen = false;
		} catch (error) {
			toast.error('Gagal menambah product');
		} finally {
			isLoading = false;
		}
	}

	
	//add store
	let store_name = $state('');
	let isLoadingStore = $state(false);
	async function addStore() {
		try {
			isLoadingStore = true;
			const res = await fetch(`${PUBLIC_API_URL_BE}/store`, {
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					store_name: store_name
				}),
				method: 'POST'
			});
			if (!res) {
				toast.error('gagal menambah store');
				return;
			}

			await getStore();
			toast.success('berhasil menambah store');
		} catch (error) {
			toast.error('Gagal menambah store');
		} finally {
			isLoadingStore = false;
		}
	}
</script>

<main class="container mx-auto px-4 py-8">
	<Dialog.Root bind:open={isOpen}>
		<Dialog.Trigger>
			<div class="flex flex-col items-center gap-2">
				<Button class="bg-green-500" size="lg">Add Product</Button>
			</div>
		</Dialog.Trigger>
		{#if isLoadingStore}
			<Dialog.Content class="rounded-lg bg-white p-6 shadow-lg sm:max-w-[425px]">
				<p class="text-center text-gray-500">Loading...</p>
			</Dialog.Content>
		{:else if store.data?.length > 0}
			<Dialog.Content class="rounded-lg bg-white p-6 shadow-lg sm:max-w-[425px]">
				<div class="mt-4 w-full">
					<div
						class="relative rounded-lg border-2 border-dashed border-gray-300 p-6 transition-colors hover:border-gray-400"
					>
						{#if selectImage}
							<img
								src={selectImage}
								alt="Product preview"
								class="h-48 w-full rounded-md object-cover"
							/>
							<Button
								onclick={() => {
									handleImageCancell();
								}}
								class="my-3"
								variant="destructive"
							>
								<Trash class="absolute h-4 w-4" />
							</Button>
						{:else}
							<div class="flex flex-col items-center gap-3">
								<ImagePlus class="h-12 w-12 text-gray-400" />
								<p class="text-sm font-medium">
									<label
										for="upload"
										class="cursor-pointer text-blue-600 transition-colors hover:text-blue-800"
									>
										Select file
									</label>
								</p>
							</div>
						{/if}
						<input id="upload" type="file" multiple class="hidden" onchange={handleFileChange} />
					</div>
				</div>

				<div class="mt-6 space-y-4">
					<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
						<Input class="w-full" bind:value={productName} type="text" placeholder="Product name" />
						<Input class="w-full" bind:value={price} type="number" placeholder="Product price" />
					</div>
					<div>
						<Textarea bind:value={description} placeholder="Add description Product" />
					</div>
					<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
						<Select.Root type="single" bind:value={categoryId}>
							<Select.Trigger class="w-full">{trigerContent}</Select.Trigger>
							<Select.Content>
								{#each category.data as item, index (index)}
									<Select.Item value={item.id}>{item.category_name}</Select.Item>
								{/each}
							</Select.Content>
						</Select.Root>
						<Select.Root type="single" bind:value={storeId}>
							<Select.Trigger class="w-full">{trigerStore}</Select.Trigger>
							<Select.Content>
								{#if Array.isArray(store.data)}

								{#each store.data as item, index (index)}
									<Select.Item value={item.id}>{item.store_name}</Select.Item>
								{/each}
								{/if}
							</Select.Content>
						</Select.Root>
					</div>
				</div>
				<div class="pt-3">
					<Button
						onclick={() => {
							submitAddProduct();
						}}
						disabled={isLoading}>Simpan</Button
					>
				</div>
			</Dialog.Content>
		{:else}
			<Dialog.Content class="rounded-lg bg-white p-6 shadow-lg sm:max-w-[425px]">
				<Dialog.Title class="text-lg font-semibold text-gray-900"
					>Anda belum memiliki toko</Dialog.Title
				>
				<Dialog.Description class="text-sm text-gray-500"
					>Dengan menambahkan toko anda dapat menambahkan produk itu berarti anda menjadi seller di
					sini</Dialog.Description
				>
				<Input bind:value={store_name} placeholder="Nama Toko" />
				<Button
					onclick={() => {
						addStore()
					}}
					disabled={isLoading}
					type="submit"
					class="bg-blue-600 text-white"
					variant="default">Simpan</Button
				>
			</Dialog.Content>
		{/if}
	</Dialog.Root>
	{#if yourProduct.data}
		<div class="my-4">
			<YourProduct data={yourProduct} />
		</div>
	{:else}
		<p class="text-center text-gray-500">Loading user token...</p>
	{/if}
</main>

<style>
	:global(.dialog-content) {
		max-height: 90vh;
		overflow-y: auto;
	}
</style>
