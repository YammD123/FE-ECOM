<script lang="ts">
	import { PUBLIC_API_URL_BE } from '$env/static/public';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	let { token, productId, orderId,opened = $bindable()} = $props();
	import { Textarea } from '$lib/components/ui/textarea/index.js';
    import { Button } from '$lib/components/ui/button/index.js';
	import { toast } from 'svelte-sonner';

	let comment = $state('');
	async function addComment() {
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
            opened = false
        } catch (error) {
            toast.error('Gagal menambah ulasan');
        }
	}
</script>

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
	onclick={addComment}
	disabled={!comment.trim()}
>
	Kirim Ulasan
</Button>
