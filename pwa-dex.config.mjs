/** PWA config for /151 + /pokedex (option B: dex-focused install). */

export const dexPwaManifest = {
	name: '宝可梦图鉴 · Tito',
	short_name: '图鉴',
	description: '关都 151 速查、全国图鉴与中文名测验，支持离线缓存。',
	start_url: '/151',
	scope: '/',
	display: 'standalone',
	lang: 'zh-CN',
	orientation: 'portrait-primary',
	theme_color: '#121417',
	background_color: '#121417',
	icons: [
		{
			src: '/pokedex-favicon-192.png',
			sizes: '192x192',
			type: 'image/png',
		},
		{
			src: '/pokedex-favicon-512.png',
			sizes: '512x512',
			type: 'image/png',
		},
		{
			src: '/pokedex-maskable-192.png',
			sizes: '192x192',
			type: 'image/png',
			purpose: 'maskable',
		},
		{
			src: '/pokedex-maskable-512.png',
			sizes: '512x512',
			type: 'image/png',
			purpose: 'maskable',
		},
	],
};

export const dexPwaWorkbox = {
	navigateFallback: '/151.html',
	navigateFallbackDenylist: [/^\/pagefind\//, /^\/rss\.xml/, /^\/og\.png/],
	globPatterns: ['**/*.{js,css,html,ico,svg,woff2,json}'],
	globIgnores: [
		'**/pokemon/**',
		'**/pokemon151/**',
		'**/pokemon30/**',
		'**/posts/**',
		'**/gallery/**',
		'**/sbti/**',
		'**/sbti.html',
		'**/think/**',
		'**/thinks/**',
	],
	runtimeCaching: [
		{
			urlPattern: /^https:\/\/raw\.githubusercontent\.com\/PokeAPI\/sprites\/.*/i,
			handler: 'CacheFirst',
			options: {
				cacheName: 'pokeapi-artwork',
				expiration: { maxEntries: 256, maxAgeSeconds: 60 * 60 * 24 * 30 },
				cacheableResponse: { statuses: [0, 200] },
			},
		},
		{
			urlPattern: /^https:\/\/www\.pokemon\.co\.jp\/ex\/30th_logo\/.*/i,
			handler: 'CacheFirst',
			options: {
				cacheName: 'pokemon-30th-remote',
				expiration: { maxEntries: 256, maxAgeSeconds: 60 * 60 * 24 * 30 },
				cacheableResponse: { statuses: [0, 200] },
			},
		},
		{
			urlPattern: /\/pokemon151\/artwork\/.*\.png$/i,
			handler: 'CacheFirst',
			options: {
				cacheName: 'pokemon151-art-local',
				expiration: { maxEntries: 200, maxAgeSeconds: 60 * 60 * 24 * 365 },
				cacheableResponse: { statuses: [0, 200] },
			},
		},
		{
			urlPattern: /\/pokemon\/artwork\/.*\.png$/i,
			handler: 'StaleWhileRevalidate',
			options: {
				cacheName: 'pokemon-art-local',
				expiration: { maxEntries: 512, maxAgeSeconds: 60 * 60 * 24 * 30 },
				cacheableResponse: { statuses: [0, 200] },
			},
		},
		{
			urlPattern: /\/pokemon30\/artwork\/.*\.png$/i,
			handler: 'StaleWhileRevalidate',
			options: {
				cacheName: 'pokemon30-art-local',
				expiration: { maxEntries: 256, maxAgeSeconds: 60 * 60 * 24 * 30 },
				cacheableResponse: { statuses: [0, 200] },
			},
		},
	],
};
