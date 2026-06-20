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

export const pokemonTypeOptions = [
	{ key: 'normal', label: '一般' },
	{ key: 'fire', label: '火' },
	{ key: 'water', label: '水' },
	{ key: 'electric', label: '电' },
	{ key: 'grass', label: '草' },
	{ key: 'ice', label: '冰' },
	{ key: 'fighting', label: '格斗' },
	{ key: 'poison', label: '毒' },
	{ key: 'ground', label: '地' },
	{ key: 'flying', label: '飞' },
	{ key: 'psychic', label: '超能' },
	{ key: 'bug', label: '虫' },
	{ key: 'rock', label: '岩' },
	{ key: 'ghost', label: '幽灵' },
	{ key: 'dragon', label: '龙' },
	{ key: 'dark', label: '恶' },
	{ key: 'steel', label: '钢' },
	{ key: 'fairy', label: '妖' },
] as const;

export type PokemonTypeKey = (typeof pokemonTypeOptions)[number]['key'];

export const pokemonFormKindOptions = [
	{ key: 'mega', label: 'Mega' },
	{ key: 'gmax', label: '超极巨' },
	{ key: 'totem', label: '霸主' },
] as const;

export type PokemonFormKindKey = (typeof pokemonFormKindOptions)[number]['key'];

export const pokemonPrimaryFilters = [
	{ key: 'legendary', label: '传说', subGroup: 'home' },
	{ key: 'mythical', label: '幻', subGroup: 'home' },
	{ key: 'paradox', label: '悖谬·朱紫' },
	{ key: 'baby', label: '宝宝' },
	{ key: 'pseudo', label: '准神' },
	{ key: 'ultra', label: '究极异兽' },
	{ key: 'starter', label: '御三家', subGroup: 'starterGen' },
	{ key: 'fossil', label: '化石' },
	{ key: 'basic', label: '未进化' },
	{ key: 'final', label: '最终进化' },
	{ key: 'monotype', label: '单属性' },
	{ key: 'dualtype', label: '双属性' },
	{ key: 'type', label: '属性', subGroup: 'element' },
	{ key: 'forms', label: '形态', subGroup: 'formKind' },
	{ key: 'regional', label: '地区', subGroup: 'formRegion' },
] as const;

export type PokemonPrimaryFilterKey = (typeof pokemonPrimaryFilters)[number]['key'];

export type PokemonSubGroupId = 'home' | 'formRegion' | 'formKind' | 'starterGen' | 'element';

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

export const PSEUDO_LEGENDARY_IDS = new Set([
	149,
	248,
	373,
	376,
	445,
	635,
	706,
	784,
	887,
	998,
]);

export const ULTRA_BEAST_IDS = new Set([
	793,
	794,
	795,
	796,
	797,
	798,
	799,
	803,
	804,
	805,
	806,
]);

export const BABY_SPECIES_IDS = new Set([
	172,
	173,
	174,
	175,
	236,
	238,
	239,
	240,
	298,
	360,
	406,
	433,
	438,
	439,
	440,
	446,
	447,
	458,
]);

/** All species IDs in each generation's starter lines (含进化). */
export const STARTER_LINES_BY_GEN: Record<number, number[]> = {
	1: [1, 2, 3, 4, 5, 6, 7, 8, 9],
	2: [152, 153, 154, 155, 156, 157, 158, 159, 160],
	3: [252, 253, 254, 255, 256, 257, 258, 259, 260],
	4: [387, 388, 389, 390, 391, 392, 393, 394, 395],
	5: [495, 496, 497, 498, 499, 500, 501, 502, 503],
	6: [650, 651, 652, 653, 654, 655, 656, 657, 658],
	7: [722, 723, 724, 725, 726, 727, 728, 729, 730],
	8: [810, 811, 812, 813, 814, 815, 816, 817, 818],
	9: [906, 907, 908, 909, 910, 911, 912, 913, 914],
};

export const STARTER_SPECIES_IDS = new Set(
	Object.values(STARTER_LINES_BY_GEN).flat(),
);

export const FOSSIL_SPECIES_IDS = new Set([
	138,
	139,
	140,
	141,
	142,
	345,
	346,
	347,
	348,
	408,
	409,
	410,
	411,
	564,
	565,
	566,
	567,
	696,
	697,
	698,
	699,
	880,
	881,
	882,
	883,
]);

export const ALL_PRIMARY_FILTER_KEYS: PokemonPrimaryFilterKey[] =
	pokemonPrimaryFilters.map((row) => row.key);

export function starterGenForSpeciesId(id: number): number {
	for (const [gen, ids] of Object.entries(STARTER_LINES_BY_GEN)) {
		if (ids.includes(id)) return Number(gen);
	}
	return 0;
}
