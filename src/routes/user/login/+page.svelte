<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { fade } from 'svelte/transition';
	import { toast } from 'svelte-sonner';
	import { PUBLIC_API_URL_BE } from '$env/static/public';
	import { goto } from '$app/navigation';

	let loginUser = $state({email:"" , password:""})
	let isLoading = $state(false);
	async function login(event: any){
		event.preventDefault();
		try {
			isLoading = true;
			if (!loginUser.email || !loginUser.password) {
				toast.error("Tolong isi semua field")
				return
			}
			if(loginUser.password.length < 6){
				toast.error("Password minimal 6 karakter")
				return
			}

			//user login fetching
			const res = await fetch(`${PUBLIC_API_URL_BE}/user/login`,{
				method:'POST',
				headers:{
					'Content-Type' : 'application/json',
				},
				body:JSON.stringify({
					email:loginUser.email,
					password:loginUser.password
				})
			})
			if(res.status === 404){
				toast.error("Email belum terdaftar")
				return
			}
			if(res.status === 400){
				toast.error("Password salah")
				return
			}
			const data = await res.json()
			localStorage.setItem('role',data.data.role)
			localStorage.setItem('token',data.data.token)
			if(data.data.role === "USER"){
				goto('/')
			}else{
				goto('/dashboard/user')
			}
			toast.success("Login berhasil")
		} catch (error) {
			toast.error("Login gagal")
		}finally{
			isLoading = false
		}
	}
</script>

<main class="text-black bg-white">
	<div class="flex h-screen w-full" transition:fade={{ duration: 500 }}>
		<img
			class="h-full w-1/2 object-cover"
			src="/logreg/lore.jpg"
			alt=""
		/>
		<div class="flex w-1/2 flex-col items-center justify-center">
			<div>
				<div class="flex flex-col gap-4 text-center">
					<h1 class="text-3xl font-semibold">Login Account</h1>
					<h3>Enter your email and password to login</h3>
				</div>
				<form onsubmit={login} class="mt-8 flex w-96 flex-col gap-4">
					<Label for="email">Email</Label>
					<Input
						class="border bg-white text-black focus:border-2"
						type="email"
						placeholder="Enter your Email"
						bind:value={loginUser.email}
					/>
					<Label for="password">Password</Label>
					<Input
						class="border bg-white text-black focus:border-2"
						type="password"
						placeholder="Enter your Password"
						bind:value={loginUser.password}
					/>
                    <Button disabled={isLoading} type="submit" class="mt-4">Login</Button>
                    <p>Belum memiliki akun? <a class="underline" href="/user/register">Tab sini</a></p>
				</form>
			</div>
		</div>
	</div>
</main>
