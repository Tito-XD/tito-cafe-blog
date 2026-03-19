import type { PostHideElements } from '~/content.config';

export const Site = 'https://revamped-astrozozo.netlify.app';
export const SiteLanguage = 'en';
export const SiteTitle = 'Revamped Astro Zozo';
export const SiteDescription = 'A polished Astro blog template with gallery, friends, and richer content surfaces.';
export const FooterDescription = 'A refreshed Astro theme starter.';
export const AdminName = 'Template Author';
export const PageSize = 12;
export const SiteBrand = {
	variant: 'image' as const,
	src: '/sample/logo.svg',
	alt: 'Revamped Astro Zozo logo',
	widthClass: 'w-[11.5rem]',
	heightClass: 'h-[3.4rem]',
};

// socialPlatform => userName
// check components/Header.astro socialConfig for more info
export const Socials: Record<string, Record<string, string>> = {
	xiaohongshu: { url: '' },
	x: { url: '' },
	weibo: { url: '' },
	bilibili: { url: '' },
	telegram: { url: '' },
	mail: { url: '' },
	rss: { url: '/rss.xml' },
};

// doc: https://giscus.app
// comments are hidden by default in the template branch
export const GiscusConfig: Record<string, string> = {
	'data-repo': '',
	'data-repo-id': '',
	'data-category': '',
	'data-category-id': '',
	'data-mapping': 'title',
	'data-strict': '0',
	'data-reactions-enabled': '1',
	'data-emit-metadata': '0',
	'data-input-position': 'top',
	'data-lang': 'en',
	'data-loading': 'lazy',
	crossorigin: 'anonymous',
	async: '',
};

export type HideElements =
	| PostHideElements
	| 'logo'
	| 'search'
	| 'themeToggler'
	| 'siteDescription'
	| 'footerDescription';

// Always hide elements from site
export const Hide: HideElements[] = ['comments'];
