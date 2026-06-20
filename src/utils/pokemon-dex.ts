import type { PokemonPrimaryFilterKey } from '~/data/pokemon-filters';
import {
	pokemonFormRegions,
	pokemonHomeRegions,
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
	hasAltForms: boolean;
	hasRegionalForm: boolean;
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

export type DexFilterMeta = {
	scope: DexScope;
	/** Set on regional dex pages (e.g. 帕底亚); empty on national. */
	pageRegionCn: string;
	showHomeSubfilters: boolean;
	availableHomeRegions: string[];
	availableFormRegions: string[];
	enabledPrimaries: PokemonPrimaryFilterKey[];
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

/** Regional dex pages only catalogue forms native to that region label. */
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

export function getEnabledPrimaries(
	list: PokemonSpecies[],
	scope: DexScope,
	pageRegionCn = '',
): PokemonPrimaryFilterKey[] {
	const keys: PokemonPrimaryFilterKey[] = [];
	if (list.some((species) => species.isLegendary)) keys.push('legendary');
	if (list.some((species) => species.isMythical)) keys.push('mythical');
	if (list.some((species) => species.isParadox)) keys.push('paradox');
	if (list.some((species) => species.hasAltForms)) keys.push('forms');
	if (scope === 'national') {
		if (list.some((species) => species.hasRegionalForm)) keys.push('regional');
	} else if (getScopedFormRegions(list, pageRegionCn).length > 0) {
		keys.push('regional');
	}
	return keys;
}

export function buildDexFilterMeta(
	list: PokemonSpecies[],
	scope: DexScope,
	pageRegionCn = '',
): DexFilterMeta {
	const availableHomeRegions =
		scope === 'national' ? getAvailableHomeRegions(list) : [];
	const availableFormRegions =
		scope === 'national'
			? getAvailableFormRegions(list)
			: getScopedFormRegions(list, pageRegionCn);
	const enabledPrimaries = getEnabledPrimaries(list, scope, pageRegionCn);

	return {
		scope,
		pageRegionCn: scope === 'regional' ? pageRegionCn : '',
		showHomeSubfilters: scope === 'national' && availableHomeRegions.length > 1,
		availableHomeRegions,
		availableFormRegions,
		enabledPrimaries,
	};
}
