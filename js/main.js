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
		let lastFocused = null;

		function itemLabel(item) {
			const caption = item.querySelector('p');
			return caption ? caption.textContent.trim() : 'Gallery item';
		}

		function showItem(index) {
			const item = galleryItems[index];
			const type = item.getAttribute('data-type');
			const source = item.getAttribute('data-source');
			const label = itemLabel(item);

			lightboxItemContainer.innerHTML = ''; // Clear previous item

			if (type === 'video') {
				const video = document.createElement('video');
				video.src = source;
				video.controls = true;
				video.autoplay = true;
				video.playsInline = true;
				video.setAttribute('aria-label', item.querySelector('img')?.alt || 'App preview video');
				lightboxItemContainer.appendChild(video);
			} else if (type === 'image') {
				const image = document.createElement('img');
				image.src = source;
				image.alt = item.querySelector('img')?.alt || label;
				lightboxItemContainer.appendChild(image);
			}
		}

		function openLightbox(index) {
			lastFocused = document.activeElement;
			currentIndex = index;
			showItem(currentIndex);
			lightbox.classList.add('active');
			closeBtn.focus();
		}

		function closeLightbox() {
			lightbox.classList.remove('active');
			lightboxItemContainer.innerHTML = ''; // Stop video playback etc.
			if (lastFocused && typeof lastFocused.focus === 'function') {
				lastFocused.focus();
			}
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
			item.setAttribute('role', 'button');
			item.setAttribute('tabindex', '0');
			item.setAttribute('aria-label', 'Open ' + itemLabel(item));

			item.addEventListener('click', () => {
				openLightbox(index);
			});

			item.addEventListener('keydown', (event) => {
				if (event.key === 'Enter' || event.key === ' ') {
					event.preventDefault();
					openLightbox(index);
				}
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
			} else if (e.key === 'Tab') {
				const focusable = [closeBtn, prevBtn, nextBtn];
				const current = focusable.indexOf(document.activeElement);
				const delta = e.shiftKey ? -1 : 1;
				focusable[(current + delta + focusable.length) % focusable.length].focus();
				e.preventDefault();
			}
		});
	}

	function setupAnalytics() {
		function isDocsLink(link) {
			return link.href.indexOf('docs.everydayapps.com') !== -1;
		}

		// Sponsor Link
		const sponsorLink = document.getElementById('sponsor-link');
		if (sponsorLink) {
			sponsorLink.addEventListener('click', () => {
				trackEvent('Sponsor', 'Click', 'Sponsor Link');
			});
		}

		// Links to the documentation site, wherever they appear
		document.querySelectorAll('a[href*="docs.everydayapps.com"]').forEach(link => {
			link.addEventListener('click', () => {
				trackEvent('Docs', 'Click', link.textContent.trim());
			});
		});

		// Hero Buttons
		document.querySelectorAll('.hero-buttons a').forEach(link => {
			link.addEventListener('click', () => {
				if (!isDocsLink(link)) {
					trackEvent('Hero', 'Click', link.textContent.trim());
				}
			});
		});

		// Navigation Links
		const navLinks = document.querySelectorAll('header nav a');
		navLinks.forEach(link => {
			link.addEventListener('click', () => {
				if (!isDocsLink(link)) {
					trackEvent('Navigation', 'Click', link.textContent.trim());
				}
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
				if (!isDocsLink(link)) {
					trackEvent('Footer', 'Click', link.textContent.trim());
				}
			});
		});
	}

	setupLightbox();
	setupAnalytics();
});
