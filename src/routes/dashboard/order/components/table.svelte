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
	async function getOrderData() {
		const res = await fetch(`${PUBLIC_API_URL_BE}/order/all?page=${page}`);
		data = await res.json();
		filteredData = data.data
		totalPagePagination = data.totalPage;
	}

	$effect(() => {
		getOrderData();
	});
	let searchOrder = $state('');
	async function handleSearch() {
		filteredData = data?.data?.filter((order: any) =>
			order.user.user_name.toLowerCase().includes(searchOrder.toLowerCase())
		) || []
	}
	$effect(() => {
        if(data?.data){
            handleSearch();
        }
	});


</script>

<main>
	<div class="flex justify-end  p-6">
	</div>
	<div class="flex justify-end p-6">
		<Input bind:value={searchOrder} class="w-1/3" placeholder="Search" />
	</div>
	<Table.Root class="w-full table-fixed border border-gray-300"> 
		<Table.Caption>A list of your recent invoices.</Table.Caption>
		<Table.Header>
			<Table.Row>
				<Table.Head class="w-[100px]">Tanggal Order</Table.Head>
				<Table.Head class="w-1/5">Status Order</Table.Head>
				<Table.Head class="w-1/5">User</Table.Head>
				<Table.Head class="w-1/5">Price</Table.Head>
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
				{#each filteredData as order, index (index)}
					<Table.Row class="border-b border-gray-300">
						<Table.Cell class="text-base">{order.createdAt.split('T')[0]}</Table.Cell>
						<Table.Cell class="text-base">{order.status}</Table.Cell>
						<Table.Cell class="text-base">{order.user.user_name}</Table.Cell>
						<Table.Cell class="text-base">{order.product.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</Table.Cell>
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
