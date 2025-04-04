<script lang="ts">
	import { PUBLIC_API_URL_BE } from '$env/static/public';
	import * as Table from '$lib/components/ui/table/index.js';
	import { onMount } from 'svelte';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Edit, Ellipsis, Plus, Search, Trash } from '@lucide/svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { toast } from 'svelte-sonner';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { json } from '@sveltejs/kit';

	let data: any = $state([]);
	let filteredData: any = $state([]);
	let page: number = $state(1);
	let totalPagePagination: number = $state(1);
	async function getCategoryData() {
		const res = await fetch(`${PUBLIC_API_URL_BE}/category?page=${page}`);
		data = await res.json();
		filteredData = data.data
		totalPagePagination = data.totalPage;
	}

	async function deleteCategory(id: string) {
		try {
			const res = await fetch(`${PUBLIC_API_URL_BE}/category/${id}`, {
				method: 'DELETE'
			});
			if (!res.ok) {
				toast.error('Gagal menghapus kategori silakan coba lagi');
				return;
			}
			toast.success('Berhasil menghapus kategori');
			await getCategoryData();
		} catch (error) {
			toast.error('error');
		}
	}

	$effect(() => {
		getCategoryData();
	});
	let searchCategory = $state('');
	async function handleSearch() {
		filteredData = data?.data?.filter((category: any) =>
			category.category_name.toLowerCase().includes(searchCategory.toLowerCase())
		) || []
	}
	$effect(() => {
        if(data?.data){
            handleSearch();
        }
	});


    // tambahkan categoryyy
    let category_name = $state('');
    let isLoading = $state(false);
    let isOpen = $state(false);
    async function createCategory(event: any) {
        event.preventDefault();
        try {
            isLoading = true;
           const res = await fetch(`${PUBLIC_API_URL_BE}/category`,{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({
                    category_name
                })
            })
            if(!res.ok){
                throw new Error('Gagal menambah kategori');
            }
            await getCategoryData()
			category_name = '';
            toast.success('Berhasil menambah kategori');
            isOpen = false;
        } catch (error) {
            toast.error('Gagal menambah kategori silakan coba lagi');
        }finally{
			isLoading = false;
		}
    }
</script>

<main>
	<div class="flex justify-end  p-6">
		<Dialog.Root bind:open={isOpen}>
			<Dialog.Trigger>
                <span>
                    <Button  class="bg-blue-600 text-white" variant="default">
                        <Plus />
                        Tambah Kategori
                    </Button >
                </span>
			</Dialog.Trigger>
			<Dialog.Content>
				<Dialog.Title class="text-lg font-semibold">Tambah Kategori</Dialog.Title>
				<Dialog.Description class="text-sm text-gray-500">
					Tambah kategori baru untuk produk anda
				</Dialog.Description>
				<div class="mt-4">
					<form onsubmit={createCategory} class="flex flex-col gap-4">
						<Input bind:value={category_name} placeholder="Nama Kategori" />
						<Button disabled={isLoading} type='submit' class="bg-blue-600 text-white" variant="default">Simpan</Button>
					</form>
				</div>
			</Dialog.Content>
		</Dialog.Root>
	</div>
	<div class="flex justify-end p-6">
		<Input bind:value={searchCategory} class="w-1/3" placeholder="Search" />
	</div>
	<Table.Root class="w-full table-fixed border border-gray-300"> 
		<Table.Caption>A list of your recent invoices.</Table.Caption>
		<Table.Header>
			<Table.Row>
				<Table.Head class="w-[100px]">Tanggal Buat</Table.Head>
				<Table.Head class="w-1/5">Nama Kategori</Table.Head>
				<Table.Head class="w-1/5 text-right"></Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body class="border-t border-gray-300">
			{#if filteredData.length == 0}
				<Table.Row>
					<Table.Cell class=" p-7">
						<p>....... No Data Found</p>
					</Table.Cell>
				</Table.Row>
			{:else}
				{#each filteredData as category, index (index)}
					<Table.Row class="border-b border-gray-300">
						<Table.Cell class="text-base">{category.createdAt}</Table.Cell>
						<Table.Cell class="text-base">{category.category_name}</Table.Cell>
						<Table.Cell class="text-right">
							<DropdownMenu.Root>
								<DropdownMenu.Trigger>
									<Button variant="ghost"><Ellipsis size={20} /></Button>
								</DropdownMenu.Trigger>
								<DropdownMenu.Content class="mx-6">
									<div class="flex flex-col gap-2">
										<Button
											onclick={() => deleteCategory(category.id)}
											class="w-full"
											variant="destructive"
										>
											<Trash size={20} />
											Hapus
										</Button>
										<Button class="w-full bg-green-600">
											<Edit size={20} />
											Edit
										</Button>
									</div>
								</DropdownMenu.Content>
							</DropdownMenu.Root>
						</Table.Cell>
					</Table.Row>
				{/each}
			{/if}
		</Table.Body>
	</Table.Root>
	<div class="flex justify-end gap-3 p-6">
		<Button
			disabled={page == totalPagePagination}
			onclick={() => page++}
			class="border border-gray-300"
			variant="ghost">Next</Button
		>
		<Button
			disabled={page == 1}
			onclick={() => page--}
			class="border border-gray-300"
			variant="ghost">Previous</Button
		>
	</div>
</main>
