import type { PostHideElements } from '~/content.config';

export const Site = 'https://tito.cafe';
export const SiteLanguage = 'zh-CN';
export const SiteTitle = "头头咖啡屋 / Tito's Cafe";
export const SiteDescription = '记录日常，写一些想到的东西';
export const FooterDescription = 'make 21 grams interesting.';
export const AdminName = 'Tito_XD';
export const PageSize = 15;

export const FontConfig = {
	latinFamily: 'Allo',
	latinPath: '/fonts/AlloVariable.woff2',
	cjkSerifFamily: 'LXGW Neo ZhiSong',
	cjkSerifCssPath: '/fonts/lxgw-neo-zhisong/font.css',
	sansLatinFamily: 'Inter',
	sansLatinPath: '/fonts/Inter-Regular.woff2',
	sansCjkFamily: 'Noto Sans SC',
	sansCjkPath: '/fonts/NotoSansSC-Regular.otf',
	brandEnFamily: 'Tito Brand En',
	brandEnPath: '/fonts/tito-brand-en.woff',
	brandZhFamily: 'Tito Brand Zh',
	brandZhPath: '/fonts/tito-brand-zh.woff',
};

export const OpenGraphConfig = {
	fontFamily: FontConfig.sansCjkFamily,
	fontPath: 'public/fonts/NotoSansSC-Regular.otf',
	background: '#f4f6fa',
	surface: '#ffffff',
	text: '#1f2630',
	muted: '#596270',
	accent: '#2a63b6',
	shadow: 'rgba(31, 38, 48, 0.10)',
};

export const SiteBrand = {
	variant: 'wordmark' as 'wordmark' | 'icon' | 'text',
	enText: "Tito's Cafe",
	zhText: '头头咖啡屋',
	icon: 'logo',
	widthClass: 'w-auto',
	heightClass: 'h-auto',
};

// socialPlatform => userName
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
