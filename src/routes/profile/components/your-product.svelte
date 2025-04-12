<script lang="ts">
	import { goto } from '$app/navigation';
import { Button } from '$lib/components/ui/button/index.js';
	import { Edit } from "@lucide/svelte";

    let {data} = $props()
</script>

<main class="my-3">
    <h1 class="border-b-4 text-2xl font-semibold text-gray-500">Product Anda</h1>
    <div class="my-3">
        {#if data.data.length == 0}
        <p class="text-center text-gray-500 py-8 text-lg">
            Belum ada produk yang ditambahkan.
        </p>
        {/if}
        <div class="grid grid-cols-6 gap-4">
            {#each data.data as items }
            <div class="w-52 h-72 bg-white">
                <Button onclick={()=> goto(`/editing/${items.id}`)} variant="ghost" class=" top-2 bg-white"><Edit class="w-4 h-4" />Edit</Button>
                <img class="w-full h-full rounded" src={items.product_image} alt="">
            </div>
            {/each}
        </div>
    </div>
</main>