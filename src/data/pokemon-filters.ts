/** Home region labels (national dex generation / debut region). */
export const pokemonHomeRegions = [
	'关都',
	'城都',
	'丰缘',
	'神奥',
	'合众',
	'卡洛斯',
	'阿罗拉',
	'伽勒尔',
	'帕底亚',
] as const;

/** Regional form origin labels (form sub-filters under 地区). */
export const pokemonFormRegions = ['阿罗拉', '伽勒尔', '洗翠', '帕底亚'] as const;

export const pokemonPrimaryFilters = [
	{ key: 'legendary', label: '传说' },
	{ key: 'mythical', label: '幻' },
	{ key: 'forms', label: '形态' },
	{ key: 'regional', label: '地区' },
	{ key: 'paradox', label: '悖谬' },
] as const;

export type PokemonPrimaryFilterKey = (typeof pokemonPrimaryFilters)[number]['key'];

export const GENERATION_HOME_REGION: Record<number, string> = {
	1: '关都',
	2: '城都',
	3: '丰缘',
	4: '神奥',
	5: '合众',
	6: '卡洛斯',
	7: '阿罗拉',
	8: '伽勒尔',
	9: '帕底亚',
};

/** National dex species IDs classified as paradox Pokémon (悖谬宝可梦). */
export const PARADOX_SPECIES_IDS = new Set([
	984,
	985,
	986,
	987,
	988,
	989,
	990,
	991,
	992,
	993,
	994,
	995,
	1005,
	1006,
	1009,
	1010,
	1020,
	1021,
	1022,
	1023,
]);
