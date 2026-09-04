// Retire the former Pokédex service worker on the blog origin.
// The standalone Pokémon site has a separate service worker on its own origin.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => {
	event.waitUntil(
		(async () => {
			const names = await caches.keys();
			await Promise.all(
				names
					.filter(
						(name) =>
							name.startsWith('workbox-precache-') ||
							[
								'pokeapi-artwork',
								'pokemon-30th-remote',
								'pokemon151-art-local',
								'pokemon-art-local',
								'pokemon30-art-local',
							].includes(name),
					)
					.map((name) => caches.delete(name)),
			);
			await self.clients.claim();
			await self.registration.unregister();
			for (const client of await self.clients.matchAll({ type: 'window' })) {
				const url = new URL(client.url);
				if (/^\/(151|1025|pokedex)(\/|\.html|$)/.test(url.pathname))
					await client.navigate(client.url);
			}
		})(),
	);
});
