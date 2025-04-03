<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
    import { CircleUser, LogOut } from '@lucide/svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { PUBLIC_API_URL_BE } from '$env/static/public';
	import { toast } from 'svelte-sonner';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

    let token : string | null = null
    let role : string | null = $state(null)

    onMount(()=>{
        token = localStorage.getItem('token')
        role = localStorage.getItem('role')
    })

    async function logOut(){
        try {
            const res = await fetch(`${PUBLIC_API_URL_BE}/user/logout`,{
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${token}`
                },
                method: 'DELETE'
            })
            if(!res.ok){
                toast.error('Gagal LogOut silakan coba lagi')
            }
            localStorage.removeItem('token')
            toast.success('Berhasil logOut')
            goto('/user/login')
        } catch (error) {
            toast.error('error')
        }
    }

    let data : any = $state({})
    async function profile(){
        const res = await fetch(`${PUBLIC_API_URL_BE}/user/profile`,{
            headers:{
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${token}`
            }
        })
        data = await res.json()
        console.log(data)
    }
    onMount(()=>{
        profile()
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
							<Avatar.Root class="w-12 h-12">
								<Avatar.Image  src={data?.data?.profile_image} alt="@shadcn" />
								<Avatar.Fallback>CN</Avatar.Fallback>
							</Avatar.Root>
					</DropdownMenu.Trigger>
                    <DropdownMenu.Content class="m-4 text-white  bg-gray-950 border-2 w-52 border-solid border-gray-600 ">
                        <Button onclick={()=>{goto('/profile')}} variant="ghost" class="flex hover:bg-gray-950 hover:text-white">
                            <CircleUser/>
                            Profile
                        </Button>
                        <Button onclick={logOut}  variant="ghost" class="flex hover:bg-gray-950 hover:text-white">
                            <LogOut/>
                            Keluar
                        </Button>
                    </DropdownMenu.Content>
				</DropdownMenu.Root>    
			</li>
		</ul>
	</div>
</nav>
