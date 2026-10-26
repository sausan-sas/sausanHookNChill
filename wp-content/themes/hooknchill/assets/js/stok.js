(() => {
	const storageKey = 'hooknchill-prototype-products-v1';
	const fallbackProducts = window.HooknchillData ? window.HooknchillData.products : [];
	const categories = window.HooknchillData ? window.HooknchillData.categories : [];
	const colorMap = window.HooknchillData ? window.HooknchillData.colors : {};
	const currency = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 });
	const numberFormat = new Intl.NumberFormat('id-ID');

	function loadProducts() {
		try {
			const saved = localStorage.getItem(storageKey);
			return saved ? JSON.parse(saved) : fallbackProducts;
		} catch {
			return fallbackProducts;
		}
	}

	function saveProducts(products) {
		localStorage.setItem(storageKey, JSON.stringify(products));
	}

	const products = loadProducts();
	const app = document.querySelector('#stok-app');
	if (!app) return;

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
		const select = byId('stok-category');
		categories.forEach((cat) => {
			const option = document.createElement('option');
			option.value = cat;
			option.textContent = cat;
			select.appendChild(option);
		});
	}

	function populateProductSelect() {
		const select = byId('stok-product-select');
		select.innerHTML = products.map((p) => `<option value="${p.id}">${p.name} (${p.sku})</option>`).join('');
	}

	function updateMetrics() {
		byId('stok-total').textContent = numberFormat.format(products.length);
		byId('stok-available').textContent = numberFormat.format(products.filter((p) => p.stock > 3).length);
		byId('stok-low').textContent = numberFormat.format(products.filter((p) => p.stock > 0 && p.stock <= 3).length);
		byId('stok-empty').textContent = numberFormat.format(products.filter((p) => p.stock === 0).length);
	}

	function renderStok() {
		const search = byId('stok-search').value.trim().toLowerCase();
		const category = byId('stok-category').value;
		const filter = byId('stok-filter').value;

		const filtered = products.filter((product) => {
			const matchesSearch = `${product.name} ${product.sku}`.toLowerCase().includes(search);
			const matchesCategory = category === 'all' || product.category === category;
			const matchesFilter = filter === 'all'
				|| (filter === 'available' && product.stock > 3)
				|| (filter === 'low' && product.stock > 0 && product.stock <= 3)
				|| (filter === 'out' && product.stock === 0);
			return matchesSearch && matchesCategory && matchesFilter;
		});

		const resultInfo = byId('stok-result-info');
		if (resultInfo) resultInfo.textContent = `Menampilkan ${filtered.length} dari ${products.length} produk`;

		byId('stok-body').innerHTML = filtered.length ? filtered.map((product) => {
			const status = product.stock === 0 ? 'Habis' : product.stock <= 3 ? 'Menipis' : 'Tersedia';
			const statusClass = product.stock === 0 ? 'status-empty' : product.stock <= 3 ? 'status-low' : 'status-available';
			return `<tr><td><div class="inventory-product">${productImage(product)}<span>${escapeHtml(product.name)}<small>${escapeHtml(product.sku)}</small></span></div></td><td>${escapeHtml(product.category)}</td><td class="numeric-cell">${currency.format(product.price)}</td><td><div class="stock-adjuster"><button type="button" data-stock-minus="${escapeHtml(product.id)}" ${product.stock <= 0 ? 'disabled' : ''} aria-label="Kurangi stok ${escapeHtml(product.name)}">−</button><strong>${numberFormat.format(product.stock)}</strong><button type="button" data-stock-plus="${escapeHtml(product.id)}" aria-label="Tambah stok ${escapeHtml(product.name)}">＋</button></div></td><td><span class="status-tag ${statusClass}"><i></i>${status}</span></td><td><button class="icon-button" data-stok-edit="${escapeHtml(product.id)}" aria-label="Kelola stok ${escapeHtml(product.name)}">⚙</button></td></tr>`;
		}).join('') : '<tr><td colspan="6" class="empty-table"><div class="empty-state-inline"><span>!</span><p><strong>Tidak ada produk ditemukan</strong></p><p class="empty-hint">Coba kata kunci lain atau ubah filter</p></div></td></tr>';

		updateMetrics();
	}

	function adjustStock(productId, delta) {
		const product = products.find((p) => p.id === productId);
		if (!product) return;
		const newStock = Math.max(0, product.stock + delta);
		if (newStock === product.stock) return;
		product.stock = newStock;
		saveProducts(products);
		renderStok();
		toast(`Stok ${product.name} ${delta > 0 ? 'ditambah' : 'dikurangi'} menjadi ${newStock}.`, 'success');
	}

	function openStokDialog(productId) {
		const product = products.find((p) => p.id === productId);
		if (!product) return;
		byId('stok-dialog-title').textContent = `Kelola Stok: ${product.name}`;
		byId('stok-product-id').value = product.id;
		byId('stok-product-select').value = product.id;
		byId('stok-type').value = 'in';
		byId('stok-quantity').value = 1;
		byId('stok-note').value = '';
		byId('stok-dialog').showModal();
	}

	function saveStok() {
		const productId = byId('stok-product-id').value;
		const type = byId('stok-type').value;
		const quantity = parseInt(byId('stok-quantity').value, 10);
		const note = byId('stok-note').value.trim();
		const product = products.find((p) => p.id === productId);
		if (!product || !quantity || quantity < 1) {
			toast('Jumlah stok tidak valid.', 'error');
			return;
		}
		if (type === 'in') {
			product.stock += quantity;
		} else if (type === 'out') {
			if (quantity > product.stock) {
				toast('Stok keluar melebihi stok tersedia.', 'error');
				return;
			}
			product.stock -= quantity;
		} else {
			product.stock = quantity;
		}
		saveProducts(products);
		byId('stok-dialog').close();
		renderStok();
		toast(`Stok ${product.name} berhasil diperbarui${note ? ` (${note})` : ''}.`, 'success');
	}

	function toast(message, type = 'success') {
		const element = byId('stok-toast');
		element.textContent = message;
		element.className = `toast-message is-visible toast-${type}`;
		window.clearTimeout(toast.timeout);
		toast.timeout = window.setTimeout(() => element.classList.remove('is-visible'), 3000);
	}

	app.addEventListener('click', (event) => {
		const plusBtn = event.target.closest('[data-stock-plus]');
		if (plusBtn) { adjustStock(plusBtn.dataset.stockPlus, 1); return; }
		const minusBtn = event.target.closest('[data-stock-minus]');
		if (minusBtn) { adjustStock(minusBtn.dataset.stockMinus, -1); return; }
		const editBtn = event.target.closest('[data-stok-edit]');
		if (editBtn) { openStokDialog(editBtn.dataset.stokEdit); return; }
	});

	byId('stok-search').addEventListener('input', renderStok);
	byId('stok-category').addEventListener('change', renderStok);
	byId('stok-filter').addEventListener('change', renderStok);
	byId('save-stok').addEventListener('click', saveStok);
	byId('stok-dialog').querySelectorAll('[value="cancel"]').forEach((btn) => btn.addEventListener('click', () => byId('stok-dialog').close()));

	populateCategorySelect();
	populateProductSelect();
	renderStok();
})();
