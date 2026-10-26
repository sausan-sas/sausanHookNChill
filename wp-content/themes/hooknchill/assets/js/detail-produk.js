(() => {
	const storageKey = 'hooknchill-prototype-products-v1';
	const fallbackProducts = [
		{ id: 'tas-granny', sku: 'HK-TAS-001', name: 'Tas granny square terracotta', category: 'Tas Rajut', price: 185000, stock: 3, color: 'terracotta', description: 'Tas rajut dengan motif granny square klasik, dibuat dari benang katun berkualitas. Dilapisi kain dalam yang nyaman.' },
		{ id: 'tas-sling', sku: 'HK-TAS-002', name: 'Tas selempang mini sage', category: 'Tas Rajut', price: 145000, stock: 5, color: 'sage', description: 'Tas selempang mini dengan warna sage yang menenangkan. Pas untuk kegiatan sehari-hari.' },
		{ id: 'tas-bucket', sku: 'HK-TAS-003', name: 'Tas bucket rajut krem', category: 'Tas Rajut', price: 165000, stock: 2, color: 'yellow', description: 'Tas bucket dengan warna krem yang versatile. Bisa dipakai dengan tali rajut atau rantai.' },
		{ id: 'ami-kucing', sku: 'HK-AMI-001', name: 'Amigurumi kucing 15 cm', category: 'Amigurumi', price: 125000, stock: 6, color: 'sage', description: 'Amigurumi kucing lucu dengan benang milky cotton lembut. Isian dakron silikon, aman untuk anak-anak.' },
		{ id: 'ami-kelinci', sku: 'HK-AMI-002', name: 'Amigurumi kelinci 20 cm', category: 'Amigurumi', price: 155000, stock: 4, color: 'rose', description: 'Amigurumi kelinci dengan telinga panjang dan ekspresi manis. Hadiah sempurna untuk orang tersayang.' },
		{ id: 'ami-beruang', sku: 'HK-AMI-003', name: 'Amigurumi beruang 25 cm', category: 'Amigurumi', price: 185000, stock: 3, color: 'terracotta', description: 'Amigurumi beruang besar dengan warna terracotta yang hangat. Lembut dan empuk.' },
		{ id: 'gantungan-kunci', sku: 'HK-AMI-004', name: 'Gantungan kunci rajut bunga', category: 'Amigurumi', price: 35000, stock: 12, color: 'yellow', description: 'Gantungan kunci kecil bermotif bunga. Cocok untuk kunci motor, mobil, atau tas.' },
		{ id: 'dompet-koin', sku: 'HK-DOM-001', name: 'Dompet koin rajut bunga', category: 'Dompet Rajut', price: 65000, stock: 8, color: 'rose', description: 'Dompet koin dengan motif bunga yang manis. Dilapisi kain dalam agar kuat.' },
		{ id: 'dompet-kartu', sku: 'HK-DOM-002', name: 'Dompet kartu rajut polos', category: 'Dompet Rajut', price: 75000, stock: 5, color: 'sage', description: 'Dompet kartu minimalis dengan beberapa slot. Bisa untuk kartu kredit, debit, dan KTP.' },
		{ id: 'dompet-panjang', sku: 'HK-DOM-003', name: 'Dompet panjang rajut motif', category: 'Dompet Rajut', price: 95000, stock: 0, color: 'terracotta', description: 'Dompet panjang dengan motif rajut yang cantik. Bisa untuk uang, kartu, dan HP.' },
		{ id: 'coaster-bunga', sku: 'HK-AKS-001', name: 'Coaster bunga (set 4)', category: 'Aksesori Rajut', price: 75000, stock: 10, color: 'rose', description: 'Set 4 coaster dengan motif bunga. Meja makin cantik dan terlindungi.' },
		{ id: 'topi-bucket', sku: 'HK-AKS-002', name: 'Topi bucket rajut', category: 'Aksesori Rajut', price: 145000, stock: 4, color: 'sage', description: 'Topi bucket rajut dengan warna sage yang trendy. Bisa untuk pria maupun wanita.' },
		{ id: 'buket-daisy', sku: 'HK-AKS-003', name: 'Buket bunga daisy rajut', category: 'Aksesori Rajut', price: 98000, stock: 7, color: 'yellow', description: 'Buket bunga daisy yang tidak akan layuk. Cocok untuk hadiah anniversary atau ulang tahun.' },
		{ id: 'sleeve-laptop', sku: 'HK-LPT-001', name: 'Sleeve laptop 14 inci', category: 'Tempat Laptop', price: 210000, stock: 3, color: 'terracotta', description: 'Sleeve laptop dengan lapisan busa tipis untuk perlindungan maksimal. Rajutan tebal dan kain dalam lembut.' },
		{ id: 'tas-laptop', sku: 'HK-LPT-002', name: 'Tas jinjing laptop 15,6 inci', category: 'Tempat Laptop', price: 285000, stock: 2, color: 'sage', description: 'Tas jinjing laptop dengan handle yang nyaman. Dilapisi busa dan kain dalam anti gores.' },
	];

	const currency = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 });

	function loadProducts() {
		try {
			const saved = localStorage.getItem(storageKey);
			return saved ? JSON.parse(saved) : fallbackProducts;
		} catch {
			return fallbackProducts;
		}
	}

	const products = loadProducts();
	const productId = (window.DetailProdukData && window.DetailProdukData.productId) || new URLSearchParams(window.location.search).get('id');
	const product = products.find((p) => p.id === productId);
	const container = document.querySelector('#product-detail-container');

	if (!product) {
		container.innerHTML = '<div class="empty-state"><span>!</span><p>Produk tidak ditemukan. <a href="/katalog">Kembali ke Katalog</a></p></div>';
		return;
	}

	const status = product.stock === 0 ? 'Habis' : product.stock <= 3 ? 'Menipis' : 'Tersedia';
	const statusClass = product.stock === 0 ? 'status-empty' : product.stock <= 3 ? 'status-low' : 'status-available';
	const relatedProducts = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3);

	container.innerHTML = `
		<section class="panel product-detail-panel">
			<div class="product-detail-grid">
				<div class="product-detail-image">
					<span class="product-visual visual-${product.color}" style="width:100%;height:320px"><span class="visual-yarn"></span><span class="visual-thread"></span></span>
				</div>
				<div class="product-detail-info">
					<p class="view-kicker">${product.category}</p>
					<h2>${product.name}</h2>
					<span class="transaction-id">${product.sku}</span>
					<p class="product-detail-price">${currency.format(product.price)}</p>
					<span class="status-tag ${statusClass}"><i></i>${status} (${product.stock} pcs)</span>
					<p class="product-detail-description">${product.description}</p>
					<div class="product-detail-actions">
						<a class="button button-primary" href="/manajemen-usaha/#kasir">Tambah ke Kasir</a>
						<a class="button button-outline" href="/katalog">Lihat Produk Lain</a>
					</div>
				</div>
			</div>
		</section>
		${relatedProducts.length ? `<section class="panel"><div class="panel-heading"><div><p class="view-kicker">PRODUK TERKAIT</p><h3>Kategori ${product.category}</h3></div></div><div class="related-products-grid">${relatedProducts.map((p) => `<a class="related-product-card" href="/detail-produk/?id=${p.id}"><span class="product-visual visual-${p.color}"><span class="visual-yarn"></span><span class="visual-thread"></span></span><span class="related-product-name">${p.name}</span><span class="related-product-price">${currency.format(p.price)}</span></a>`).join('')}</div></section>` : ''}
	`;
})();
