(() => {
	const storageKey = 'hooknchill-pesanan-v1';
	const fallbackOrders = [
		{ id: 'PO-2024-001', customerName: 'Siti Rahayu', whatsapp: '081234567890', productType: 'Amigurumi', sizeText: '25 cm', colorText: 'sage', quantity: 2, description: 'Amigurumi beruang untuk hadiah ulang tahun anak. Benang warna sage dan krem.', neededBy: '2024-12-20', budget: 400000, status: 'new', createdAt: '2024-12-10T08:30:00Z' },
		{ id: 'PO-2024-002', customerName: 'Dewi Lestari', whatsapp: '082345678901', productType: 'Tas Selempang Rajut', sizeText: 'M', colorText: 'terracotta', quantity: 1, description: 'Tas selempang dengan motif bunga untuk dipakai sehari-hari.', neededBy: '2024-12-15', budget: 250000, status: 'process', createdAt: '2024-12-08T10:15:00Z' },
		{ id: 'PO-2024-003', customerName: 'Rina Kartika', whatsapp: '083456789012', productType: 'Dompet Rajut', sizeText: '-', colorText: 'kuning', quantity: 3, description: 'Dompet kartu warna kuning untuk souvenir arisan.', neededBy: '2024-12-25', budget: 300000, status: 'quoted', createdAt: '2024-12-12T14:20:00Z' },
		{ id: 'PO-2024-004', customerName: 'Maya Putri', whatsapp: '084567890123', productType: 'Tempat Laptop Rajut', sizeText: '14 inch', colorText: 'krem', quantity: 1, description: 'Sleeve laptop dengan lapisan busa, warna krem.', neededBy: '2024-12-18', budget: 300000, status: 'done', createdAt: '2024-12-05T09:00:00Z' },
		{ id: 'PO-2024-005', customerName: 'Nina Sari', whatsapp: '085678901234', productType: 'Amigurumi', sizeText: '15 cm', colorText: 'pink', quantity: 5, description: 'Gantungan kunci bunga untuk dibagikan saat acara.', neededBy: '2024-12-30', budget: 200000, status: 'review', createdAt: '2024-12-14T11:45:00Z' },
		{ id: 'PO-2024-006', customerName: 'Lina Marlina', whatsapp: '086789012345', productType: 'Tas Selempang Rajut', sizeText: 'S', colorText: 'hitam', quantity: 2, description: 'Tas mini warna hitam untuk hadiah sahabat.', neededBy: '2024-12-22', budget: 350000, status: 'new', createdAt: '2024-12-15T16:30:00Z' },
		{ id: 'PO-2024-007', customerName: 'Putri Ayu', whatsapp: '087890123456', productType: 'Dompet Rajut', sizeText: '-', colorText: 'sage', quantity: 1, description: 'Dompet panjang dengan motif geometris.', neededBy: '', budget: 150000, status: 'cancel', createdAt: '2024-12-01T13:00:00Z' },
		{ id: 'PO-2024-008', customerName: 'Sari Wulandari', whatsapp: '088901234567', productType: 'Amigurumi', sizeText: '20 cm', colorText: 'coklat', quantity: 1, description: 'Amigurumi kelinci untuk dekorasi kamar.', neededBy: '2024-12-28', budget: 200000, status: 'process', createdAt: '2024-12-11T07:20:00Z' },
	];

	const statusLabels = { new: 'Baru', review: 'Review', quoted: 'Sudah Kutip Harga', process: 'Dalam Proses', done: 'Selesai', cancel: 'Dibatalkan' };
	const statusClasses = { new: 'status-low', review: 'status-low', quoted: 'status-available', process: 'status-low', done: 'status-available', cancel: 'status-empty' };

	function loadOrders() {
		try {
			const saved = localStorage.getItem(storageKey);
			return saved ? JSON.parse(saved) : fallbackOrders;
		} catch {
			return fallbackOrders;
		}
	}

	function saveOrders(orders) {
		localStorage.setItem(storageKey, JSON.stringify(orders));
	}

	const orders = loadOrders();
	const app = document.querySelector('#pesanan-app');
	if (!app) return;

	const byId = (id) => document.getElementById(id);
	const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[c]);

	function updateMetrics() {
		byId('pesanan-new').textContent = orders.filter((o) => o.status === 'new').length;
		byId('pesanan-process').textContent = orders.filter((o) => o.status === 'process').length;
		byId('pesanan-done').textContent = orders.filter((o) => o.status === 'done').length;
		byId('pesanan-total').textContent = orders.length;
	}

	function renderPesanan() {
		const search = byId('pesanan-search').value.trim().toLowerCase();
		const statusFilter = byId('pesanan-status').value;
		const filtered = orders.filter((o) => {
			const matchesSearch = `${o.customerName} ${o.productType} ${o.id}`.toLowerCase().includes(search);
			const matchesStatus = statusFilter === 'all' || o.status === statusFilter;
			return matchesSearch && matchesStatus;
		});
		byId('pesanan-body').innerHTML = filtered.length ? filtered.map((o) => `<tr><td><span class="transaction-id">${escapeHtml(o.id)}</span></td><td><strong>${escapeHtml(o.customerName)}</strong><small>${escapeHtml(o.whatsapp)}</small></td><td>${escapeHtml(o.productType)} × ${o.quantity}</td><td>${new Date(o.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</td><td><span class="status-tag ${statusClasses[o.status]}"><i></i>${statusLabels[o.status]}</span></td><td><button class="icon-button" data-pesanan-detail="${escapeHtml(o.id)}" aria-label="Detail pesanan ${escapeHtml(o.id)}">⋯</button></td></tr>`).join('') : '<tr><td colspan="6" class="empty-table">Tidak ada pesanan yang cocok.</td></tr>';
		updateMetrics();
	}

	function openDetail(orderId) {
		const order = orders.find((o) => o.id === orderId);
		if (!order) return;
		byId('pesanan-dialog-title').textContent = `Pesanan ${order.id}`;
		byId('pesanan-detail-content').innerHTML = `
			<div class="pesanan-info-grid">
				<div><label>Pelanggan</label><p>${escapeHtml(order.customerName)}</p></div>
				<div><label>WhatsApp</label><p>${escapeHtml(order.whatsapp)}</p></div>
				<div><label>Jenis Produk</label><p>${escapeHtml(order.productType)}</p></div>
				<div><label>Jumlah</label><p>${order.quantity} pcs</p></div>
				<div><label>Ukuran</label><p>${escapeHtml(order.sizeText || '-')}</p></div>
				<div><label>Warna</label><p>${escapeHtml(order.colorText || '-')}</p></div>
				<div><label>Tanggal Dibutuhkan</label><p>${order.neededBy || '-'}</p></div>
				<div><label>Anggaran</label><p>${order.budget ? 'Rp ' + order.budget.toLocaleString('id-ID') : '-'}</p></div>
			</div>
			<label>Deskripsi</label>
			<p class="pesanan-description">${escapeHtml(order.description)}</p>
			<label>Ubah Status</label>
			<select id="status-select">
				${Object.entries(statusLabels).map(([val, label]) => `<option value="${val}" ${order.status === val ? 'selected' : ''}>${label}</option>`).join('')}
			</select>
		`;
		byId('pesanan-dialog').showModal();
		byId('update-status').onclick = () => {
			const newStatus = byId('status-select').value;
			order.status = newStatus;
			saveOrders(orders);
			byId('pesanan-dialog').close();
			renderPesanan();
			toast(`Status pesanan ${order.id} diubah menjadi "${statusLabels[newStatus]}".`, 'success');
		};
	}

	function toast(message, type = 'success') {
		const element = byId('pesanan-toast');
		element.textContent = message;
		element.className = `toast-message is-visible toast-${type}`;
		window.clearTimeout(toast.timeout);
		toast.timeout = window.setTimeout(() => element.classList.remove('is-visible'), 3000);
	}

	app.addEventListener('click', (event) => {
		const detailBtn = event.target.closest('[data-pesanan-detail]');
		if (detailBtn) openDetail(detailBtn.dataset.pesananDetail);
	});

	byId('pesanan-search').addEventListener('input', renderPesanan);
	byId('pesanan-status').addEventListener('change', renderPesanan);
	byId('pesanan-dialog').querySelectorAll('[value="cancel"]').forEach((btn) => btn.addEventListener('click', () => byId('pesanan-dialog').close()));

	renderPesanan();
})();
