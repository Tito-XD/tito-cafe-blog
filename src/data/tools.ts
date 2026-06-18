export type ToolLink = {
	title: string;
	href: string;
	description: string;
	tag?: string;
};

export const tools: ToolLink[] = [
	{
		title: '全国图鉴',
		href: '/pokedex',
		description: '全国图鉴速查，可按地区切换，支持传说/幻/形态筛选。',
		tag: '图鉴',
	},
	{
		title: '宝可梦 151 · 关都',
		href: '/151',
		description: '关都 151 只图鉴速查、属性弱点与中文名测验。',
		tag: '图鉴',
	},
	{
		title: 'Markdown',
		href: '/markdown',
		description: '本地 Markdown 写作，导出 .md 或带素材的 .zip。',
		tag: '写作',
	},
	{
		title: 'Think',
		href: '/think',
		description: '本地优先的短文写作台，碎片与深夜随记。',
		tag: '笔记',
	},
	{
		title: 'Thinks',
		href: '/thinks',
		description: '浏览与筛选 Think 里写下的条目。',
		tag: '笔记',
	},
	{
		title: 'Tito 光标',
		href: '/tito-cursor',
		description: '头头狼主题 Windows 鼠标指针下载与 SoftCursor 指引。',
		tag: '下载',
	},
	{
		title: 'SBTI 人格测试',
		href: '/sbti',
		description: '人格类型小测验（复建页，仅供学习向）。',
		tag: '测验',
	},
];
