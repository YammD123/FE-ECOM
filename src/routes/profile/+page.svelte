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
	import { Label } from "$lib/components/ui/label/index.js";

	let token: string | null = null;
	onMount(() => {
		token = localStorage.getItem('token');
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
    let selectFile : File | null = $state(null)

	function handleImage(event: any) {
		const file = event.target.files[0];
		if (file) {
			selectImage = URL.createObjectURL(file);
            selectFile = file
		}
	}

	//submit image
    let loadingImage = $state(false)
	async function submitImage(event: any) {
        event.preventDefault();
        try {
            loadingImage = true
            if (!selectFile){
                toast.error('Tolong pilih file terlebih dahulu')
                return
            }
            const formData = new FormData();
            formData.append('image', selectFile);
    
            const res =await fetch(`${PUBLIC_API_URL_BE}/user/update/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                method: 'PATCH',
                body: formData
            });
            res.ok
                location.reload()
                toast.success('Berhasil update profile')
                return
            
            
        } catch (error) {
            toast.error('error')
        }finally{
            loadingImage = false
        }
	}
</script>

<main class="">
    <div class="flex justify-center h-[600px]">
        <div class="flex border border-gray-800/20 bg-white m-4 justify-between  p-4 w-[1000px]">
            <div class="text-black font-sans">
                <h1 class="text-lg font-semibold">Profil Saya</h1>
                <p class="text-sm text-black/40">Kelola informasi profil Anda untuk mengontrol, melindungi dan mengamankan akun</p>
                <div class="mt-6 border-r">
                    <form class="flex flex-col gap-4">
                        <div class="flex gap-8 items-center">
                            <Label class="w-32 text-right">User Name :</Label>
                            <input class="border border-black/20 w-1/2 h-9 px-2  focus:outline-none focus:ring-0" placeholder={data.data?.user_name} type="text">
                        </div>
                        <div class="flex gap-8 items-center">
                            <Label class="w-32 text-right">Email :</Label>
                            <input class="border border-black/20 w-1/2 h-9 px-2  focus:outline-none focus:ring-0" placeholder={data.data?.email} type="email">
                        </div>
                        <div class="flex gap-8 items-center">
                            <Label class="w-32 text-right">Password :</Label>
                            <input class="border border-black/20 w-1/2 h-9 px-2  focus:outline-none focus:ring-0" placeholder="********" type="password">
                        </div>
                        <Button type="submit"  class="w-32 mt-4 bg-orange-600 rounded-sm">Simpan Perubahan</Button>
                    </form>
                </div>
                
            </div>
            <div class="flex flex-col p-16">
                <form onsubmit={submitImage} class="flex flex-col items-center gap-4">
                    <Avatar.Root class="w-40 h-40 relative">
                        {#if selectImage}
                            <Avatar.Image src={selectImage} alt="Profile Image" class="w-full h-full object-cover rounded-full" />
                        {:else}
                            <Avatar.Image src={data?.data?.image_profile} alt="Profile Image" class="w-full h-full object-cover rounded-full" />
                        {/if}
                        <Avatar.Fallback class="flex items-center justify-center w-full h-full bg-gray-200 text-gray-700 font-semibold">
                            CN
                        </Avatar.Fallback>
                    
                        <!-- Icon Upload -->
                        <div class="absolute bottom-2 right-4 bg-white p-2 rounded-full shadow-md cursor-pointer">
                            <ImagePlus class="w-6 h-6 text-gray-600" />
                            <input type="file" class="opacity-0 absolute inset-0 cursor-pointer" onchange={handleImage} />
                        </div>
                    </Avatar.Root>
                    <Button disabled={loadingImage} type="submit" class="p-2" >{loadingImage ? 'Loading...' : 'Save'}</Button>
                </form>
            </div>
        </div>
    </div>
</main>
