<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { fade } from 'svelte/transition';
	import { toast } from 'svelte-sonner';
	import { PUBLIC_API_URL_BE } from '$env/static/public';
	import { goto } from '$app/navigation';


	let newUser = $state({userName:"" , email:"" , password:""}) 
	let isLoading = $state(false);
	async function register(event: any){
		event.preventDefault();
		
		try {
			isLoading = true;
			if (!newUser.userName || !newUser.email || !newUser.password) {
				toast.error("Tolong isi semua field")
				return
			}
			if (newUser.password.length < 6) {
				toast.error("Password minimal 6 karakter")
				return
			}

			//user register fetching
			const res = await fetch(`${PUBLIC_API_URL_BE}/user/register`, {
				method: 'POST',
				headers:{
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					user_name: newUser.userName,
					email: newUser.email,
					password: newUser.password
				})
			})
			if (res.status === 409) {
				toast.error('Email sudah terdaftar')
				return
			}
			toast.success("Register Berhasil")
			goto('/user/login')
			console.log(newUser);
		} catch (error) {
			toast.error("Register Failed")
		}finally{
			isLoading = false
		}
	}

</script>


<main class="text-black bg-white" >
	<div class="flex h-screen w-full" transition:fade={{ duration: 500 }}>

		<div class="flex w-1/2 flex-col items-center justify-center">
			<div>
				<div class="flex flex-col gap-4 text-center">
					<h1 class="text-3xl font-semibold">Register Account</h1>
					<h3>Enter your User Name , Email and Password to register</h3>
				</div>
				<form onsubmit={register} class="mt-8 flex w-96 flex-col gap-4">
					<Label for="email">User Name</Label>
					<Input
						class="border focus:border-2  bg-white text-black "
						type="text"
						placeholder="Enter your User Name"
						bind:value={newUser.userName}
					/>
					<Label for="email">Email</Label>
					<Input
						class="border bg-white text-black focus:border-2"
						type="email"
						placeholder="Enter your Email"
						bind:value={newUser.email}
					/>
					<Label for="password">Password</Label>
					<Input
						class="border bg-white text-black focus:border-2"
						type="password"
						placeholder="Enter your Password"
						bind:value={newUser.password}
					/>
                    <Button disabled={isLoading} type="submit" class="mt-4">Register</Button>
                    <p>Sudah memiliki akun? <a class="underline" href="/user/login">Tab sini</a></p>
				</form>
			</div>
		</div>
        <img
        class="h-full w-1/2 object-cover"
        src="/logreg/lore.jpg"
        alt=""
    />
	</div>
</main>