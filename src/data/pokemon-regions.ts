export type PokemonRegion = {
	slug: string;
	gen: number;
	regionCn: string;
	title: string;
	description: string;
	idMin: number;
	idMax: number;
	/** Dedicated legacy route with quiz (Gen 1 only). */
	legacyHref?: string;
};

export const pokemonNational = {
	slug: 'national',
	title: '全国图鉴',
	description: '全部宝可梦全国图鉴速查，可按世代地区切换。',
	href: '/pokedex',
};

export const pokemonRegions: PokemonRegion[] = [
	{
		slug: 'kanto',
		gen: 1,
		regionCn: '关都',
		title: '宝可梦 151 · 关都',
		description: '关都地区 151 只宝可梦图鉴速查与中文名测验。',
		idMin: 1,
		idMax: 151,
		legacyHref: '/151',
	},
	{
		slug: 'johto',
		gen: 2,
		regionCn: '城都',
		title: '城都地区图鉴',
		description: '城都地区新增宝可梦图鉴速查（全国编号 #152–#251）。',
		idMin: 152,
		idMax: 251,
	},
	{
		slug: 'hoenn',
		gen: 3,
		regionCn: '丰缘',
		title: '丰缘地区图鉴',
		description: '丰缘地区新增宝可梦图鉴速查（全国编号 #252–#386）。',
		idMin: 252,
		idMax: 386,
	},
	{
		slug: 'sinnoh',
		gen: 4,
		regionCn: '神奥',
		title: '神奥地区图鉴',
		description: '神奥地区新增宝可梦图鉴速查（全国编号 #387–#493）。',
		idMin: 387,
		idMax: 493,
	},
	{
		slug: 'unova',
		gen: 5,
		regionCn: '合众',
		title: '合众地区图鉴',
		description: '合众地区新增宝可梦图鉴速查（全国编号 #494–#649）。',
		idMin: 494,
		idMax: 649,
	},
	{
		slug: 'kalos',
		gen: 6,
		regionCn: '卡洛斯',
		title: '卡洛斯地区图鉴',
		description: '卡洛斯地区新增宝可梦图鉴速查（全国编号 #650–#721）。',
		idMin: 650,
		idMax: 721,
	},
	{
		slug: 'alola',
		gen: 7,
		regionCn: '阿罗拉',
		title: '阿罗拉地区图鉴',
		description: '阿罗拉地区新增宝可梦图鉴速查（全国编号 #722–#809）。',
		idMin: 722,
		idMax: 809,
	},
	{
		slug: 'galar',
		gen: 8,
		regionCn: '伽勒尔',
		title: '伽勒尔地区图鉴',
		description: '伽勒尔地区新增宝可梦图鉴速查（全国编号 #810–#905）。',
		idMin: 810,
		idMax: 905,
	},
	{
		slug: 'paldea',
		gen: 9,
		regionCn: '帕底亚',
		title: '帕底亚地区图鉴',
		description: '帕底亚地区新增宝可梦图鉴速查（全国编号 #906–#1025）。',
		idMin: 906,
		idMax: 1025,
	},
];

export function findPokemonRegion(slug: string) {
	return pokemonRegions.find((r) => r.slug === slug);
}
