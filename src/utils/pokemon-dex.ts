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

export function getEnabledPrimaries(list: PokemonSpecies[]): PokemonPrimaryFilterKey[] {
	const keys: PokemonPrimaryFilterKey[] = [];
	if (list.some((species) => species.isLegendary)) keys.push('legendary');
	if (list.some((species) => species.isMythical)) keys.push('mythical');
	if (list.some((species) => species.isParadox)) keys.push('paradox');
	if (list.some((species) => species.hasAltForms)) keys.push('forms');
	if (list.some((species) => species.hasRegionalForm)) keys.push('regional');
	return keys;
}

export function buildDexFilterMeta(
	list: PokemonSpecies[],
	scope: DexScope,
): DexFilterMeta {
	const availableHomeRegions = getAvailableHomeRegions(list);
	const availableFormRegions = getAvailableFormRegions(list);
	let enabledPrimaries = getEnabledPrimaries(list);

	if (scope === 'regional' && availableFormRegions.length === 0) {
		enabledPrimaries = enabledPrimaries.filter((key) => key !== 'regional');
	}

	return {
		scope,
		showHomeSubfilters: scope === 'national' && availableHomeRegions.length > 1,
		availableHomeRegions,
		availableFormRegions,
		enabledPrimaries,
	};
}
