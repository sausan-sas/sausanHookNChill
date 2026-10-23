(() => {
	const toggle = document.querySelector('.menu-toggle');
	const navigation = document.querySelector('.primary-navigation');
	if (!toggle || !navigation) return;
	toggle.addEventListener('click', () => {
		const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
		toggle.setAttribute('aria-expanded', String(!isExpanded));
		navigation.classList.toggle('is-open', !isExpanded);
	});
})();