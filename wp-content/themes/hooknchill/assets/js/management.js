(() => {
	const storageKeys = {
		products: 'hooknchill-prototype-products-v1',
		sales: 'hooknchill-prototype-sales-v1',
	};
	const categories = ['Tas Rajut', 'Amigurumi', 'Dompet Rajut', 'Aksesori Rajut', 'Tempat Laptop'];
	const seedProducts = [
		{ id: 'tas-granny', sku: 'HK-TAS-001', name: 'Tas granny square terracotta', category: 'Tas Rajut', price: 185000, stock: 3, color: 'terracotta' },
		{ id: 'tas-sling', sku: 'HK-TAS-002', name: 'Tas selempang mini sage', category: 'Tas Rajut', price: 145000, stock: 5, color: 'sage' },
		{ id: 'tas-bucket', sku: 'HK-TAS-003', name: 'Tas bucket rajut krem', category: 'Tas Rajut', price: 165000, stock: 2, color: 'yellow' },
		{ id: 'ami-kucing', sku: 'HK-AMI-001', name: 'Amigurumi kucing 15 cm', category: 'Amigurumi', price: 125000, stock: 6, color: 'sage' },
		{ id: 'ami-kelinci', sku: 'HK-AMI-002', name: 'Amigurumi kelinci 20 cm', category: 'Amigurumi', price: 155000, stock: 4, color: 'rose' },
		{ id: 'ami-beruang', sku: 'HK-AMI-003', name: 'Amigurumi beruang 25 cm', category: 'Amigurumi', price: 185000, stock: 3, color: 'terracotta' },
		{ id: 'gantungan-kunci', sku: 'HK-AMI-004', name: 'Gantungan kunci rajut bunga', category: 'Amigurumi', price: 35000, stock: 12, color: 'yellow' },
		{ id: 'dompet-koin', sku: 'HK-DOM-001', name: 'Dompet koin rajut bunga', category: 'Dompet Rajut', price: 65000, stock: 8, color: 'rose' },
		{ id: 'dompet-kartu', sku: 'HK-DOM-002', name: 'Dompet kartu rajut polos', category: 'Dompet Rajut', price: 75000, stock: 5, color: 'sage' },
		{ id: 'dompet-panjang', sku: 'HK-DOM-003', name: 'Dompet panjang rajut motif', category: 'Dompet Rajut', price: 95000, stock: 0, color: 'terracotta' },
		{ id: 'coaster-bunga', sku: 'HK-AKS-001', name: 'Coaster bunga (set 4)', category: 'Aksesori Rajut', price: 75000, stock: 10, color: 'rose' },
		{ id: 'topi-bucket', sku: 'HK-AKS-002', name: 'Topi bucket rajut', category: 'Aksesori Rajut', price: 145000, stock: 4, color: 'sage' },
		{ id: 'buket-daisy', sku: 'HK-AKS-003', name: 'Buket bunga daisy rajut', category: 'Aksesori Rajut', price: 98000, stock: 7, color: 'yellow' },
		{ id: 'sleeve-laptop', sku: 'HK-LPT-001', name: 'Sleeve laptop 14 inci', category: 'Tempat Laptop', price: 210000, stock: 3, color: 'terracotta' },
		{ id: 'tas-laptop', sku: 'HK-LPT-002', name: 'Tas jinjing laptop 15,6 inci', category: 'Tempat Laptop', price: 285000, stock: 2, color: 'sage' },
	];
	const saleSeeds = [
		[0, 'ami-kucing', 1, 'Tunai'], [0, 'coaster-bunga', 2, 'Transfer / QRIS'],
		[0, 'tas-sling', 1, 'Tunai'], [1, 'tas-granny', 1, 'Transfer / QRIS'],
		[1, 'dompet-kartu', 2, 'Tunai'], [2, 'ami-kelinci', 1, 'Tunai'],
		[2, 'gantungan-kunci', 3, 'Transfer / QRIS'], [3, 'buket-daisy', 1, 'Tunai'],
		[3, 'sleeve-laptop', 1, 'Transfer / QRIS'], [4, 'ami-kucing', 1, 'Tunai'],
		[5, 'topi-bucket', 1, 'Transfer / QRIS'], [5, 'dompet-koin', 2, 'Tunai'],
		[7, 'tas-bucket', 1, 'Tunai'], [7, 'coaster-bunga', 1, 'Transfer / QRIS'],
		[9, 'ami-beruang', 1, 'Tunai'], [11, 'gantungan-kunci', 2, 'Tunai'],
		[13, 'tas-granny', 1, 'Transfer / QRIS'], [16, 'dompet-kartu', 1, 'Tunai'],
		[19, 'sleeve-laptop', 1, 'Transfer / QRIS'], [22, 'ami-kucing', 2, 'Tunai'],
		[25, 'dompet-koin', 1, 'Transfer / QRIS'], [28, 'topi-bucket', 1, 'Tunai'],
		[34, 'coaster-bunga', 1, 'Tunai'], [35, 'tas-laptop', 1, 'Transfer / QRIS'],
		[43, 'tas-granny', 1, 'Tunai'], [45, 'ami-kelinci', 1, 'Transfer / QRIS'],
	];
	const currency = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 });
	const shortDate = new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'short' });
	const longDate = new Intl.DateTimeFormat('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
	const numberFormat = new Intl.NumberFormat('id-ID');
	const today = new Date();

	function loadValue(key, fallback) {
		try {
			const saved = localStorage.getItem(key);
			return saved ? JSON.parse(saved) : fallback;
		} catch {
			return fallback;
		}
	}

	function saveValue(key, value) {
		localStorage.setItem(key, JSON.stringify(value));
	}

	function makeSeedSales() {
		return saleSeeds.map(([daysAgo, productId, quantity, method], index) => {
			const product = seedProducts.find((item) => item.id === productId);
			const createdAt = new Date();
			createdAt.setDate(createdAt.getDate() - daysAgo);
			createdAt.setHours(9 + (index % 9), (index * 13) % 60, 0, 0);
			return {
				id: `HC-${String(index + 1).padStart(4, '0')}`,
				createdAt: createdAt.toISOString(),
				method,
				items: [{ id: product.id, name: product.name, sku: product.sku, quantity, price: product.price }],
				total: product.price * quantity,
			};
		});
	}

	const state = {
		products: loadValue(storageKeys.products, seedProducts),
		sales: loadValue(storageKeys.sales, makeSeedSales()),
		cart: [],
		category: 'Semua',
		lastUpdated: null,
	};
	const app = document.querySelector('#management-app');
	if (!app) return;

	const byId = (id) => document.getElementById(id);
	const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[character]);
	const getProduct = (id) => state.products.find((product) => product.id === id);
	const saveProducts = () => saveValue(storageKeys.products, state.products);
	const saveSales = () => saveValue(storageKeys.sales, state.sales);
	const sumCart = () => state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
	const relativeDay = (date) => Math.floor((today.setHours(0, 0, 0, 0) - new Date(date).setHours(0, 0, 0, 0)) / 86400000);

	function toast(message, type = 'success') {
		const element = byId('management-toast');
		element.textContent = message;
		element.className = `toast-message is-visible toast-${type}`;
		window.clearTimeout(toast.timeout);
		toast.timeout = window.setTimeout(() => element.classList.remove('is-visible'), 3000);
	}

	function updateLastUpdated() {
		state.lastUpdated = new Date();
		const el = byId('last-updated');
		if (el) {
			el.textContent = `Terakhir diperbarui: ${state.lastUpdated.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}`;
		}
	}

	function activateView(viewName) {
		const allowedViews = ['dashboard', 'kasir', 'inventaris', 'laporan'];
		const activeView = allowedViews.includes(viewName) ? viewName : 'dashboard';
		app.querySelectorAll('.management-view').forEach((view) => {
			view.hidden = view.id !== `view-${activeView}`;
		});
		app.querySelectorAll('.management-nav-link[data-view]').forEach((link) => {
			const active = link.dataset.view === activeView;
			link.classList.toggle('is-active', active);
			if (active) link.setAttribute('aria-current', 'page');
			else link.removeAttribute('aria-current');
		});
		byId('management-page-title').textContent = document.querySelector(`#view-${activeView}`).dataset.title;
		if (window.location.hash !== `#${activeView}`) history.replaceState(null, '', `#${activeView}`);
		if (activeView === 'kasir') renderPos();
		if (activeView === 'inventaris') renderInventory();
		if (activeView === 'laporan') renderReport();
	}

	function productVisual(product) {
		return `<span class="product-visual visual-${escapeHtml(product.color || 'sage')}" aria-hidden="true"><span class="visual-yarn"></span><span class="visual-thread"></span></span>`;
	}

	function renderDashboardChart() {
		const totals = Array(7).fill(0);
		state.sales.forEach((sale) => {
			const days = relativeDay(sale.createdAt);
			if (days >= 0 && days < 7) totals[6 - days] += sale.total;
		});
		const maximum = Math.max(...totals, 1);
		byId('dashboard-chart').innerHTML = totals.map((total, index) => {
			const date = new Date();
			date.setDate(date.getDate() - (6 - index));
			return `<div class="chart-column"><div class="chart-track"><span class="chart-bar" style="--bar-height:${Math.max(total ? 5 : 1, (total / maximum) * 100)}%" title="${currency.format(total)}"></span></div><span class="chart-label">${shortDate.format(date)}</span></div>`;
		}).join('');
	}

	function renderRecentSales() {
		const rows = [...state.sales].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);
		byId('recent-sales-body').innerHTML = rows.length ? rows.map((sale) => `<tr><td><span class="transaction-id">${escapeHtml(sale.id)}</span></td><td>${escapeHtml(sale.items.map((item) => item.name).join(', '))}</td><td>${shortDate.format(new Date(sale.createdAt))}</td><td>${escapeHtml(sale.method)}</td><td class="numeric-cell">${currency.format(sale.total)}</td></tr>`).join('') : '<tr><td colspan="5" class="empty-table">Belum ada transaksi.</td></tr>';
	}

	function renderLowStock() {
		const lowStock = state.products.filter((product) => product.stock <= 3).slice(0, 4);
		byId('low-stock-list').innerHTML = lowStock.length ? lowStock.map((product) => `<div class="low-stock-item">${productVisual(product)}<span class="low-stock-name">${escapeHtml(product.name)}<small>${escapeHtml(product.sku)}</small></span><span class="stock-pill ${product.stock === 0 ? 'stock-empty' : 'stock-low'}">${product.stock === 0 ? 'Habis' : `${numberFormat.format(product.stock)} tersisa`}</span></div>`).join('') : '<p class="empty-table">Semua stok aman.</p>';
	}

	function renderDashboard() {
		const todaySales = state.sales.filter((sale) => relativeDay(sale.createdAt) === 0);
		byId('metric-sales').textContent = currency.format(todaySales.reduce((sum, sale) => sum + sale.total, 0));
		byId('metric-orders').textContent = numberFormat.format(todaySales.length);
		byId('metric-products').textContent = numberFormat.format(state.products.length);
		byId('metric-low-stock').textContent = numberFormat.format(state.products.filter((product) => product.stock <= 3).length);
		byId('management-date').textContent = longDate.format(new Date());
		byId('pos-date').textContent = shortDate.format(new Date());
		const name = HooknchillManagement.userName || 'Pengelola';
		byId('user-avatar').textContent = name.trim().charAt(0).toUpperCase();
		renderDashboardChart();
		renderLowStock();
		renderRecentSales();
		updateLastUpdated();
	}

	function renderCategoryChips() {
		byId('pos-categories').innerHTML = ['Semua', ...categories].map((category) => `<button type="button" class="filter-chip ${state.category === category ? 'is-selected' : ''}" data-category="${escapeHtml(category)}">${escapeHtml(category)}</button>`).join('');
	}

	function renderPosProducts() {
		const search = byId('pos-search').value.trim().toLowerCase();
		const products = state.products.filter((product) => (state.category === 'Semua' || product.category === state.category) && `${product.name} ${product.sku}`.toLowerCase().includes(search));
		byId('pos-product-grid').innerHTML = products.length ? products.map((product) => `<article class="pos-product-card">${productVisual(product)}<div class="pos-card-copy"><span class="pos-card-category">${escapeHtml(product.category)}</span><h3>${escapeHtml(product.name)}</h3><span class="pos-card-sku">${escapeHtml(product.sku)}</span><div class="pos-card-footer"><strong>${currency.format(product.price)}</strong><button class="add-to-cart" type="button" data-add-product="${escapeHtml(product.id)}" ${product.stock < 1 ? 'disabled' : ''} aria-label="Tambah ${escapeHtml(product.name)} ke keranjang">＋</button></div><small class="pos-stock">Stok ${numberFormat.format(product.stock)}</small></div></article>`).join('') : '<div class="empty-state"><span>⌕</span><p>Produk tidak ditemukan.</p></div>';
	}

	function renderCart() {
		const container = byId('pos-cart-items');
		if (!state.cart.length) {
			container.innerHTML = '<div class="cart-empty"><span>＋</span><p>Keranjang masih kosong</p><small>Pilih produk untuk memulai transaksi.</small></div>';
		} else {
			container.innerHTML = state.cart.map((item) => `<div class="cart-line"><div class="cart-line-top"><span>${escapeHtml(item.name)}</span><button type="button" class="remove-cart-item" data-remove-item="${escapeHtml(item.id)}" aria-label="Hapus ${escapeHtml(item.name)}">×</button></div><div class="cart-line-bottom"><div class="quantity-control"><button type="button" data-cart-quantity="-1" data-cart-id="${escapeHtml(item.id)}" aria-label="Kurangi jumlah">−</button><span>${item.quantity}</span><button type="button" data-cart-quantity="1" data-cart-id="${escapeHtml(item.id)}" aria-label="Tambah jumlah">＋</button></div><strong>${currency.format(item.price * item.quantity)}</strong></div></div>`).join('');
		}
		const total = sumCart();
		byId('cart-subtotal').textContent = currency.format(total);
		byId('checkout-total').textContent = currency.format(total);
		byId('complete-sale').disabled = !state.cart.length;
	}

	function renderPos() {
		renderCategoryChips();
		renderPosProducts();
		renderCart();
	}

	function addToCart(productId) {
		const product = getProduct(productId);
		if (!product) return;
		const line = state.cart.find((item) => item.id === productId);
		if ((line?.quantity || 0) >= product.stock) {
			toast('Jumlah melebihi stok yang tersedia.');
			return;
		}
		if (line) line.quantity += 1;
		else state.cart.push({ id: product.id, sku: product.sku, name: product.name, price: product.price, quantity: 1 });
		renderCart();
	}

	function completeSale() {
		if (!state.cart.length) return;
		const hasEnoughStock = state.cart.every((line) => getProduct(line.id)?.stock >= line.quantity);
		if (!hasEnoughStock) {
			toast('Stok berubah. Periksa kembali keranjang.', 'error');
			return;
		}
		state.cart.forEach((line) => { getProduct(line.id).stock -= line.quantity; });
		const saleNumber = String(Date.now()).slice(-6);
		state.sales.unshift({ id: `DEMO-${saleNumber}`, createdAt: new Date().toISOString(), method: byId('payment-method').value, items: state.cart.map((item) => ({ ...item })), total: sumCart() });
		saveProducts();
		saveSales();
		state.cart = [];
		renderAll();
		toast('Transaksi berhasil dicatat!', 'success');
	}

	function populateCategorySelects() {
		const options = categories.map((category) => `<option value="${escapeHtml(category)}">${escapeHtml(category)}</option>`).join('');
		byId('inventory-category').innerHTML = `<option value="all">Semua kategori</option>${options}`;
		byId('product-category').innerHTML = `${options}<option value="Lainnya">Lainnya</option>`;
	}

	function renderInventory() {
		const search = byId('inventory-search').value.trim().toLowerCase();
		const category = byId('inventory-category').value;
		const stockFilter = byId('inventory-stock').value;
		const products = state.products.filter((product) => {
			const matchesSearch = `${product.name} ${product.sku}`.toLowerCase().includes(search);
			const matchesCategory = category === 'all' || product.category === category;
			const matchesStock = stockFilter === 'all' || (stockFilter === 'low' ? product.stock <= 3 : product.stock > 3);
			return matchesSearch && matchesCategory && matchesStock;
		});
		byId('inventory-body').innerHTML = products.length ? products.map((product) => {
			const status = product.stock === 0 ? 'Habis' : product.stock <= 3 ? 'Menipis' : 'Tersedia';
			const statusClass = product.stock === 0 ? 'status-empty' : product.stock <= 3 ? 'status-low' : 'status-available';
			return `<tr><td><div class="inventory-product">${productVisual(product)}<span>${escapeHtml(product.name)}<small>${escapeHtml(product.sku)}</small></span></div></td><td>${escapeHtml(product.category)}</td><td class="numeric-cell">${currency.format(product.price)}</td><td><div class="stock-adjuster"><button type="button" data-stock-change="-1" data-product-id="${escapeHtml(product.id)}" ${product.stock <= 0 ? 'disabled' : ''} aria-label="Kurangi stok ${escapeHtml(product.name)}">−</button><strong>${numberFormat.format(product.stock)}</strong><button type="button" data-stock-change="1" data-product-id="${escapeHtml(product.id)}" aria-label="Tambah stok ${escapeHtml(product.name)}">＋</button></div></td><td><span class="status-tag ${statusClass}"><i></i>${status}</span></td><td><button class="icon-button edit-product" type="button" data-edit-product="${escapeHtml(product.id)}" aria-label="Edit ${escapeHtml(product.name)}">···</button></td></tr>`;
		}).join('') : '<tr><td colspan="6" class="empty-table">Tidak ada produk yang cocok.</td></tr>';
		byId('metric-products').textContent = numberFormat.format(state.products.length);
		byId('metric-low-stock').textContent = numberFormat.format(state.products.filter((product) => product.stock <= 3).length);
	}

	function reportSales() {
		const days = Number(byId('report-range').value);
		return state.sales.filter((sale) => relativeDay(sale.createdAt) >= 0 && relativeDay(sale.createdAt) < days).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
	}

	function renderReportChart(sales, days) {
		const count = days === 7 ? 7 : days === 30 ? 10 : 12;
		const span = days / count;
		const buckets = Array(count).fill(0);
		sales.forEach((sale) => {
			const age = relativeDay(sale.createdAt);
			const index = Math.max(0, Math.min(count - 1, count - 1 - Math.floor(age / span)));
			buckets[index] += sale.total;
		});
		const maximum = Math.max(...buckets, 1);
		byId('report-chart').innerHTML = buckets.map((total, index) => {
			const daysFromToday = Math.max(0, Math.round((count - index - 1) * span));
			const date = new Date();
			date.setDate(date.getDate() - daysFromToday);
			return `<div class="chart-column"><div class="chart-track"><span class="chart-bar" style="--bar-height:${Math.max(total ? 5 : 1, (total / maximum) * 100)}%" title="${currency.format(total)}"></span></div><span class="chart-label">${shortDate.format(date)}</span></div>`;
		}).join('');
	}

	function renderTopProducts(sales) {
		const totals = new Map();
		sales.forEach((sale) => sale.items.forEach((item) => {
			totals.set(item.id, (totals.get(item.id) || 0) + item.quantity);
		}));
		const sorted = [...totals.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5);
		const maximum = Math.max(...sorted.map((item) => item[1]), 1);
		byId('top-products-list').innerHTML = sorted.length ? sorted.map(([id, quantity], index) => {
			const product = getProduct(id) || sales.flatMap((sale) => sale.items).find((item) => item.id === id);
			return `<div class="top-product-row"><span class="top-product-rank">${String(index + 1).padStart(2, '0')}</span><span class="top-product-info">${escapeHtml(product.name)}<small>${numberFormat.format(quantity)} terjual</small><i style="--rank-width:${(quantity / maximum) * 100}%"></i></span></div>`;
		}).join('') : '<p class="empty-table">Belum ada penjualan pada periode ini.</p>';
	}

	function renderReport() {
		const days = Number(byId('report-range').value);
		const sales = reportSales();
		const total = sales.reduce((sum, sale) => sum + sale.total, 0);
		byId('report-sales').textContent = currency.format(total);
		byId('report-orders').textContent = numberFormat.format(sales.length);
		byId('report-average').textContent = currency.format(sales.length ? total / sales.length : 0);
		byId('report-period').textContent = `${days} hari terakhir`;
		byId('report-sales-body').innerHTML = sales.length ? sales.map((sale) => `<tr><td><span class="transaction-id">${escapeHtml(sale.id)}</span></td><td>${new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(sale.createdAt))}</td><td>${escapeHtml(sale.items.map((item) => `${item.name} × ${item.quantity}`).join(', '))}</td><td>${escapeHtml(sale.method)}</td><td class="numeric-cell">${currency.format(sale.total)}</td></tr>`).join('') : '<tr><td colspan="5" class="empty-table">Belum ada transaksi pada periode ini.</td></tr>';
		renderReportChart(sales, days);
		renderTopProducts(sales);
	}

	function exportReport() {
		const rows = [['Nomor transaksi', 'Tanggal', 'Produk', 'Jumlah item', 'Metode', 'Total']];
		reportSales().forEach((sale) => rows.push([sale.id, new Date(sale.createdAt).toLocaleString('id-ID'), sale.items.map((item) => item.name).join('; '), sale.items.reduce((sum, item) => sum + item.quantity, 0), sale.method, sale.total]));
		const csv = rows.map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(',')).join('\r\n');
		const link = document.createElement('a');
		link.href = URL.createObjectURL(new Blob(['\ufeff', csv], { type: 'text/csv;charset=utf-8' }));
		link.download = `hooknchill-laporan-${byId('report-range').value}-hari.csv`;
		link.click();
		URL.revokeObjectURL(link.href);
	}

	function openProductDialog(product) {
		const dialog = byId('product-dialog');
		byId('product-dialog-title').textContent = product ? 'Edit produk' : 'Tambah produk';
		byId('product-id').value = product?.id || '';
		byId('product-name').value = product?.name || '';
		byId('product-category').value = product?.category || categories[0];
		byId('product-sku').value = product?.sku || '';
		if (product) byId('product-sku').dataset.edited = 'true';
		else delete byId('product-sku').dataset.edited;
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
		if (state.products.some((product) => product.sku.toLowerCase() === sku.toLowerCase() && product.id !== id)) {
			toast('SKU sudah digunakan produk lain.');
			return;
		}
		const current = getProduct(id);
		const product = {
			id: id || `product-${Date.now()}`,
			sku,
			name: byId('product-name').value.trim(),
			category: byId('product-category').value,
			price: Number(byId('product-price').value),
			stock: Number(byId('product-stock').value),
			color: current?.color || ['terracotta', 'sage', 'yellow', 'rose'][state.products.length % 4],
		};
		if (current) state.products = state.products.map((item) => item.id === id ? product : item);
		else state.products.unshift(product);
		saveProducts();
		byId('product-dialog').close();
		populateCategorySelects();
		renderAll();
		toast(current ? 'Produk diperbarui.' : 'Produk ditambahkan.');
	}

	function renderAll() {
		renderDashboard();
		renderPos();
		renderInventory();
		renderReport();
	}

	app.addEventListener('click', (event) => {
		const nav = event.target.closest('[data-view]');
		if (nav) {
			event.preventDefault();
			activateView(nav.dataset.view);
			return;
		}
		const navigate = event.target.closest('[data-navigate]');
		if (navigate) {
			activateView(navigate.dataset.navigate);
			return;
		}
		const category = event.target.closest('[data-category]');
		if (category) {
			state.category = category.dataset.category;
			renderPos();
			return;
		}
		const addButton = event.target.closest('[data-add-product]');
		if (addButton) {
			addToCart(addButton.dataset.addProduct);
			return;
		}
		const removeButton = event.target.closest('[data-remove-item]');
		if (removeButton) {
			state.cart = state.cart.filter((item) => item.id !== removeButton.dataset.removeItem);
			renderCart();
			return;
		}
		const quantityButton = event.target.closest('[data-cart-quantity]');
		if (quantityButton) {
			const line = state.cart.find((item) => item.id === quantityButton.dataset.cartId);
			const product = getProduct(quantityButton.dataset.cartId);
			if (line && product) {
				const next = line.quantity + Number(quantityButton.dataset.cartQuantity);
				if (next < 1) state.cart = state.cart.filter((item) => item.id !== line.id);
				else if (next <= product.stock) line.quantity = next;
				else toast('Jumlah melebihi stok yang tersedia.');
				renderCart();
			}
			return;
		}
		const stockButton = event.target.closest('[data-stock-change]');
		if (stockButton) {
			const product = getProduct(stockButton.dataset.productId);
			if (product) {
				product.stock = Math.max(0, product.stock + Number(stockButton.dataset.stockChange));
				saveProducts();
				renderAll();
			}
			return;
		}
		const editButton = event.target.closest('[data-edit-product]');
		if (editButton) openProductDialog(getProduct(editButton.dataset.editProduct));
	});

	byId('pos-search').addEventListener('input', renderPosProducts);
	byId('inventory-search').addEventListener('input', renderInventory);
	byId('inventory-category').addEventListener('change', renderInventory);
	byId('inventory-stock').addEventListener('change', renderInventory);
	byId('report-range').addEventListener('change', renderReport);
	byId('export-report').addEventListener('click', exportReport);
	byId('complete-sale').addEventListener('click', completeSale);
	byId('clear-cart').addEventListener('click', () => {
		state.cart = [];
		renderCart();
	});
	byId('add-product').addEventListener('click', () => openProductDialog(null));
	byId('save-product').addEventListener('click', saveProduct);
	byId('refresh-data').addEventListener('click', () => {
		renderAll();
		toast('Data berhasil dimuat ulang.', 'success');
	});
	byId('product-dialog').querySelectorAll('[value="cancel"]').forEach((button) => button.addEventListener('click', () => byId('product-dialog').close()));
	byId('product-form').addEventListener('submit', (event) => event.preventDefault());
	byId('product-name').addEventListener('input', (event) => {
		if (!byId('product-id').value && !byId('product-sku').dataset.edited) {
			byId('product-sku').value = `HK-${event.target.value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase().replace(/[^A-Z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 16)}`;
		}
	});
	byId('product-sku').addEventListener('input', (event) => { event.target.dataset.edited = 'true'; });
	window.addEventListener('hashchange', () => activateView(window.location.hash.slice(1)));
	populateCategorySelects();
	renderAll();
	activateView(window.location.hash.slice(1) || 'dashboard');
})();