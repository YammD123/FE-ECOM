<script lang="ts">
	import { PUBLIC_API_URL_BE } from '$env/static/public';
	import * as Table from '$lib/components/ui/table/index.js';
	import { onMount } from 'svelte';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Ellipsis, Search, Trash } from '@lucide/svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { toast } from 'svelte-sonner';
    import { Input } from '$lib/components/ui/input/index.js';

    //handle search
    let filteredData : any  = $state([])

	let data: any = $state([]);
	async function getUserData() {
		const res = await fetch(`${PUBLIC_API_URL_BE}/user`);
		data = await res.json();
        filteredData = data.data
		console.log(data);
	}

	onMount(() => {
		getUserData();
	});


    async function deleteUser(id : string){
        try {

            await fetch(`${PUBLIC_API_URL_BE}/user/${id}`,{
                method:'DELETE'
            })
            toast.success('Berhasil menghapus user')
            location.reload()
        } catch (error) {
            
        }
    }

    let searchUser = $state('')
    async function handleSearch(){
        filteredData = data.data.filter((user : any) => user.user_name.toLowerCase().includes(searchUser.toLowerCase()))
    }
   $effect(() => {
       handleSearch()
   })
    
</script>  

<div class=" p-4">
    <div class="flex justify-end p-6 border">
        <Input bind:value={searchUser} class="w-1/3" placeholder="Search" />
    </div>
	<Table.Root class="w-full table-fixed border border-gray-300">
		<Table.Caption>A list of your recent invoices.</Table.Caption>
		<Table.Header>
			<Table.Row>
				<Table.Head class="w-[100px]">Profile</Table.Head>
				<Table.Head class="w-1/5">User Name</Table.Head>
				<Table.Head class="w-1/5">Role</Table.Head>
				<Table.Head class="w-1/5 ">Email</Table.Head>
				<Table.Head class="w-1/5 text-right"></Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
            {#if filteredData.length == 0}
                <div class="flex justify-center p-7">
                    <Search size={50} />
                    <p>....... NotData Found</p>
                </div>
                {:else}

                {#each filteredData as user,index (index)}
                    <Table.Row>
                        <Table.Cell>
                            <Avatar.Root>
                                <Avatar.Image src={user.profile_image} alt="Shadcn" />
                            </Avatar.Root>
                        </Table.Cell>
                        <Table.Cell class="text-base">{user.user_name}</Table.Cell>
                        <Table.Cell class="text-base">{user.role}</Table.Cell>
                        <Table.Cell class="text-base">{user.email}</Table.Cell>
                        <Table.Cell class="text-right">
                            <DropdownMenu.Root>
                                <DropdownMenu.Trigger>
                                    <Button variant="ghost"><Ellipsis size={20} /></Button>
                                </DropdownMenu.Trigger>
                                <DropdownMenu.Content class="mx-6">
                                    <div class="flex">
                                        <Button onclick={()=>{deleteUser(user.id)}} class="w-full" variant="destructive">
                                            <Trash size={20} />
                                            Hapus
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
</div>
