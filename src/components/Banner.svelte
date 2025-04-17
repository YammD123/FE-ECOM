<script>

	import Button from "$lib/components/ui/button/button.svelte";
	import { ArrowRight } from "@lucide/svelte";

</script>
<div
		class="relative bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl overflow-hidden mb-12 shadow-xl"
	>
		<!-- Latar Gambar (Opsional) -->
		<div
			class="absolute inset-0 bg-[url('https://repack.id/wp-content/uploads/2022/05/Cara-Jual-Pakaian-Anak-ke-Luar-Negeri.jpg')] bg-cover bg-center opacity-30"
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
					src="https://img.lazcdn.com/g/p/76bff7cac04c9f490a83699d233d145a.png_720x720q80.png"
					alt="Produk Unggulan"
					class="w-64 h-64 object-cover rounded-lg shadow-lg"
				/>
			</div>
		</div>
	</div>