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
	isLegendary: boolean;
	isMythical: boolean;
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
