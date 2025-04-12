<script>

	import Button from "$lib/components/ui/button/button.svelte";
	import { ArrowRight } from "@lucide/svelte";

</script>
<div
		class="relative bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl overflow-hidden mb-12 shadow-xl"
	>
		<!-- Latar Gambar (Opsional) -->
		<div
			class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-30"
		></div>
		<!-- Konten Banner -->
		<div
			class="relative flex flex-col md:flex-row items-center justify-between px-6 py-12 sm:px-10 md:py-16"
		>
			<!-- Teks -->
			<div class="max-w-lg text-center md:text-left">
				<h1
					class="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4"
				>
					Temukan Produk Impian Anda
				</h1>
				<p
					class="text-base sm:text-lg text-gray-200 mb-6 leading-relaxed"
				>
					Jelajahi koleksi eksklusif kami dengan kualitas terbaik dan penawaran
					menarik setiap hari.
				</p>
				<Button
					href="/"
					class="group bg-white text-blue-900 hover:bg-blue-50 px-6 py-3 rounded-full font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-200"
				>
					Belanja Sekarang
					<ArrowRight
						class="w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-1"
					/>
				</Button>
			</div>
			<!-- Gambar (Opsional) -->
			<div class="hidden md:block mt-8 md:mt-0">
				<img
					src="https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//catalog-image/94/MTA-134670170/brd-35040_supervice-sepatu-sneaker-pria-spatu-running-casual-import-mc107_full01-ac996c95.jpg"
					alt="Produk Unggulan"
					class="w-64 h-64 object-cover rounded-lg shadow-lg"
				/>
			</div>
		</div>
	</div>