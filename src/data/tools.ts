export type ToolSubLink = {
	label: string;
	href: string;
};

export type ToolLink = {
	title: string;
	href: string;
	description: string;
	tag?: string;
	externalHost?: string;
	featured?: boolean;
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
	},
	{
		title: 'Markdown',
		href: '/markdown',
		description: '本地 Markdown 写作，导出 .md 或带素材的 .zip。',
		tag: '写作',
		featured: true,
	},
	{
		title: 'Think',
		href: '/think',
		description: '本地优先的短文写作台，随手记一点碎片。',
		tag: '笔记',
		featured: true,
		subLinks: [{ label: '翻看写过的条目（Thinks）', href: '/thinks' }],
	},
	{
		title: 'Tito 光标',
		href: '/tito-cursor',
		description: '头头狼主题 Windows 鼠标指针下载与 SoftCursor 指引。',
		tag: '下载',
	},
];
