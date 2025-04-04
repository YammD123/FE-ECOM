<script lang="ts">
	import { PUBLIC_API_URL_BE } from '$env/static/public';
	import { onMount } from 'svelte';
	import { on } from 'svelte/events';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { ImagePlus } from '@lucide/svelte';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { toast } from 'svelte-sonner';
	import { Label } from '$lib/components/ui/label/index.js';

	let token: string | null = null;
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
</script>

<main class="">
	<div class="flex h-[600px] justify-center">
		<div class="m-4 flex w-[1000px] justify-between border border-gray-800/20 bg-white p-4">
			<div class="font-sans text-black">
				{#if role === "ADMIN"}
				<div class="text-lg italic font-medium border-b items-center">
					{role}
				</div>
			{/if}
				<h1 class="text-lg mt-2 font-semibold">Profil Saya</h1>
				<p class="text-sm text-black/40">
					Kelola informasi profil Anda untuk mengontrol, melindungi dan mengamankan akun
				</p>
				<div class="mt-6 border-r">
					<form class="flex flex-col gap-4">
						<div class="flex items-center gap-8">
							<Label class="w-32 text-right">User Name :</Label>
							<input
								class="h-9 w-1/2 border border-black/20 px-2 focus:outline-none focus:ring-0"
								placeholder={data.data?.user_name}
								type="text"
							/>
						</div>
						<div class="flex items-center gap-8">
							<Label class="w-32 text-right">Email :</Label>
							<input
								class="h-9 w-1/2 border border-black/20 px-2 focus:outline-none focus:ring-0"
								placeholder={data.data?.email}
								type="email"
							/>
						</div>
						<div class="flex items-center gap-8">
							<Label class="w-32 text-right">Password :</Label>
							<input
								class="h-9 w-1/2 border border-black/20 px-2 focus:outline-none focus:ring-0"
								placeholder="********"
								type="password"
							/>
						</div>
						<Button type="submit" class="mt-4 w-32 rounded-sm bg-orange-600"
							>Simpan Perubahan</Button
						>
					</form>

				</div>
			</div>
			<div class="flex flex-col p-16">
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

						<!-- Icon Upload -->
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
					<Button disabled={loadingImage} type="submit" class="bg-orange-600 p-2"
						>{loadingImage ? 'Loading...' : 'Save'}</Button
					>
				</form>
			</div>

		</div>
	</div>
</main>
