import type { PostHideElements } from '~/content.config';

export const Site = 'https://tito.cafe';
export const SiteLanguage = 'zh';
export const SiteTitle = "头头咖啡屋 / Tito's Cafe";
export const SiteDescription = '记录日常，写一些想到的东西';
export const FooterDescription = 'make 21 grams interesting.';
export const AdminName = 'Tito_XD';
export const PageSize = 15;
export const FontConfig = {
	sansLatinFamily: 'Inter',
	sansLatinPath: '/fonts/Inter-Regular.woff2',
	sansCjkFamily: 'Noto Sans SC',
	sansCjkPath: '/fonts/NotoSansSC-Regular.otf',
};
export const OpenGraphConfig = {
	fontFamily: FontConfig.sansCjkFamily,
	fontPath: 'public/fonts/NotoSansSC-Regular.otf',
	background: '#f5f7fa',
	surface: '#ffffff',
	text: '#2d3436',
	muted: '#636e72',
	accent: '#4a90e2',
	shadow: 'rgba(93, 169, 255, 0.14)',
};
export const SiteBrand = {
	variant: 'icon' as const,
	icon: 'logo',
	widthClass: 'lg:w-[20rem]',
	heightClass: 'h-[4.5rem] lg:h-[6rem]',
};

// socialPlatform => userName
// check components/Header.astro socialConfig for more info
export const Socials: Record<string, Record<string, string>> = {
	xiaohongshu: {
		url: 'https://www.xiaohongshu.com/user/profile/606528a100000000010092d3',
	},
	x: { url: 'https://x.com/Tito_XD2333' },
	weibo: { url: 'https://weibo.com/u/2100498774' },
	bilibili: { url: 'https://space.bilibili.com/5895560' },
	telegram: { url: 'https://t.me/@tito_xd' },
	mail: { url: 'mailto:titow.xd@outlook.com' },
	rss: { url: '/rss.xml' },
};

// doc: https://giscus.app
// data-theme is auto changed between noborder_light / noborder_gray
export const GiscusConfig: Record<string, string> = {
	'data-repo': 'Tito-XD/tito-cafe-blog',
	'data-repo-id': 'R_kgDONhjiGA',
	'data-category': 'Announcements',
	'data-category-id': 'DIC_kwDONhjiGM4ClevO',
	'data-mapping': 'title',
	'data-strict': '0',
	'data-reactions-enabled': '1',
	'data-emit-metadata': '0',
	'data-input-position': 'top',
	'data-lang': 'zh-CN',
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
export const Hide: HideElements[] = [];
