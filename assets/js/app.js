/*
 * app.js — renders the page from the data in projects.js and wires up behaviour:
 *   - lazy YouTube facades (thumbnail + play button -> iframe on click)
 *   - lazy WebGL demos (placeholder -> live canvas on click)
 *   - tag filtering, reveal-on-scroll, smooth scrolling, mobile nav
 */
(function () {
	'use strict';

	var $ = function (sel, root) { return (root || document).querySelector(sel); };
	var el = function (tag, cls) { var e = document.createElement(tag); if (cls) e.className = cls; return e; };

	/* ------------------------------------------------------------------ *
	 * Media renderers
	 * ------------------------------------------------------------------ */

	// Registry of loaded YouTube iframes so we can pause one when another starts.
	// Uses the YouTube iframe JS API over postMessage (no extra script needed),
	// which pauses without reloading — the video keeps its position.
	var ytPlayers = [];
	function pauseOtherVideos(except) {
		ytPlayers.forEach(function (frame) {
			if (frame === except || !frame.contentWindow) return;
			frame.contentWindow.postMessage(
				'{"event":"command","func":"pauseVideo","args":""}', '*');
		});
	}

	// Catch plays triggered by YouTube's own controls too: whenever any player
	// reports it started playing, pause every other one.
	window.addEventListener('message', function (e) {
		if (typeof e.data !== 'string' || e.origin.indexOf('youtube.com') === -1) return;
		var data;
		try { data = JSON.parse(e.data); } catch (err) { return; }
		if (data.event !== 'onStateChange' && data.event !== 'infoDelivery') return;
		var state = (data.info && typeof data.info === 'object') ? data.info.playerState : data.info;
		if (state !== 1 /* YT.PlayerState.PLAYING */) return;
		var source = null;
		ytPlayers.forEach(function (f) { if (f.contentWindow === e.source) source = f; });
		pauseOtherVideos(source);
	});

	// Lazy YouTube facade — exactly the pattern you described, hardened a bit.
	function youtubeFacade(id) {
		var wrap = el('div', 'media video-preview');
		wrap.dataset.id = id;
		wrap.setAttribute('role', 'button');
		wrap.setAttribute('tabindex', '0');
		wrap.setAttribute('aria-label', 'Play video');

		var img = el('img', 'video-preview__thumb');
		// hqdefault is reliably available for every video; loads lazily.
		img.src = 'https://i.ytimg.com/vi/' + id + '/hqdefault.jpg';
		img.loading = 'lazy';
		img.alt = 'Video thumbnail';
		img.width = 480; img.height = 360;

		var btn = el('button', 'video-preview__play');
		btn.type = 'button';
		btn.setAttribute('aria-label', 'Play video');
		btn.innerHTML = '<svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true"><path d="M8 5v14l11-7z" fill="currentColor"/></svg>';

		wrap.appendChild(img);
		wrap.appendChild(btn);

		function play() {
			// Already loaded? Just make sure it's the only one playing and resume it.
			if (wrap.dataset.loaded) {
				var existing = wrap.querySelector('iframe');
				pauseOtherVideos(existing);
				if (existing && existing.contentWindow) {
					existing.contentWindow.postMessage(
						'{"event":"command","func":"playVideo","args":""}', '*');
				}
				return;
			}
			wrap.dataset.loaded = '1';
			// Stop whatever is currently playing before this one starts.
			pauseOtherVideos(null);

			var iframe = el('iframe');
			iframe.width = '480'; iframe.height = '360';
			// enablejsapi=1 lets us pause/play via postMessage; origin must match the host.
			iframe.src = 'https://www.youtube.com/embed/' + id +
				'?autoplay=1&rel=0&modestbranding=1&enablejsapi=1&playsinline=1' +
				'&origin=' + encodeURIComponent(location.origin);
			iframe.title = 'YouTube video player';
			iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
			iframe.allowFullscreen = true;
			// Subscribe to this player's state events once it's ready.
			iframe.addEventListener('load', function () {
				if (iframe.contentWindow) {
					iframe.contentWindow.postMessage('{"event":"listening"}', '*');
				}
			});
			wrap.innerHTML = '';
			wrap.appendChild(iframe);
			ytPlayers.push(iframe);
		}
		wrap.addEventListener('click', play);
		wrap.addEventListener('keydown', function (e) {
			if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); play(); }
		});
		return wrap;
	}

	// Lazy WebGL demo — stays a cheap placeholder until clicked, then mounts.
	function webglFacade(demo) {
		var wrap = el('div', 'media webgl-preview');
		wrap.setAttribute('role', 'button');
		wrap.setAttribute('tabindex', '0');
		wrap.setAttribute('aria-label', 'Load interactive 3D demo');

		var hint = el('div', 'webgl-preview__overlay');
		hint.innerHTML =
			'<span class="webgl-preview__badge">WebGL</span>' +
			'<button type="button" class="video-preview__play" aria-label="Load demo">' +
			'<svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true"><path d="M8 5v14l11-7z" fill="currentColor"/></svg></button>' +
			'<p class="webgl-preview__label">Click to load · drag to rotate</p>';
		wrap.appendChild(hint);

		var instance = null;
		function load() {
			if (instance || !window.CubeDemo) return;
			wrap.innerHTML = '';
			wrap.classList.add('is-live');
			wrap.removeAttribute('role');
			wrap.removeAttribute('tabindex');
			instance = window.CubeDemo.mount(wrap);
		}
		wrap.addEventListener('click', load);
		wrap.addEventListener('keydown', function (e) {
			if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); load(); }
		});
		return wrap;
	}

	var imageLightbox = null;
	function normalizeMediaPath(path) {
		if (!path) return path;
		if (/^(https?:)?\/\//i.test(path) || path.indexOf('data:') === 0) return path;
		return path.replace(/\\/g, '/');
	}

	function ensureImageLightbox() {
		if (imageLightbox) return imageLightbox;

		var overlay = el('div', 'image-lightbox');
		overlay.setAttribute('hidden', '');
		overlay.setAttribute('aria-hidden', 'true');

		var img = el('img', 'image-lightbox__img');
		img.alt = 'Expanded project image';
		overlay.appendChild(img);

		function close() {
			overlay.setAttribute('hidden', '');
			overlay.setAttribute('aria-hidden', 'true');
			document.body.classList.remove('has-lightbox-open');
		}

		overlay.addEventListener('click', close);
		document.addEventListener('keydown', function (e) {
			if (e.key === 'Escape' && !overlay.hasAttribute('hidden')) close();
		});

		document.body.appendChild(overlay);

		imageLightbox = {
			overlay: overlay,
			img: img,
			open: function (src, alt) {
				img.src = src;
				img.alt = alt || 'Expanded project image';
				overlay.removeAttribute('hidden');
				overlay.setAttribute('aria-hidden', 'false');
				document.body.classList.add('has-lightbox-open');
			}
		};

		return imageLightbox;
	}

	function imageMedia(src, href) {
		var wrap = el('div', 'media image-media');
		wrap.setAttribute('role', 'button');
		wrap.setAttribute('tabindex', '0');
		wrap.setAttribute('aria-label', 'Open image preview');

		var img = el('img');
		var normalizedSrc = normalizeMediaPath(src);
		img.src = normalizedSrc;
		img.loading = 'lazy';
		img.alt = '';
		img.width = 480; img.height = 360;
		wrap.appendChild(img);

		var fullSrc = normalizeMediaPath(href || src);
		function openImage() {
			ensureImageLightbox().open(fullSrc, 'Expanded project image');
		}

		wrap.addEventListener('click', openImage);
		wrap.addEventListener('keydown', function (e) {
			if (e.key === 'Enter' || e.key === ' ') {
				e.preventDefault();
				openImage();
			}
		});

		return wrap;
	}

	function renderMedia(media) {
		if (!media) return el('div', 'media');
		switch (media.kind) {
			case 'youtube': return youtubeFacade(media.id);
			case 'webgl':   return webglFacade(media.demo);
			case 'image':   return imageMedia(media.src, media.href);
			default:        return el('div', 'media');
		}
	}

	/* ------------------------------------------------------------------ *
	 * Cards
	 * ------------------------------------------------------------------ */

	var STORE_BADGE = {
		play: 'https://sebastianostlund.github.io/images/Icon-Google-Play-Store.png',
		app: 'https://sebastianostlund.github.io/images/Icon-App-Store.png'
	};
	var STORE_LABEL = { play: 'Get it on Google Play', app: 'Download on the App Store' };

	function projectCard(p) {
		var card = el('article', 'card reveal' + (p.featured ? ' card--featured' : ''));
		card.dataset.tags = (p.tags || []).join('|').toLowerCase();

		card.appendChild(renderMedia(p.media));

		var body = el('div', 'card__body');

		var h3 = el('h3', 'card__title');
		h3.textContent = p.title;
		body.appendChild(h3);

		if (p.role) {
			var role = el('p', 'card__role');
			role.textContent = p.role;
			body.appendChild(role);
		}

		var desc = el('p', 'card__desc');
		desc.textContent = p.description;
		body.appendChild(desc);

		if (p.note) {
			var note = el('p', 'note');
			note.textContent = p.note;
			body.appendChild(note);
		}

		if (p.tags && p.tags.length) {
			var tags = el('ul', 'card__tags');
			p.tags.forEach(function (t) {
				var li = el('li', 'tag');
				li.textContent = t;
				tags.appendChild(li);
			});
			body.appendChild(tags);
		}

		if (p.links && p.links.length) {
			var links = el('div', 'card__links');
			p.links.forEach(function (lk) {
				var a = el('a', 'store-badge');
				a.href = lk.url; a.target = '_blank'; a.rel = 'noopener';
				var img = el('img');
				img.src = STORE_BADGE[lk.store]; img.alt = STORE_LABEL[lk.store];
				img.loading = 'lazy'; img.height = 40;
				a.appendChild(img);
				links.appendChild(a);
			});
			body.appendChild(links);
		}

		card.appendChild(body);
		return card;
	}

	/* ------------------------------------------------------------------ *
	 * Filters
	 * ------------------------------------------------------------------ */

	function buildFilters(projects) {
		var box = $('#filters');
		if (!box) return;
		var counts = {};
		projects.forEach(function (p) {
			(p.tags || []).forEach(function (t) { counts[t] = (counts[t] || 0) + 1; });
		});
		// Only show tags shared by more than one project, to keep it tidy.
		var tags = Object.keys(counts).filter(function (t) { return counts[t] > 1; }).sort();

		var all = makeFilterBtn('All', '', true);
		box.appendChild(all);
		tags.forEach(function (t) { box.appendChild(makeFilterBtn(t, t.toLowerCase(), false)); });

		box.addEventListener('click', function (e) {
			var btn = e.target.closest('.filter');
			if (!btn) return;
			box.querySelectorAll('.filter').forEach(function (b) { b.classList.remove('is-active'); });
			btn.classList.add('is-active');
			applyFilter(btn.dataset.tag);
		});
	}

	function makeFilterBtn(label, tag, active) {
		var b = el('button', 'filter' + (active ? ' is-active' : ''));
		b.type = 'button';
		b.dataset.tag = tag;
		b.textContent = label;
		return b;
	}

	function applyFilter(tag) {
		var cards = document.querySelectorAll('#project-grid .card');
		cards.forEach(function (c) {
			var match = !tag || (c.dataset.tags || '').split('|').indexOf(tag) !== -1;
			c.classList.toggle('is-hidden', !match);
		});
	}

	/* ------------------------------------------------------------------ *
	 * Interests + skills
	 * ------------------------------------------------------------------ */

	var ICONS = {
		code:   '<path d="M9 18l-6-6 6-6M15 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
		rocket: '<path d="M5 15c-1 1-1 4-1 4s3 0 4-1m6-12c3 0 5 2 5 5 0 4-4 8-8 10-2-2-4-4-6-6 2-4 6-8 10-8z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="14.5" cy="9.5" r="1.5" fill="currentColor"/>',
		plane:  '<path d="M2 12l20-8-8 20-2.5-7.5L2 12z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>',
		heart:  '<path d="M12 21s-7-4.5-9.5-9C1 8 3 5 6 5c2 0 3 1 4 2 1-1 2-2 4-2 3 0 5 3 3.5 7C19 16.5 12 21 12 21z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>'
	};

	/* ------------------------------------------------------------------ *
	 * Highlights slideshow
	 * ------------------------------------------------------------------ */

	function renderSlideshow() {
		var host = $('#slideshow');
		if (!host || !window.SLIDES || !window.SLIDES.length) return;
		var data = window.SLIDES;

		var viewport = el('div', 'slideshow__viewport');
		var slides = data.map(function (s, i) {
			var slide = el('article', 'slide' + (i === 0 ? ' is-active' : ''));
			slide.setAttribute('aria-roledescription', 'slide');
			slide.setAttribute('aria-label', (i + 1) + ' of ' + data.length);

			var media = el('div', 'slide__media');
			var img = el('img');
			img.src = 'assets/img/' + encodeURIComponent(s.file);
			img.alt = s.title;
			img.loading = i === 0 ? 'eager' : 'lazy';
			media.appendChild(img);

			var content = el('div', 'slide__content');
			var h3 = el('h3', 'slide__title'); h3.textContent = s.title;
			var p = el('p', 'slide__text'); p.textContent = s.text;
			content.appendChild(h3);
			content.appendChild(p);
			if (s.note) {
				var note = el('p', 'note');
				note.textContent = s.note;
				content.appendChild(note);
			}
			if (s.tags && s.tags.length) {
				var tags = el('ul', 'slide__tags');
				s.tags.forEach(function (t) {
					var li = el('li', 'tag'); li.textContent = t; tags.appendChild(li);
				});
				content.appendChild(tags);
			}

			slide.appendChild(media);
			slide.appendChild(content);
			viewport.appendChild(slide);
			return slide;
		});

		// Controls
		var prev = el('button', 'slideshow__nav slideshow__nav--prev');
		prev.type = 'button'; prev.setAttribute('aria-label', 'Previous slide'); prev.innerHTML = '‹';
		var next = el('button', 'slideshow__nav slideshow__nav--next');
		next.type = 'button'; next.setAttribute('aria-label', 'Next slide'); next.innerHTML = '›';

		var dotsWrap = el('div', 'slideshow__dots');
		var dots = data.map(function (s, i) {
			var d = el('button', 'slideshow__dot' + (i === 0 ? ' is-active' : ''));
			d.type = 'button';
			d.setAttribute('aria-label', 'Go to ' + s.title);
			d.addEventListener('click', function () { go(i); restart(); });
			dotsWrap.appendChild(d);
			return d;
		});

		host.appendChild(viewport);
		host.appendChild(prev);
		host.appendChild(next);
		host.appendChild(dotsWrap);

		var index = 0;
		function go(n) {
			slides[index].classList.remove('is-active');
			dots[index].classList.remove('is-active');
			index = (n + slides.length) % slides.length;
			slides[index].classList.add('is-active');
			dots[index].classList.add('is-active');
		}
		next.addEventListener('click', function () { go(index + 1); restart(); });
		prev.addEventListener('click', function () { go(index - 1); restart(); });

		// Autoplay, paused on hover/focus and while the section is off-screen.
		var timer = null, AUTOPLAY = 5500;
		function start() { if (!timer) timer = setInterval(function () { go(index + 1); }, AUTOPLAY); }
		function stop() { if (timer) { clearInterval(timer); timer = null; } }
		function restart() { stop(); start(); }
		host.addEventListener('mouseenter', stop);
		host.addEventListener('mouseleave', start);
		host.addEventListener('focusin', stop);
		host.addEventListener('focusout', start);

		// Keyboard arrows when the slideshow has focus.
		host.tabIndex = 0;
		host.addEventListener('keydown', function (e) {
			if (e.key === 'ArrowLeft') { go(index - 1); restart(); }
			else if (e.key === 'ArrowRight') { go(index + 1); restart(); }
		});

		// Touch / pointer swipe.
		var startX = null;
		host.addEventListener('pointerdown', function (e) { startX = e.clientX; });
		host.addEventListener('pointerup', function (e) {
			if (startX === null) return;
			var dx = e.clientX - startX;
			if (Math.abs(dx) > 40) { go(index + (dx < 0 ? 1 : -1)); restart(); }
			startX = null;
		});

		// Only autoplay while visible.
		if ('IntersectionObserver' in window) {
			new IntersectionObserver(function (entries) {
				entries.forEach(function (en) { en.isIntersecting ? start() : stop(); });
			}, { threshold: 0.2 }).observe(host);
		} else {
			start();
		}
	}

	function renderInterests() {
		var box = $('#interests-grid');
		if (!box || !window.INTERESTS) return;
		window.INTERESTS.forEach(function (it) {
			var card = el('article', 'interest reveal');
			var icon = el('span', 'interest__icon');
			icon.innerHTML = '<svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">' + (ICONS[it.icon] || '') + '</svg>';
			var h3 = el('h3'); h3.textContent = it.title;
			var p = el('p'); p.textContent = it.text;
			card.appendChild(icon); card.appendChild(h3); card.appendChild(p);
			box.appendChild(card);
		});
	}

	function renderSkills() {
		var box = $('#skills-grid');
		if (!box || !window.SKILLS) return;
		window.SKILLS.forEach(function (g) {
			var col = el('div', 'skills__col reveal');
			var h3 = el('h3'); h3.textContent = g.group;
			col.appendChild(h3);
			var list = el('ul', 'skills__list');
			g.items.forEach(function (s) {
				var li = el('li', 'tag tag--skill');
				li.textContent = s;
				list.appendChild(li);
			});
			col.appendChild(list);
			box.appendChild(col);
		});
	}

	/* ------------------------------------------------------------------ *
	 * Reveal on scroll
	 * ------------------------------------------------------------------ */

	function setupReveal() {
		var items = document.querySelectorAll('.reveal');
		if (!('IntersectionObserver' in window)) {
			items.forEach(function (i) { i.classList.add('is-visible'); });
			return;
		}
		var io = new IntersectionObserver(function (entries) {
			entries.forEach(function (entry) {
				if (entry.isIntersecting) {
					entry.target.classList.add('is-visible');
					io.unobserve(entry.target);
				}
			});
		}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
		items.forEach(function (i) { io.observe(i); });
	}

	/* ------------------------------------------------------------------ *
	 * Nav
	 * ------------------------------------------------------------------ */

	function setupNav() {
		var toggle = $('.nav__toggle');
		var links = $('#nav-links');
		var nav = $('.nav');
		if (toggle && links) {
			toggle.addEventListener('click', function () {
				var open = links.classList.toggle('is-open');
				toggle.setAttribute('aria-expanded', String(open));
			});
			links.addEventListener('click', function (e) {
				if (e.target.tagName === 'A') {
					links.classList.remove('is-open');
					toggle.setAttribute('aria-expanded', 'false');
				}
			});
		}
		if (nav) {
			var onScroll = function () { nav.classList.toggle('is-scrolled', window.scrollY > 12); };
			window.addEventListener('scroll', onScroll, { passive: true });
			onScroll();
		}
	}

	/* ------------------------------------------------------------------ *
	 * Boot
	 * ------------------------------------------------------------------ */

	function init() {
		var grid = $('#project-grid');
		if (grid && window.PROJECTS) {
			var frag = document.createDocumentFragment();
			window.PROJECTS.forEach(function (p) { frag.appendChild(projectCard(p)); });
			grid.appendChild(frag);
			buildFilters(window.PROJECTS);
		}
		renderSlideshow();
		renderInterests();
		renderSkills();
		setupNav();
		setupReveal();
		var yr = $('#year'); if (yr) yr.textContent = String(new Date().getFullYear());
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}
})();
