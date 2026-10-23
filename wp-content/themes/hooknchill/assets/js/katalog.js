(() => {
	const storageKey = 'hooknchill-prototype-products-v1';
	const fallbackProducts = window.HooknchillData ? window.HooknchillData.products : [];
	const categories = window.HooknchillData ? window.HooknchillData.categories : [];
	const colorMap = window.HooknchillData ? window.HooknchillData.colors : {};
	const currency = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 });
	const numberFormat = new Intl.NumberFormat('id-ID');

	function saveProducts(products) {
		localStorage.setItem(storageKey, JSON.stringify(products));
	}

	const app = document.querySelector('#katalog-app');
	if (!app) return;

	function getProducts() {
		try {
			const saved = localStorage.getItem(storageKey);
			return saved ? JSON.parse(saved) : fallbackProducts;
		} catch {
			return fallbackProducts;
		}
	}

	const byId = (id) => document.getElementById(id);
	const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[c]);

	function productImage(product) {
		const colors = colorMap[product.color] || { bg: '#e7eee4', accent: '#405e47' };
		const type = product.image || 'aksesori';
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
		return `<span class="product-image-wrap"><img src="data:image/svg+xml,${encodeURIComponent(svgContent)}" alt="${escapeHtml(product.name)}" loading="lazy"></span>`;
	}

	function populateCategorySelect() {
		const select = byId('katalog-category');
		categories.forEach((cat) => {
			const option = document.createElement('option');
			option.value = cat;
			option.textContent = cat;
			select.appendChild(option);
		});
	}

	function renderKatalog() {
		const search = byId('katalog-search').value.trim().toLowerCase();
		const category = byId('katalog-category').value;
		const stockFilter = byId('katalog-stock').value;
		const sort = byId('katalog-sort').value;
		const products = getProducts();

		let filtered = products.filter((product) => {
			const matchesSearch = `${product.name} ${product.sku}`.toLowerCase().includes(search);
			const matchesCategory = category === 'all' || product.category === category;
			const matchesStock = stockFilter === 'all'
				|| (stockFilter === 'available' && product.stock > 3)
				|| (stockFilter === 'low' && product.stock > 0 && product.stock <= 3)
				|| (stockFilter === 'out' && product.stock === 0);
			return matchesSearch && matchesCategory && matchesStock;
		});

		if (sort === 'price-asc') filtered.sort((a, b) => a.price - b.price);
		else if (sort === 'price-desc') filtered.sort((a, b) => b.price - a.price);
		else if (sort === 'name') filtered.sort((a, b) => a.name.localeCompare(b.name));

		const resultInfo = byId('katalog-result-info');
		if (resultInfo) resultInfo.textContent = `Menampilkan ${filtered.length} dari ${products.length} produk`;
		window.HooknchillData.products = products;

		byId('katalog-body').innerHTML = filtered.length ? filtered.map((product) => {
			const status = product.stock === 0 ? 'Habis' : product.stock <= 3 ? 'Menipis' : 'Tersedia';
			const statusClass = product.stock === 0 ? 'status-empty' : product.stock <= 3 ? 'status-low' : 'status-available';
			return `<tr><td><div class="inventory-product">${productImage(product)}<span>${escapeHtml(product.name)}<small>${escapeHtml(product.sku)}</small></span></div></td><td>${escapeHtml(product.category)}</td><td class="numeric-cell">${currency.format(product.price)}</td><td><strong>${numberFormat.format(product.stock)}</strong></td><td><span class="status-tag ${statusClass}"><i></i>${status}</span></td><td><div class="table-actions"><button class="icon-button" data-edit="${escapeHtml(product.id)}" aria-label="Edit ${escapeHtml(product.name)}">✎</button><button class="icon-button" data-delete="${escapeHtml(product.id)}" aria-label="Hapus ${escapeHtml(product.name)}">×</button></div></td></tr>`;
		}).join('') : '<tr><td colspan="6" class="empty-table"><div class="empty-state-inline"><span>⌕</span><p><strong>Tidak ada produk ditemukan</strong></p><p class="empty-hint">Coba kata kunci lain atau ubah filter kategori</p></div></td></tr>';
	}

	function openProductDialog(product) {
		const dialog = byId('product-dialog');
		byId('product-dialog-title').textContent = product ? 'Edit Produk' : 'Tambah Produk';
		byId('product-id').value = product?.id || '';
		byId('product-name').value = product?.name || '';
		byId('product-category').value = product?.category || categories[0];
		byId('product-sku').value = product?.sku || '';
		byId('product-price').value = product?.price || '';
		byId('product-stock').value = product?.stock ?? 0;
		dialog.showModal();
		byId('product-name').focus();
	}

	function saveProduct() {
		const form = byId('product-form');
		if (!form.reportValidity()) return;
		const id = byId('product-id').value;
		const sku = byId('product-sku').value.trim();
		const products = getProducts();
		if (products.some((p) => p.sku.toLowerCase() === sku.toLowerCase() && p.id !== id)) {
			toast('SKU sudah digunakan produk lain.', 'error');
			return;
		}
		const current = products.find((p) => p.id === id);
		const product = {
			id: id || `product-${Date.now()}`,
			sku,
			name: byId('product-name').value.trim(),
			category: byId('product-category').value,
			price: Number(byId('product-price').value),
			stock: Number(byId('product-stock').value),
			color: current?.color || ['terracotta', 'sage', 'yellow', 'rose'][products.length % 4],
			image: current?.image || 'aksesori',
			description: current?.description || '',
		};
		if (current) products.splice(products.indexOf(current), 1, product);
		else products.unshift(product);
		saveProducts(products);
		window.HooknchillData.products = products;
		byId('product-dialog').close();
		renderKatalog();
		toast(current ? 'Produk berhasil diperbarui.' : 'Produk berhasil ditambahkan.', 'success');
	}

	function deleteProduct(productId) {
		const products = getProducts();
		const product = products.find((p) => p.id === productId);
		if (!product) return;
		if (!confirm(`Hapus produk "${product.name}"?`)) return;
		products.splice(products.indexOf(product), 1);
		saveProducts(products);
		window.HooknchillData.products = products;
		renderKatalog();
		toast(`Produk "${product.name}" berhasil dihapus.`, 'success');
	}

	function toast(message, type = 'success') {
		const element = byId('katalog-toast');
		element.textContent = message;
		element.className = `toast-message is-visible toast-${type}`;
		window.clearTimeout(toast.timeout);
		toast.timeout = window.setTimeout(() => element.classList.remove('is-visible'), 3000);
	}

	app.addEventListener('click', (event) => {
		const editBtn = event.target.closest('[data-edit]');
		if (editBtn) { openProductDialog(products.find((p) => p.id === editBtn.dataset.edit)); return; }
		const deleteBtn = event.target.closest('[data-delete]');
		if (deleteBtn) { deleteProduct(deleteBtn.dataset.delete); return; }
		if (event.target.closest('#add-product')) { openProductDialog(null); return; }
	});

	byId('katalog-search').addEventListener('input', renderKatalog);
	byId('katalog-category').addEventListener('change', renderKatalog);
	byId('katalog-stock').addEventListener('change', renderKatalog);
	byId('katalog-sort').addEventListener('change', renderKatalog);
	byId('save-product').addEventListener('click', saveProduct);
	byId('product-dialog').querySelectorAll('[value="cancel"]').forEach((btn) => btn.addEventListener('click', () => byId('product-dialog').close()));
	byId('product-form').addEventListener('submit', (event) => event.preventDefault());

	populateCategorySelect();
	renderKatalog();
})();
