import type { PostHideElements } from '~/content.config';

export type SiteBrandConfig =
	| {
			variant: 'icon';
			icon: string;
			widthClass: string;
			heightClass: string;
	  }
	| {
			variant: 'image';
			src: string;
			alt?: string;
			widthClass: string;
			heightClass: string;
	  }
	| {
			variant: 'text';
			widthClass?: string;
			heightClass?: string;
	  };

export const Site = 'https://revamped-astrozozo.netlify.app';
export const SiteLanguage = 'en';
export const SiteTitle = 'Revamped Astro Zozo';
export const SiteDescription = 'A polished Astro blog template with gallery, friends, and richer content surfaces.';
export const FooterDescription = 'A refreshed Astro theme starter.';
export const AdminName = 'Template Author';
export const PageSize = 12;
export const SiteBrand: SiteBrandConfig = {
	variant: 'image',
	src: '/sample/logo.svg',
	alt: 'Revamped Astro Zozo logo',
	widthClass: 'w-[11.5rem]',
	heightClass: 'h-[3.4rem]',
};

export const Socials: Record<string, Record<string, string>> = {
	xiaohongshu: { url: '' },
	x: { url: '' },
	weibo: { url: '' },
	bilibili: { url: '' },
	telegram: { url: '' },
	mail: { url: '' },
	rss: { url: '/rss.xml' },
};

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

export const Hide: HideElements[] = ['comments'];
