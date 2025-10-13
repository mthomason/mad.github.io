document.addEventListener('DOMContentLoaded', () => {

	function trackEvent(category, action, label) {
		if (typeof gtag === 'function') {
			gtag('event', action, {
				'event_category': category,
				'event_label': label
			});
		}
	}

	function setupLightbox() {
		const galleryItems = document.querySelectorAll('.gallery-item');
		const lightbox = document.getElementById('lightbox');

		if (!lightbox || galleryItems.length === 0) {
			return; // No gallery on this page
		}

		const lightboxItemContainer = document.querySelector('.lightbox-item-container');
		const closeBtn = document.querySelector('.lightbox-close');
		const prevBtn = document.querySelector('.lightbox-prev');
		const nextBtn = document.querySelector('.lightbox-next');
		let currentIndex = 0;

		function showItem(index) {
			const item = galleryItems[index];
			const type = item.getAttribute('data-type');
			const source = item.getAttribute('data-source');

			lightboxItemContainer.innerHTML = ''; // Clear previous item

			if (type === 'video') {
				const video = document.createElement('video');
				video.src = source;
				video.controls = true;
				video.autoplay = true;
				lightboxItemContainer.appendChild(video);
			} else if (type === 'image') {
				const image = document.createElement('img');
				image.src = source;
				lightboxItemContainer.appendChild(image);
			}
		}

		function openLightbox(index) {
			currentIndex = index;
			showItem(currentIndex);
			lightbox.classList.add('active');
		}

		function closeLightbox() {
			lightbox.classList.remove('active');
			lightboxItemContainer.innerHTML = ''; // Stop video playback etc.
		}

		function showNextItem() {
			currentIndex = (currentIndex + 1) % galleryItems.length;
			showItem(currentIndex);
		}

		function showPrevItem() {
			currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
			showItem(currentIndex);
		}

		galleryItems.forEach((item, index) => {
			item.addEventListener('click', () => {
				openLightbox(index);
			});
		});

		closeBtn.addEventListener('click', closeLightbox);
		lightbox.addEventListener('click', (e) => {
			if (e.target === lightbox) {
				closeLightbox();
			}
		});
		nextBtn.addEventListener('click', showNextItem);
		prevBtn.addEventListener('click', showPrevItem);

		document.addEventListener('keydown', (e) => {
			if (!lightbox.classList.contains('active')) return;
			if (e.key === 'ArrowRight') {
				showNextItem();
			} else if (e.key === 'ArrowLeft') {
				showPrevItem();
			} else if (e.key === 'Escape') {
				closeLightbox();
			}
		});
	}

	function updateAppStoreBadge() {
		const appStoreBadge = document.getElementById('app-store-badge');
		if (appStoreBadge && navigator.platform.indexOf('Mac') > -1) {
			appStoreBadge.src = 'img/app-store-badges/us/badge-download-on-the-mac-app-store.svg';
		}
	}

	function setupAnalytics() {
		// App Store Badge
		const appStoreLink = document.getElementById('app-store-link');
		if (appStoreLink) {
			appStoreLink.addEventListener('click', () => {
				trackEvent('App Store', 'Click', 'App Store Badge');
			});
		}

		// Navigation Links
		const navLinks = document.querySelectorAll('header nav a');
		navLinks.forEach(link => {
			link.addEventListener('click', () => {
				trackEvent('Navigation', 'Click', link.textContent);
			});
		});

		// Gallery Items
		const galleryItems = document.querySelectorAll('.gallery-item');
		galleryItems.forEach(item => {
			item.addEventListener('click', () => {
				const label = item.querySelector('p')?.textContent || 'Gallery Item';
				trackEvent('Gallery', 'Click', label);
			});
		});

		// Footer Links
		const footerLinks = document.querySelectorAll('footer nav a');
		footerLinks.forEach(link => {
			link.addEventListener('click', () => {
				trackEvent('Footer', 'Click', link.textContent);
			});
		});
	}

	setupLightbox();
	updateAppStoreBadge();
	setupAnalytics();
});