<script lang="ts">
	import { PUBLIC_API_URL_BE } from '$env/static/public';
	import { onMount, tick } from 'svelte';
	import { on } from 'svelte/events';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { ImagePlus, MessageCircle } from '@lucide/svelte';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { toast } from 'svelte-sonner';
	import { Label } from '$lib/components/ui/label/index.js';
	import AddProduct from './components/add-product.svelte';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';

	let token: string | null = $state(null);
	let role: string | null = $state(null);
	onMount(() => {
		token = localStorage.getItem('token');
		role = localStorage.getItem('role');
	});
	let data: any = $state({});
	async function profile() {
		const res = await fetch(`${PUBLIC_API_URL_BE}/user/profile`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			}
		});
		data = await res.json();
		console.log(data);
	}
	onMount(() => {
		profile();
	});

	// image select

	let selectImage: string | null = $state(null);
	let selectFile: File | null = $state(null);

	function handleImage(event: any) {
		const file = event.target.files[0];
		if (file) {
			selectImage = URL.createObjectURL(file);
			selectFile = file;
		}
	}

	//submit image
	let loadingImage = $state(false);
	async function submitImage(event: any) {
		event.preventDefault();
		try {
			loadingImage = true;
			if (!selectFile) {
				toast.error('Tolong pilih file terlebih dahulu');
				return;
			}
			const formData = new FormData();
			formData.append('image', selectFile);

			const res = await fetch(`${PUBLIC_API_URL_BE}/user/update/profile`, {
				headers: {
					Authorization: `Bearer ${token}`
				},
				method: 'PATCH',
				body: formData,
			});
            if(res.status === 500){
                toast.error('Gagal update profile silakan coba lagi')
                return
            }
			toast.success('Berhasil update profile');
			
		} catch (error) {
			toast.error('error');
		} finally {
			loadingImage = false;
		}
	}

	let riwayatPembelian : any= $state([]);
	async function getRiwayatPembelian() {
		const res = await fetch(`${PUBLIC_API_URL_BE}/order/succes`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
		riwayatPembelian = await res.json();
		console.log(riwayatPembelian);
	}
	onMount(() => {
		getRiwayatPembelian();
	})

	let isOpen= $state(false);


	let comment = $state('');
	async function addComment(productId: string, orderId: string): Promise<void> {
        try {      
            const res = await fetch(`${PUBLIC_API_URL_BE}/comment/${orderId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                method: 'POST',
                body: JSON.stringify({
                    productId: productId,
                    comment
                })
            });
            toast.success('Ulasan berhasil ditambahkan');
			isOpen = false
			await tick()
        } catch (error) {
            toast.error('Gagal menambah ulasan');
        }
	}
</script>

<main class="min-h-screen flex flex-col items-center">
	<div class="flex justify-center w-full max-w-[1000px] h-[600px] mx-4 my-4">
		<div class="flex flex-col md:flex-row w-[1000px] justify-between border border-gray-800/20 bg-white p-4">
			<div class="font-sans text-black flex-1 p-2 md:border-r md:pr-6">
				{#if role === "ADMIN"}
					<div class="text-lg italic font-medium border-b mb-4">{role}</div>
				{/if}
				<h1 class="text-lg font-semibold">Profil Saya</h1>
				<p class="text-sm text-black/40 mb-6">
					Kelola informasi profil Anda untuk mengontrol, melindungi dan mengamankan akun
				</p>
				<form class="flex flex-col gap-4">
					<div class="flex flex-col md:flex-row items-start md:items-center gap-4">
						<Label class="w-full md:w-32 text-left md:text-right">User Name :</Label>
						<input
							class="h-9 w-full md:w-1/2 border border-black/20 px-2 focus:outline-none focus:ring-0"
							placeholder={data.data?.user_name}
							type="text"
						/>
					</div>
					<div class="flex flex-col md:flex-row items-start md:items-center gap-4">
						<Label class="w-full md:w-32 text-left md:text-right">Email :</Label>
						<input
							class="h-9 w-full md:w-1/2 border border-black/20 px-2 focus:outline-none focus:ring-0"
							placeholder={data.data?.email}
							type="email"
						/>
					</div>
					<div class="flex flex-col md:flex-row items-start md:items-center gap-4">
						<Label class="w-full md:w-32 text-left md:text-right">Password :</Label>
						<input
							class="h-9 w-full md:w-1/2 border border-black/20 px-2 focus:outline-none focus:ring-0"
							placeholder="********"
							type="password"
						/>
					</div>
					<Button type="submit" class="mt-4 w-32 rounded-sm bg-orange-600">
						Simpan Perubahan
					</Button>
				</form>
			</div>

			<div class="flex flex-col items-center justify-center p-4 md:p-16">
				<form onsubmit={submitImage} class="flex flex-col items-center gap-4">
					<Avatar.Root class="relative h-40 w-40">
						{#if selectImage}
							<Avatar.Image
								src={selectImage}
								alt="Profile Image"
								class="h-full w-full rounded-full object-cover"
							/>
						{:else}
							<Avatar.Image
								src={data?.data?.profile_image}
								alt="Profile Image"
								class="h-full w-full rounded-full object-cover"
							/>
						{/if}
						<Avatar.Fallback
							class="flex h-full w-full items-center justify-center bg-gray-200 font-semibold text-gray-700"
						>
							CN
						</Avatar.Fallback>
						<div
							class="absolute bottom-2 right-4 cursor-pointer rounded-full bg-white p-2 shadow-md"
						>
							<ImagePlus class="h-6 w-6 text-gray-600" />
							<input
								type="file"
								class="absolute inset-0 cursor-pointer opacity-0"
								onchange={handleImage}
							/>
						</div>
					</Avatar.Root>
					<Button disabled={loadingImage} type="submit" class="bg-orange-600 p-2">
						{loadingImage ? 'Loading...' : 'Save'}
					</Button>
				</form>
			</div>
		</div>
	</div>
	<div>
		<h1>Riwayat Pembelian</h1>
		<div class="grid grid-cols-6 gap-4 py-5">
			{#each riwayatPembelian.data as item, index (index)}
			<div class="w-52 h-72 bg-white">
				<img class="w-full h-56" src={item.product.product_image} alt="">
				<div class="flex justify-between mt-3 ml-4">
					<p class="text-xl text-gray-600 italic">{item.product.price}</p>
					<Dialog.Root>
						<Dialog.Trigger>
							<Button variant="ghost">
								<MessageCircle class="w-4 h-4 mr-2" />
							</Button>
						</Dialog.Trigger>
						<Dialog.Content>
							<Dialog.Title class="text-lg font-semibold text-gray-900">Ulasan</Dialog.Title>
							<Dialog.Description class="text-gray-600">
								Beri ulasan untuk produk ini. Komentar Anda sangat berarti!
							</Dialog.Description>
							<div class="grid gap-4 py-4">
								<div class="grid gap-2">
									<Textarea
										id="comment"
										placeholder="Tulis ulasan Anda di sini..."
										bind:value={comment}
										class="min-h-[100px] resize-y border-orange-200 focus:border-orange-400 focus:ring-orange-400"
									/>
								</div>
							</div>
							<Button
								class="bg-gradient-to-r from-orange-600 to-orange-400 text-white hover:from-orange-700 hover:to-orange-500"
								onclick={() => addComment(item.product.id,item.id)}
								disabled={!comment.trim()}
							>
								Kirim Ulasan
							</Button>
						</Dialog.Content>
					</Dialog.Root>
				</div>
			</div>
			{/each}
		</div>
	</div>
	<div class="flex flex-col justify-center w-full">
		{#if token}
		<AddProduct token={token} />
	{:else}
		<p class="text-center text-gray-500">Loading user token...</p>
	{/if}
	</div>
</main>

<style>
	@media (max-width: 768px) {
		/* Penyesuaian untuk layar kecil */
		.h-\[600px\] {
			height: auto;
		}
		.w-\[1000px\] {
			width: 100%;
		}
	}
</style>
