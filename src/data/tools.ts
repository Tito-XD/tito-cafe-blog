export type ToolSubLink = {
	label: string;
	href: string;
};

export type ToolSection =
	| '独立站点与企划'
	| '站内写作与随记'
	| '桌面周边与小测验';

export type ToolLink = {
	title: string;
	href: string;
	description: string;
	tag?: string;
	externalHost?: string;
	featured?: boolean;
	section: ToolSection;
	subLinks?: ToolSubLink[];
};

export const tools: ToolLink[] = [
	{
		title: 'TitoDex',
		href: 'https://titodex.pages.dev',
		description: 'TitoDex App、网页图鉴与 1025 MV 拼贴。',
		tag: '宝可梦',
		externalHost: 'titodex.pages.dev ↗',
		featured: true,
		section: '独立站点与企划',
		subLinks: [
			{ label: '全国图鉴', href: 'https://titodex.pages.dev/pokedex' },
			{ label: '关都 151', href: 'https://titodex.pages.dev/151' },
			{ label: '1025 MV 拼贴', href: 'https://titodex.pages.dev/1025' },
		],
	},
	{
		title: 'CRT 显像工坊',
		href: 'https://crt.tito.cafe',
		description: 'CRT、录像带、旧印刷效果，裁成壁纸比例，本地处理导出 PNG。',
		tag: '图片',
		externalHost: 'crt.tito.cafe ↗',
		featured: true,
		section: '独立站点与企划',
	},
	{
		title: 'Markdown',
		href: '/markdown',
		description: '本地 Markdown 写作，导出 .md 或带素材的 .zip。',
		tag: '写作',
		featured: true,
		section: '站内写作与随记',
	},
	{
		title: 'Think',
		href: '/think',
		description: '本地优先的短文写作台，碎片与深夜随记。',
		tag: '笔记',
		featured: true,
		section: '站内写作与随记',
		subLinks: [{ label: '翻看写过的条目（Thinks）', href: '/thinks' }],
	},
	{
		title: 'Tito 光标',
		href: '/tito-cursor',
		description: '头头狼主题 Windows 鼠标指针下载与 SoftCursor 指引。',
		tag: '下载',
		section: '桌面周边与小测验',
	},
	{
		title: 'SBTI 人格测试',
		href: '/sbti',
		description: '人格类型小测验（复建页，仅供学习向）。',
		tag: '测验',
		section: '桌面周边与小测验',
	},
];
