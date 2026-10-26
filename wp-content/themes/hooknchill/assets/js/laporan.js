(() => {
	const salesStorageKey = 'hooknchill-prototype-sales-v1';
	const productStorageKey = 'hooknchill-prototype-products-v1';
	const fallbackProducts = window.HooknchillData ? window.HooknchillData.products : [];
	const currency = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 });
	const numberFormat = new Intl.NumberFormat('id-ID');
	const shortDate = new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'short' });

	function loadSales() {
		try {
			const saved = localStorage.getItem(salesStorageKey);
			return saved ? JSON.parse(saved) : [];
		} catch {
			return [];
		}
	}

	function loadProducts() {
		try {
			const saved = localStorage.getItem(productStorageKey);
			return saved ? JSON.parse(saved) : fallbackProducts;
		} catch {
			return fallbackProducts;
		}
	}

	const allSales = loadSales();
	const products = loadProducts();
	const app = document.querySelector('#laporan-app');
	if (!app) return;

	const byId = (id) => document.getElementById(id);
	const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[c]);

	function getFilteredSales() {
		const days = Number(byId('laporan-range').value);
		const cutoff = new Date();
		cutoff.setDate(cutoff.getDate() - days);
		return allSales.filter((sale) => new Date(sale.createdAt) >= cutoff).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
	}

	function getTotalItemsSold(sales) {
		return sales.reduce((sum, sale) => sum + sale.items.reduce((s, item) => s + item.quantity, 0), 0);
	}

	function renderChart(sales, days) {
		const count = days === 7 ? 7 : days === 30 ? 10 : 12;
		const span = days / count;
		const buckets = Array(count).fill(0);
		sales.forEach((sale) => {
			const age = Math.floor((Date.now() - new Date(sale.createdAt).getTime()) / 86400000);
			const index = Math.max(0, Math.min(count - 1, count - 1 - Math.floor(age / span)));
			buckets[index] += sale.total;
		});
		const maximum = Math.max(...buckets, 1);
		byId('laporan-chart').innerHTML = buckets.map((total, index) => {
			const daysFromToday = Math.max(0, Math.round((count - index - 1) * span));
			const date = new Date();
			date.setDate(date.getDate() - daysFromToday);
			return `<div class="chart-column"><div class="chart-track"><span class="chart-bar" style="--bar-height:${Math.max(total ? 5 : 1, (total / maximum) * 100)}%" title="${currency.format(total)}"></span></div><span class="chart-label">${shortDate.format(date)}</span></div>`;
		}).join('');
	}

	function renderTopProducts(sales) {
		const totals = new Map();
		sales.forEach((sale) => sale.items.forEach((item) => { totals.set(item.id, (totals.get(item.id) || 0) + item.quantity); }));
		const sorted = [...totals.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5);
		const maximum = Math.max(...sorted.map((item) => item[1]), 1);
		byId('laporan-top-products').innerHTML = sorted.length ? sorted.map(([id, quantity], index) => {
			const product = sales.flatMap((s) => s.items).find((item) => item.id === id);
			const name = product ? product.name : id;
			return `<div class="top-product-row"><span class="top-product-rank">${String(index + 1).padStart(2, '0')}</span><span class="top-product-info">${escapeHtml(name)}<small>${numberFormat.format(quantity)} terjual</small><i style="--rank-width:${(quantity / maximum) * 100}%"></i></span></div>`;
		}).join('') : '<p class="empty-table">Belum ada penjualan pada periode ini.</p>';
	}

	function renderReport() {
		const days = Number(byId('laporan-range').value);
		const sales = getFilteredSales();
		const total = sales.reduce((sum, sale) => sum + sale.total, 0);
		const totalItems = getTotalItemsSold(sales);
		byId('laporan-sales').textContent = currency.format(total);
		byId('laporan-orders').textContent = numberFormat.format(sales.length);
		byId('laporan-items').textContent = numberFormat.format(totalItems);
		byId('laporan-average').textContent = currency.format(sales.length ? total / sales.length : 0);
		byId('laporan-period').textContent = `${days} hari terakhir`;
		byId('laporan-sales-body').innerHTML = sales.length ? sales.map((sale) => `<tr><td><span class="transaction-id">${escapeHtml(sale.id)}</span></td><td>${new Date(sale.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</td><td>${escapeHtml(sale.items.map((item) => `${item.name} × ${item.quantity}`).join(', '))}</td><td>${escapeHtml(sale.method)}</td><td class="numeric-cell">${currency.format(sale.total)}</td></tr>`).join('') : '<tr><td colspan="5" class="empty-table"><div class="empty-state-inline"><span>▤</span><p><strong>Belum ada transaksi</strong></p><p class="empty-hint">Catat transaksi melalui halaman Kasir</p></div></td></tr>';
		renderChart(sales, days);
		renderTopProducts(sales);
	}

	function exportCSV() {
		const sales = getFilteredSales();
		if (!sales.length) {
			toast('Tidak ada transaksi untuk diekspor.', 'error');
			return;
		}
		const rows = [['Nomor Transaksi', 'Tanggal', 'Produk', 'Jumlah Item', 'Metode', 'Total']];
		sales.forEach((sale) => rows.push([sale.id, new Date(sale.createdAt).toLocaleString('id-ID'), sale.items.map((item) => item.name).join('; '), sale.items.reduce((sum, item) => sum + item.quantity, 0), sale.method, sale.total]));
		const csv = rows.map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(',')).join('\r\n');
		const link = document.createElement('a');
		link.href = URL.createObjectURL(new Blob(['\ufeff', csv], { type: 'text/csv;charset=utf-8' }));
		link.download = `hooknchill-laporan-${byId('laporan-range').value}-hari.csv`;
		link.click();
		URL.revokeObjectURL(link.href);
		toast('Laporan CSV berhasil diunduh.', 'success');
	}

	function toast(message, type = 'success') {
		const element = byId('laporan-toast');
		element.textContent = message;
		element.className = `toast-message is-visible toast-${type}`;
		window.clearTimeout(toast.timeout);
		toast.timeout = window.setTimeout(() => element.classList.remove('is-visible'), 3000);
	}

	byId('laporan-range').addEventListener('change', renderReport);
	byId('export-csv').addEventListener('click', exportCSV);

	renderReport();
})();
