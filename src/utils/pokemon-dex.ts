import {
	ALL_PRIMARY_FILTER_KEYS,
	GENERATION_HOME_REGION,
	pokemonFormKindOptions,
	pokemonFormRegions,
	pokemonHomeRegions,
	pokemonTypeOptions,
	type PokemonPrimaryFilterKey,
	type PokemonSubGroupId,
} from '~/data/pokemon-filters';

export type PokemonSpecies = {
	id: number;
	nameEn: string;
	nameCn: string;
	nameJa: string;
	genusCn: string;
	slug: string;
	types: string[];
	typesCn: string[];
	weaknesses: string[];
	weaknessesCn: string[];
	generation: number;
	regionCn: string;
	isLegendary: boolean;
	isMythical: boolean;
	isParadox: boolean;
	isBaby: boolean;
	isPseudoLegendary: boolean;
	isUltraBeast: boolean;
	isFossil: boolean;
	isStarter: boolean;
	starterGen: number;
	evolutionStage: string;
	hasAltForms: boolean;
	hasRegionalForm: boolean;
	hasMega: boolean;
	hasGmax: boolean;
	hasTotem: boolean;
	defaultArtId: number;
	varieties: PokemonVariety[];
};

export type PokemonVariety = {
	formKey: string;
	artId: number;
	slug: string;
	nameCn: string;
	nameEn: string;
	formLabelCn: string;
	isRegional: boolean;
	isDefault: boolean;
	isMega: boolean;
	isGmax: boolean;
	isTotem: boolean;
	types: string[];
	typesCn: string[];
	weaknesses: string[];
	weaknessesCn: string[];
};

export function filterPokemonByRange(
	list: PokemonSpecies[],
	idMin: number,
	idMax: number,
): PokemonSpecies[] {
	return list.filter((p) => p.id >= idMin && p.id <= idMax);
}

export function sortChainsByMinId(chains: number[][]): number[][] {
	return [...chains].sort((a, b) => Math.min(...a) - Math.min(...b));
}

export function filterChainsForRange(
	chains: number[][],
	idMin: number,
	idMax: number,
): number[][] {
	const filtered = chains
		.map((chain) => chain.filter((id) => id >= idMin && id <= idMax))
		.filter((chain) => chain.length > 0);
	return sortChainsByMinId(filtered);
}

export type DexScope = 'national' | 'regional';

export type DexSubFilterOption = {
	filterKey: string;
	label: string;
};

export type DexSubFilterGroup = {
	id: PokemonSubGroupId;
	ariaLabel: string;
	showLabel: boolean;
	label?: string;
	parentKeys: PokemonPrimaryFilterKey[];
	options: DexSubFilterOption[];
};

export type DexFilterMeta = {
	scope: DexScope;
	pageRegionCn: string;
	primaryKeys: PokemonPrimaryFilterKey[];
	enabledPrimaries: PokemonPrimaryFilterKey[];
	subGroups: DexSubFilterGroup[];
};

export function getAvailableHomeRegions(list: PokemonSpecies[]): string[] {
	const found = new Set<string>();
	for (const species of list) {
		if (species.regionCn) found.add(species.regionCn);
	}
	return pokemonHomeRegions.filter((region) => found.has(region));
}

export function getAvailableFormRegions(list: PokemonSpecies[]): string[] {
	const found = new Set<string>();
	for (const species of list) {
		for (const variety of species.varieties) {
			if (variety.isRegional && variety.formLabelCn) {
				found.add(variety.formLabelCn);
			}
		}
	}
	return pokemonFormRegions.filter((region) => found.has(region));
}

export function getScopedFormRegions(
	list: PokemonSpecies[],
	pageRegionCn: string,
): string[] {
	if (!pokemonFormRegions.includes(pageRegionCn as (typeof pokemonFormRegions)[number])) {
		return [];
	}
	const hasNativeForm = list.some((species) =>
		species.varieties.some(
			(variety) => variety.isRegional && variety.formLabelCn === pageRegionCn,
		),
	);
	return hasNativeForm ? [pageRegionCn] : [];
}

export function speciesHasScopedRegionalForm(
	species: PokemonSpecies,
	pageRegionCn: string,
): boolean {
	if (!pageRegionCn) return species.hasRegionalForm;
	return species.varieties.some(
		(variety) => variety.isRegional && variety.formLabelCn === pageRegionCn,
	);
}

export function getAvailableFormKinds(list: PokemonSpecies[]): DexSubFilterOption[] {
	const found = new Set<string>();
	for (const species of list) {
		if (species.hasMega) found.add('mega');
		if (species.hasGmax) found.add('gmax');
		if (species.hasTotem) found.add('totem');
	}
	return pokemonFormKindOptions
		.filter((row) => found.has(row.key))
		.map((row) => ({ filterKey: `kind:${row.key}`, label: row.label }));
}

export function getAvailableTypes(list: PokemonSpecies[]): DexSubFilterOption[] {
	const found = new Set<string>();
	for (const species of list) {
		for (const typeName of species.types) found.add(typeName);
	}
	return pokemonTypeOptions
		.filter((row) => found.has(row.key))
		.map((row) => ({ filterKey: `type:${row.key}`, label: row.label }));
}

export function getAvailableStarterGens(list: PokemonSpecies[]): DexSubFilterOption[] {
	const gens = new Set<number>();
	for (const species of list) {
		if (species.isStarter && species.starterGen > 0) gens.add(species.starterGen);
	}
	return [...gens]
		.sort((a, b) => a - b)
		.map((gen) => {
			const label = GENERATION_HOME_REGION[gen] || String(gen);
			return { filterKey: `starter:${label}`, label };
		});
}

export function getEnabledPrimaries(
	list: PokemonSpecies[],
	scope: DexScope,
	pageRegionCn = '',
): PokemonPrimaryFilterKey[] {
	const keys: PokemonPrimaryFilterKey[] = [];
	if (list.some((s) => s.isLegendary)) keys.push('legendary');
	if (list.some((s) => s.isMythical)) keys.push('mythical');
	if (list.some((s) => s.isParadox)) keys.push('paradox');
	if (list.some((s) => s.isBaby)) keys.push('baby');
	if (list.some((s) => s.isPseudoLegendary)) keys.push('pseudo');
	if (list.some((s) => s.isUltraBeast)) keys.push('ultra');
	if (list.some((s) => s.isStarter)) keys.push('starter');
	if (list.some((s) => s.isFossil)) keys.push('fossil');
	if (list.some((s) => s.evolutionStage === 'basic')) keys.push('basic');
	if (list.some((s) => s.evolutionStage === 'final')) keys.push('final');
	if (list.some((s) => s.types.length === 1)) keys.push('monotype');
	if (list.some((s) => s.types.length === 2)) keys.push('dualtype');
	if (getAvailableTypes(list).length > 0) keys.push('type');
	if (list.some((s) => s.hasAltForms)) keys.push('forms');
	if (scope === 'national') {
		if (list.some((s) => s.hasRegionalForm)) keys.push('regional');
	} else if (getScopedFormRegions(list, pageRegionCn).length > 0) {
		keys.push('regional');
	}
	return keys;
}

function buildSubGroups(
	list: PokemonSpecies[],
	scope: DexScope,
	pageRegionCn: string,
): DexSubFilterGroup[] {
	const groups: DexSubFilterGroup[] = [];

	const homeRegions =
		scope === 'national' ? getAvailableHomeRegions(list) : [];
	if (homeRegions.length > 1) {
		groups.push({
			id: 'home',
			ariaLabel: '出身地区',
			showLabel: true,
			label: '出身',
			parentKeys: ['legendary', 'mythical', 'paradox'],
			options: homeRegions.map((region) => ({
				filterKey: `home:${region}`,
				label: region,
			})),
		});
	}

	const formRegions =
		scope === 'national'
			? getAvailableFormRegions(list)
			: getScopedFormRegions(list, pageRegionCn);
	if (formRegions.length > 0) {
		groups.push({
			id: 'formRegion',
			ariaLabel: '地区形态来源',
			showLabel: false,
			parentKeys: ['regional'],
			options: formRegions.map((region) => ({
				filterKey: `form:${region}`,
				label: region,
			})),
		});
	}

	const formKinds = getAvailableFormKinds(list);
	if (formKinds.length > 0) {
		groups.push({
			id: 'formKind',
			ariaLabel: '特殊形态种类',
			showLabel: false,
			parentKeys: ['forms'],
			options: formKinds,
		});
	}

	const starterGens = getAvailableStarterGens(list);
	if (starterGens.length > 0) {
		groups.push({
			id: 'starterGen',
			ariaLabel: '御三家世代',
			showLabel: true,
			label: '世代',
			parentKeys: ['starter'],
			options: starterGens,
		});
	}

	const types = getAvailableTypes(list);
	if (types.length > 0) {
		groups.push({
			id: 'element',
			ariaLabel: '属性',
			showLabel: false,
			parentKeys: ['type'],
			options: types,
		});
	}

	return groups;
}

export function buildDexFilterMeta(
	list: PokemonSpecies[],
	scope: DexScope,
	pageRegionCn = '',
): DexFilterMeta {
	return {
		scope,
		pageRegionCn: scope === 'regional' ? pageRegionCn : '',
		primaryKeys: [...ALL_PRIMARY_FILTER_KEYS],
		enabledPrimaries: getEnabledPrimaries(list, scope, pageRegionCn),
		subGroups: buildSubGroups(list, scope, pageRegionCn),
	};
}
