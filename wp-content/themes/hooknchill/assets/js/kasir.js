(() => {
	const productStorageKey = 'hooknchill-prototype-products-v1';
	const salesStorageKey = 'hooknchill-prototype-sales-v1';
	const cartStorageKey = 'hooknchill-prototype-cart-v1';
	const fallbackProducts = window.HooknchillData ? window.HooknchillData.products : [];
	const categories = window.HooknchillData ? window.HooknchillData.categories : [];
	const colorMap = window.HooknchillData ? window.HooknchillData.colors : {};
	const currency = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 });
	const numberFormat = new Intl.NumberFormat('id-ID');

	function saveProducts(products) {
		localStorage.setItem(productStorageKey, JSON.stringify(products));
	}

	function saveSales(sales) {
		localStorage.setItem(salesStorageKey, JSON.stringify(sales));
	}

	function saveCart(cart) {
		localStorage.setItem(cartStorageKey, JSON.stringify(cart));
	}

	const app = document.querySelector('#kasir-app');
	if (!app) return;

	function getProducts() {
		try {
			const saved = localStorage.getItem(productStorageKey);
			return saved ? JSON.parse(saved) : fallbackProducts;
		} catch {
			return fallbackProducts;
		}
	}

	function getSales() {
		try {
			const saved = localStorage.getItem(salesStorageKey);
			return saved ? JSON.parse(saved) : [];
		} catch {
			return [];
		}
	}

	function getCart() {
		try {
			const saved = localStorage.getItem(cartStorageKey);
			return saved ? JSON.parse(saved) : [];
		} catch {
			return [];
		}
	}

	const state = { cart: getCart(), category: 'Semua' };

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
		return `<img src="data:image/svg+xml,${encodeURIComponent(svgContent)}" alt="${escapeHtml(product.name)}" width="40" height="40">`;
	}

	function renderCategories() {
		byId('kasir-categories').innerHTML = ['Semua', ...categories].map((cat) => `<button type="button" class="filter-chip ${state.category === cat ? 'is-selected' : ''}" data-category="${escapeHtml(cat)}">${escapeHtml(cat)}</button>`).join('');
	}

	function renderProducts() {
		const products = getProducts();
		const search = byId('kasir-search').value.trim().toLowerCase();
		const filtered = products.filter((p) => (state.category === 'Semua' || p.category === state.category) && `${p.name} ${p.sku}`.toLowerCase().includes(search));
		byId('kasir-product-grid').innerHTML = filtered.length ? filtered.map((p) => `<article class="pos-product-card">${productImage(p)}<div class="pos-card-copy"><span class="pos-card-category">${escapeHtml(p.category)}</span><h3>${escapeHtml(p.name)}</h3><span class="pos-card-sku">${escapeHtml(p.sku)}</span><div class="pos-card-footer"><strong>${currency.format(p.price)}</strong><button class="add-to-cart" type="button" data-add="${escapeHtml(p.id)}" ${p.stock < 1 ? 'disabled' : ''} aria-label="Tambah ${escapeHtml(p.name)} ke keranjang">＋</button></div><small class="pos-stock">Stok ${numberFormat.format(p.stock)}</small></div></article>`).join('') : '<div class="empty-state"><span>⌕</span><p>Produk tidak ditemukan.</p></div>';
	}

	function renderCart() {
		const container = byId('kasir-cart-items');
		if (!state.cart.length) {
			container.innerHTML = '<div class="cart-empty"><span>＋</span><p>Keranjang masih kosong</p><small>Pilih produk rajut untuk memulai transaksi.</small></div>';
		} else {
			container.innerHTML = state.cart.map((item) => `<div class="cart-line"><div class="cart-line-top"><span class="cart-product-img">${productImage(item)}</span><span>${escapeHtml(item.name)}</span><button type="button" class="remove-cart-item" data-remove="${escapeHtml(item.id)}" aria-label="Hapus ${escapeHtml(item.name)}">×</button></div><div class="cart-line-bottom"><div class="quantity-control"><button type="button" data-qty="-1" data-id="${escapeHtml(item.id)}" aria-label="Kurangi jumlah">−</button><span>${item.quantity}</span><button type="button" data-qty="1" data-id="${escapeHtml(item.id)}" aria-label="Tambah jumlah">＋</button></div><strong>${currency.format(item.price * item.quantity)}</strong></div></div>`).join('');
		}
		const total = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
		byId('kasir-subtotal').textContent = currency.format(total);
		byId('kasir-total').textContent = currency.format(total);
		byId('complete-sale').disabled = !state.cart.length;
		saveCart(state.cart);
	}

	function addToCart(productId) {
		const products = getProducts();
		const product = products.find((p) => p.id === productId);
		if (!product) return;
		const line = state.cart.find((item) => item.id === productId);
		if ((line?.quantity || 0) >= product.stock) {
			toast('Jumlah melebihi stok yang tersedia.', 'error');
			return;
		}
		if (line) line.quantity += 1;
		else state.cart.push({ id: product.id, sku: product.sku, name: product.name, price: product.price, quantity: 1 });
		renderCart();
		toast(`${product.name} ditambahkan ke keranjang.`, 'success');
	}

	function completeSale() {
		if (!state.cart.length) return;
		const products = getProducts();
		const sales = getSales();
		const hasEnoughStock = state.cart.every((line) => products.find((p) => p.id === line.id)?.stock >= line.quantity);
		if (!hasEnoughStock) {
			toast('Stok berubah. Periksa kembali keranjang.', 'error');
			return;
		}
		state.cart.forEach((line) => {
			const product = products.find((p) => p.id === line.id);
			if (product) product.stock -= line.quantity;
		});
		const saleNumber = String(Date.now()).slice(-6);
		const sale = { id: `DEMO-${saleNumber}`, createdAt: new Date().toISOString(), method: byId('kasir-payment').value, items: state.cart.map((item) => ({ ...item })), total: state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0) };
		sales.unshift(sale);
		saveProducts(products);
		saveSales(sales);
		window.HooknchillData.products = products;
		state.cart = [];
		saveCart(state.cart);
		renderProducts();
		renderCart();
		toast(`Transaksi ${sale.id} berhasil dicatat!`, 'success');
	}

	function toast(message, type = 'success') {
		const element = byId('kasir-toast');
		element.textContent = message;
		element.className = `toast-message is-visible toast-${type}`;
		window.clearTimeout(toast.timeout);
		toast.timeout = window.setTimeout(() => element.classList.remove('is-visible'), 3000);
	}

	app.addEventListener('click', (event) => {
		const catBtn = event.target.closest('[data-category]');
		if (catBtn) { state.category = catBtn.dataset.category; renderCategories(); renderProducts(); return; }
		const addBtn = event.target.closest('[data-add]');
		if (addBtn) { addToCart(addBtn.dataset.add); return; }
		const removeBtn = event.target.closest('[data-remove]');
		if (removeBtn) { state.cart = state.cart.filter((item) => item.id !== removeBtn.dataset.remove); renderCart(); return; }
		const qtyBtn = event.target.closest('[data-qty]');
		if (qtyBtn) {
			const products = getProducts();
			const line = state.cart.find((item) => item.id === qtyBtn.dataset.id);
			const product = products.find((p) => p.id === qtyBtn.dataset.id);
			if (line && product) {
				const next = line.quantity + Number(qtyBtn.dataset.qty);
				if (next < 1) state.cart = state.cart.filter((item) => item.id !== line.id);
				else if (next <= product.stock) line.quantity = next;
				else toast('Jumlah melebihi stok yang tersedia.', 'error');
				renderCart();
			}
			return;
		}
		if (event.target.closest('#clear-cart')) { state.cart = []; saveCart(state.cart); renderCart(); return; }
		if (event.target.closest('#complete-sale')) { completeSale(); return; }
	});

	byId('kasir-search').addEventListener('input', renderProducts);

	renderCategories();
	renderProducts();
	renderCart();
})();
