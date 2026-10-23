(() => {
	const storageKey = 'hooknchill-prototype-products-v1';
	const fallbackProducts = window.HooknchillData ? window.HooknchillData.products : [];
	const colorMap = window.HooknchillData ? window.HooknchillData.colors : {};
	const currency = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 });

	function loadProducts() {
		try {
			const saved = localStorage.getItem(storageKey);
			return saved ? JSON.parse(saved) : fallbackProducts;
		} catch {
			return fallbackProducts;
		}
	}

	function getProducts() {
		try {
			const saved = localStorage.getItem(storageKey);
			return saved ? JSON.parse(saved) : fallbackProducts;
		} catch {
			return fallbackProducts;
		}
	}

	const products = getProducts();
	const productId = (window.DetailProdukData && window.DetailProdukData.productId) || new URLSearchParams(window.location.search).get('id');
	const product = products.find((p) => p.id === productId);
	const container = document.querySelector('#product-detail-container');

	if (!product) {
		container.innerHTML = '<div class="empty-state"><span>!</span><p>Produk tidak ditemukan. <a href="/katalog">Kembali ke Katalog</a></p></div>';
		return;
	}

	function productImage(p) {
		const colors = colorMap[p.color] || { bg: '#e7eee4', accent: '#405e47' };
		const type = p.image || 'aksesori';
		let svgContent = '';
		if (type === 'tas') {
			svgContent = `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><rect width="120" height="120" fill="${colors.bg}"/><path d="M35 50 Q35 25 60 25 Q85 25 85 50" fill="none" stroke="${colors.accent}" stroke-width="3"/><rect x="30" y="50" width="60" height="45" rx="5" fill="${colors.accent}"/><circle cx="60" cy="72" r="8" fill="${colors.bg}"/><line x1="30" y1="65" x2="90" y2="65" stroke="${colors.bg}" stroke-width="2" stroke-dasharray="4 3"/></svg>`;
		} else if (type === 'amigurumi') {
			svgContent = `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><rect width="120" height="120" fill="${colors.bg}"/><circle cx="60" cy="65" r="28" fill="${colors.accent}"/><circle cx="50" cy="58" r="4" fill="${colors.bg}"/><circle cx="70" cy="58" r="4" fill="${colors.bg}"/><path d="M52 72 Q60 78 68 72" fill="none" stroke="${colors.bg}" stroke-width="2"/><circle cx="42" cy="48" r="8" fill="${colors.accent}"/><circle cx="78" cy="48" r="8" fill="${colors.accent}"/></svg>`;
		} else if (type === 'dompet') {
			svgContent = `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><rect width="120" height="120" fill="${colors.bg}"/><rect x="25" y="40" width="70" height="45" rx="8" fill="${colors.accent}"/><rect x="25" y="40" width="70" height="12" rx="6" fill="${colors.bg}" opacity="0.3"/><circle cx="80" cy="68" r="6" fill="${colors.bg}"/></svg>`;
		} else if (type === 'laptop') {
			svgContent = `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><rect width="120" height="120" fill="${colors.bg}"/><rect x="20" y="35" width="80" height="55" rx="6" fill="${colors.accent}"/><rect x="15" y="90" width="90" height="6" rx="3" fill="${colors.accent}"/><line x1="40" y1="55" x2="80" y2="55" stroke="${colors.bg}" stroke-width="2" stroke-dasharray="4 3"/></svg>`;
		} else {
			svgContent = `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><rect width="120" height="120" fill="${colors.bg}"/><circle cx="60" cy="60" r="25" fill="${colors.accent}"/><circle cx="60" cy="60" r="15" fill="${colors.bg}"/><circle cx="60" cy="60" r="8" fill="${colors.accent}"/></svg>`;
		}
		return `<span class="product-image-wrap"><img src="data:image/svg+xml,${encodeURIComponent(svgContent)}" alt="${p.name}" loading="lazy"></span>`;
	}

	const status = product.stock === 0 ? 'Habis' : product.stock <= 3 ? 'Menipis' : 'Tersedia';
	const statusClass = product.stock === 0 ? 'status-empty' : product.stock <= 3 ? 'status-low' : 'status-available';
	const relatedProducts = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3);

	container.innerHTML = `
		<section class="panel product-detail-panel">
			<div class="product-detail-grid">
				<div class="product-detail-image">
					${productImage(product)}
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
		${relatedProducts.length ? `<section class="panel"><div class="panel-heading"><div><p class="view-kicker">PRODUK TERKAIT</p><h3>Kategori ${product.category}</h3></div></div><div class="related-products-grid">${relatedProducts.map((p) => `<a class="related-product-card" href="/detail-produk/?id=${p.id}">${productImage(p)}<span class="related-product-name">${p.name}</span><span class="related-product-price">${currency.format(p.price)}</span></a>`).join('')}</div></section>` : ''}
	`;
})();
