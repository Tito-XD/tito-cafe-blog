import { persistentAtom } from '@nanostores/persistent';

export const theme = persistentAtom<string>('theme', 'os-default');

/** Easter egg: use Pokémon 30th anniversary logo artwork on dex pages. */
export const pokemon30Art = persistentAtom<string>('pokemon-30th-art', '');
