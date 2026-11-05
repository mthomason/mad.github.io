/**
 * Analytics consent banner.
 *
 * Google Consent Mode v2 defaults to analytics_storage: denied (set inline in
 * each page's <head>). This file shows an Accept/Decline banner only to
 * visitors in the EEA, the UK, and Switzerland, and upgrades the consent to
 * granted when they accept. The choice is remembered in localStorage.
 */
(function () {
	var KEY = 'mad-analytics-consent';
	var stored = null;
	try {
		stored = window.localStorage.getItem(KEY);
	} catch (e) {}

	if (stored === 'granted' || stored === 'denied') {
		return;
	}

	// The timezone is an approximation, but it keeps the banner off every
	// other visitor's screen without a third-party geolocation service.
	var timezone = '';
	try {
		timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
	} catch (e) {}
	var consentRegions = /^(Europe\/(Amsterdam|Andorra|Athens|Belfast|Berlin|Bratislava|Brussels|Bucharest|Budapest|Busingen|Copenhagen|Dublin|Gibraltar|Guernsey|Helsinki|Isle_of_Man|Jersey|Lisbon|Ljubljana|London|Luxembourg|Madrid|Malta|Mariehamn|Monaco|Oslo|Paris|Prague|Riga|Rome|San_Marino|Sofia|Stockholm|Tallinn|Vaduz|Vatican|Vienna|Vilnius|Warsaw|Zagreb|Zurich)|Atlantic\/(Canary|Faroe|Madeira|Reykjavik)|Africa\/(Ceuta|Melilla)|Asia\/(Famagusta|Nicosia)|Arctic\/Longyearbyen)$/;
	if (!consentRegions.test(timezone)) {
		return;
	}

	function showBanner() {
		if (document.getElementById('analytics-consent')) {
			return;
		}

		var banner = document.createElement('div');
		banner.id = 'analytics-consent';
		banner.className = 'analytics-consent';
		banner.setAttribute('role', 'region');
		banner.setAttribute('aria-label', 'Analytics cookies');
		banner.innerHTML = '<p>This site uses Google Analytics to understand how the site is used. You can accept or decline analytics cookies.</p>' +
			'<div class="analytics-consent-actions">' +
			'<button type="button" data-consent="granted">Accept</button>' +
			'<button type="button" data-consent="denied">Decline</button>' +
			'</div>';
		document.body.appendChild(banner);

		banner.addEventListener('click', function (event) {
			var button = event.target.closest('[data-consent]');
			if (!button) {
				return;
			}
			var value = button.getAttribute('data-consent');
			try {
				window.localStorage.setItem(KEY, value);
			} catch (e) {}
			if (typeof window.gtag === 'function') {
				window.gtag('consent', 'update', { 'analytics_storage': value });
			}
			banner.hidden = true;
		});
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', showBanner);
	} else {
		showBanner();
	}
})();
