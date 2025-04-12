<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { Facebook, Twitter, Instagram, Mail, Phone } from '@lucide/svelte';
</script>

<footer
	class="bg-orange-900 text-gray-200 px-4 py-12 sm:px-6 lg:px-8 mt-16"
>
	<div class="max-w-7xl mx-auto">
		<div
			class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12"
		>
			<div>
				<h3
					class="text-2xl font-bold text-white tracking-tight mb-4"
				>
					Toko Kami
				</h3>
				<p class="text-sm text-gray-400 leading-relaxed mb-6">
					Belanja mudah dan nyaman dengan koleksi produk terbaik untuk kebutuhan
					Anda. Kualitas terjamin, pengiriman cepat.
				</p>
				<div class="flex gap-4">
					<a
						href="https://facebook.com"
						aria-label="Facebook"
						class="text-gray-400 hover:text-white transition-colors duration-200"
					>
						<Facebook class="w-5 h-5" />
					</a>
					<a
						href="https://twitter.com"
						aria-label="Twitter"
						class="text-gray-400 hover:text-white transition-colors duration-200"
					>
						<Twitter class="w-5 h-5" />
					</a>
					<a
						href="https://instagram.com"
						aria-label="Instagram"
						class="text-gray-400 hover:text-white transition-colors duration-200"
					>
						<Instagram class="w-5 h-5" />
					</a>
				</div>
			</div>

		

			<div>
				<h4 class="text-lg font-semibold text-white mb-4">
					Hubungi Kami
				</h4>
				<ul class="space-y-3 text-sm">
					<li class="flex items-center gap-2">
						<Mail class="w-4 h-4 text-gray-400" />
						<span class="text-gray-400">support@tokokami.com</span>
					</li>
					<li class="flex items-center gap-2">
						<Phone class="w-4 h-4 text-gray-400" />
						<span class="text-gray-400">+62 123 456 7890</span>
					</li>
				</ul>
			</div>
		</div>

		<!-- Bawah: Copyright -->
		<div
			class="mt-12 pt-8 border-t border-gray-700 text-center text-sm text-gray-400"
		>
			<p>&copy; 2025 Toko Kami. All rights reserved.</p>
		</div>
	</div>
</footer>