<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { CircleUser, LogOut, ShoppingBag } from '@lucide/svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { PUBLIC_API_URL_BE } from '$env/static/public';
	import { toast } from 'svelte-sonner';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { error } from '@sveltejs/kit';

	let token: string | null = null;
	let role: string | null = $state(null);

	onMount(() => {
		token = localStorage.getItem('token');
		role = localStorage.getItem('role');
	});

	//* Logout function
	async function logOut() {
		try {
			const res = await fetch(`${PUBLIC_API_URL_BE}/user/logout`, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				},
				method: 'DELETE'
			});
			if (!res.ok) {
				toast.error('Gagal LogOut silakan coba lagi');
			}
			localStorage.removeItem('token');
			toast.success('Berhasil logOut');
			goto('/user/login');
		} catch (error) {
			toast.error('error');
		}
	}

	//* Fetch profile
	let data: any = $state({});
	export async function Fetchprofile() {
		const res = await fetch(`${PUBLIC_API_URL_BE}/user/profile`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			}
		});
		data = await res.json();
		console.log(data);
	}

	//* Fetct order */
	let orders: any = $state([]);
	let totalOrder: number = $state(0);
	async function getOrder() {
		const res = await fetch(`${PUBLIC_API_URL_BE}/order`, {
			headers: {
				Authorization: `Bearer ${token}`,
				'Cache-Control': 'no-store'
			}
		});
		const data = await res.json();
		orders = data;
		totalOrder = data?.data.length;
		console.log(orders);
	}


	async function deleteOrder(productId: string) {
		try {
			const res = await fetch(`${PUBLIC_API_URL_BE}/order/${productId}`, {
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
			if (res.status === 200) {
				location.reload();
				toast.success('Berhasil membatalkan order');
			}
		} catch (error: any) {
			throw new error('Gagal membatalkan order');
		}
	}

	let tokenBuy: any = $state([]);
	async function buyProduct(orderId?: string) {
		try {
			const res = await fetch(`${PUBLIC_API_URL_BE}/order/buy`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				},
				body: JSON.stringify({
					productId: orderId
				})
			});
			tokenBuy = await res.json();
			if(tokenBuy.snapToken){
				window.snap.pay(tokenBuy.snapToken, {
				onSuccess: (result :any) => console.log('✅ Success', result),
				onPending: (result :any) => console.log('⏳ Pending', result),
				onError: (result :any) => console.error('❌ Error', result),
				onClose: () => console.log('❎ User closed Snap')
			});
			}
		} catch (error) {
			console.error(error);
		}
	}

$effect(()=>{
	if(token){
	getOrder();
	Fetchprofile();
	buyProduct();
	}
})

</script>

<nav class="bg-gradient-to-b from-orange-500 to-red-600/90 text-white">
	<div class="flex items-center justify-between p-2">
		<h1><a href="/" class="text-2xl font-bold">YammD</a></h1>
		<ul class="flex items-center gap-4">
			<li>
				{#if role == 'ADMIN'}
					<Button>
						<a href="/dashboard/user">Dashboard</a>
					</Button>
				{/if}
			</li>
			<li>
				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
						<Button
							variant="ghost"
							class="flex border border-gray-300 hover:bg-transparent hover:text-white"
						>
							<span class="absolute top-2 ml-8 h-5 w-5 rounded-full bg-red-500 text-xs text-white"
								>{totalOrder}</span
							>
							<ShoppingBag class="h-4 w-4" />
						</Button>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content>
						{#if totalOrder === 0}
							<div>
								<p class="text-center text-sm">Tidak ada pesanan</p>
							</div>
						{:else}
							<div class="max-h-80 space-y-2 overflow-y-auto px-2 py-1">
								{#each orders.data as order, index (index)}
									<div
										class="flex items-center gap-3 rounded-md bg-white p-2 shadow-sm transition-all duration-200 hover:bg-gray-50"
									>
										<img
											class="h-12 w-12 rounded border object-cover"
											src={order.product.product_image}
											alt={order.product.product_name}
										/>
										<div class="flex-1">
											<p class="truncate text-sm font-semibold text-gray-800">
												{order.product.product_name}
											</p>
											<p class="text-sm italic text-gray-600">
												Rp {order.product.price.toLocaleString()}
											</p>
											<p class="mt-1 text-xs text-yellow-600">Status: {order.status}</p>
										</div>
										<Button
											class="rounded bg-orange-500 px-2 py-1 text-xs text-white hover:bg-orange-600"
											onclick={() => {buyProduct(order.product.id)}}
										>
											Buy Now
										</Button>
										<Button
											class="rounded bg-red-500 px-2 py-1 text-xs text-white hover:bg-red-600"
											onclick={() => {
												deleteOrder(order.product.id);
											}}
										>
											Batal
										</Button>
									</div>
								{/each}
							</div>
						{/if}
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			</li>
			<li>
				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
						<Avatar.Root class="h-12 w-12">
							<Avatar.Image src={data?.data?.profile_image} alt="@shadcn" />
							<Avatar.Fallback>CN</Avatar.Fallback>
						</Avatar.Root>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content
						class="m-4 w-52  border-2 border-solid border-gray-600 bg-gray-950 text-white "
					>
						<Button
							onclick={() => {
								goto('/profile');
							}}
							variant="ghost"
							class="flex hover:bg-gray-950 hover:text-white"
						>
							<CircleUser />
							Profile
						</Button>
						<Button
							onclick={logOut}
							variant="ghost"
							class="flex hover:bg-gray-950 hover:text-white"
						>
							<LogOut />
							Keluar
						</Button>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			</li>
		</ul>
	</div>
</nav>
