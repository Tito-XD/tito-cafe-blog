import type { ImageMetadata } from 'astro';

import titoCafeManager from '~/assets/tito_xd-cafe-manager-by-frankuwu.png';
import titoCoffeeMaster from '~/assets/tito_xd-coffee-master-by-frankuwu.png';
import titoWalk from '~/assets/tito_xd-walk-by-frankuwu.png';
import together1000 from '~/content/attachments/1000-days/together-1000-days-revamped.png';
import shanghaiView from '~/content/attachments/REWIND-2024/shanghai-2024.png';
import viewWindow from '~/content/attachments/REWIND-2025/10.4_view.png';
import togetherMay from '~/content/attachments/REWIND-2025/25.05.01-together.jpg';
import combinationByKompass from '~/content/attachments/REWIND-2025/combination_by_kompass.png';
import happyFour from '~/content/attachments/REWIND-2025/happy_four.jpg';
import highschoolByTuosi from '~/content/attachments/REWIND-2025/highschool_by_tuosi.jpg';
import rainyNightWalk from '~/content/attachments/REWIND-2025/rainy-night-walk.jpeg';

export type GalleryCategorySlug = 'illustration' | 'life' | 'view';

export interface GalleryCategory {
	slug: GalleryCategorySlug;
	title: string;
	subtitle: string;
	description: string;
}

export interface GalleryFocusCharacter {
	id: string;
	name: string;
	role: string;
	note: string;
	portrait: ImageMetadata;
	x: number;
	y: number;
	width: number;
	height: number;
	accent: string;
}

export interface GalleryItem {
	slug: string;
	category: GalleryCategorySlug;
	title: string;
	alt: string;
	image: ImageMetadata;
	eyebrow: string;
	summary: string;
	notes: string[];
	credit?: string;
	location?: string;
	year?: string;
	focusCharacters?: GalleryFocusCharacter[];
}

export const galleryCategories: GalleryCategory[] = [
	{
		slug: 'illustration',
		title: 'Illustration',
		subtitle: '委托插图',
		description: '收录委托图、OC 组合图，以及需要单独展示角色焦点的作品。',
	},
	{
		slug: 'life',
		title: 'Life',
		subtitle: '生活照片',
		description: '记录日常里值得留下来的小片段，适合搭配当时的故事和心情。',
	},
	{
		slug: 'view',
		title: 'View',
		subtitle: '风景',
		description: '路上看到的光、城市、天气，或者某些让人停下来的画面。',
	},
];

export const galleryItems: GalleryItem[] = [
	{
		slug: 'oc-ensemble-demo',
		category: 'illustration',
		title: 'OC Ensemble Demo',
		alt: 'A commissioned ensemble illustration used to demo character highlighting.',
		image: titoCafeManager,
		eyebrow: 'Illustration / Character Focus',
		summary: '用于验证角色高亮交互的组合图示例，支持 hover 和 click 联动查看。',
		credit: 'Art demo with existing local assets',
		year: '2026',
		notes: [
			'这个条目主要用来验证 /gallery 的插图查看页结构，所以先拿仓库现有素材搭了一个可预览的 demo。',
			'右侧 notes、角色列表和高亮区域都已经预留好，之后直接替换成真实委托图和角色信息就可以继续用。',
		],
		focusCharacters: [
			{
				id: 'character-01',
				name: 'Character 01',
				role: 'Front bar',
				note: '用于演示 hover 和 click 之后的局部高亮效果。',
				portrait: titoCoffeeMaster,
				x: 9,
				y: 17,
				width: 18,
				height: 56,
				accent: '#f59e0b',
			},
			{
				id: 'character-02',
				name: 'Character 02',
				role: 'Center lead',
				note: '位于画面中间的角色，用来测试点击后保持选中状态。',
				portrait: titoWalk,
				x: 27,
				y: 12,
				width: 16,
				height: 60,
				accent: '#fb7185',
			},
			{
				id: 'character-03',
				name: 'Character 03',
				role: 'Calm support',
				note: '用于演示多人组合图里不同区域之间的切换体验。',
				portrait: combinationByKompass,
				x: 43,
				y: 16,
				width: 15,
				height: 57,
				accent: '#38bdf8',
			},
			{
				id: 'character-04',
				name: 'Character 04',
				role: 'Backlight',
				note: '适合后续填写角色设定、服装说明或委托备注。',
				portrait: highschoolByTuosi,
				x: 58,
				y: 14,
				width: 14,
				height: 58,
				accent: '#34d399',
			},
			{
				id: 'character-05',
				name: 'Character 05',
				role: 'Anchor',
				note: '目前是占位角色，之后可以替换成真实角色名称和立绘。',
				portrait: titoCafeManager,
				x: 72,
				y: 18,
				width: 17,
				height: 54,
				accent: '#a78bfa',
			},
		],
	},
	{
		slug: 'coffee-master',
		category: 'illustration',
		title: 'Coffee Master',
		alt: 'An illustration portrait titled Coffee Master.',
		image: titoCoffeeMaster,
		eyebrow: 'Illustration / Commission',
		summary: '适合单张展示的角色插图，也可以在 notes 里补充委托背景和设定。',
		credit: 'Illustration by Frankuwu',
		year: '2025',
		notes: [
			'这类单图会直接进入普通查看页，不一定需要角色热点交互。',
			'如果之后某张图也需要拆分人物，只要在数据里补充 `focusCharacters` 就能复用同一套页面。',
		],
	},
	{
		slug: 'night-walk',
		category: 'illustration',
		title: 'Night Walk',
		alt: 'A walk-themed illustration.',
		image: titoWalk,
		eyebrow: 'Illustration / Personal Favorite',
		summary: '更偏氛围感的插图，适合记录某个特别喜欢的版本或当时的想法。',
		credit: 'Illustration by Frankuwu',
		year: '2025',
		notes: ['这类图片可以保持简单展示，不一定每张都要额外做复杂交互。'],
	},
	{
		slug: 'a-thousand-days',
		category: 'life',
		title: 'A Thousand Days',
		alt: 'A commemorative image about one thousand days together.',
		image: together1000,
		eyebrow: 'Life / Memory',
		summary: '适合写一段比较完整 notes 的纪念画面。',
		location: 'Archive memory',
		year: '2025',
		notes: [
			'这种页面更像一个小记事本，右侧 notes 很适合写时间、地点和当时记住的片段。',
			'notes 可以写得长一点，也可以只留下很短的一句。',
		],
	},
	{
		slug: 'may-together',
		category: 'life',
		title: 'May Together',
		alt: 'A casual photo together in May.',
		image: togetherMay,
		eyebrow: 'Life / Snapshot',
		summary: '日常照片更适合用轻一点的方式去写，不需要每张都非常正式。',
		location: 'May, with friends',
		year: '2025',
		notes: ['有些照片只是想留住一个瞬间，这种时候一小段 notes 就已经足够了。'],
	},
	{
		slug: 'happy-four',
		category: 'life',
		title: 'Happy Four',
		alt: 'A happy group photo.',
		image: happyFour,
		eyebrow: 'Life / Group',
		summary: '适合收纳和朋友有关的照片，也可以慢慢把故事补进来。',
		location: 'With friends',
		year: '2025',
		notes: ['以后如果相关照片越来越多，这里也可以自然长成一整面生活图片墙。'],
	},
	{
		slug: 'window-view',
		category: 'view',
		title: 'Window View',
		alt: 'A city or travel view seen through a window.',
		image: viewWindow,
		eyebrow: 'View / Passing Scene',
		summary: '适合放那些没有特定主题、但会让人记住片刻氛围的画面。',
		location: 'On the road',
		year: '2025',
		notes: ['View 更偏向路上看到的景象，适合顺手记下天气、光线和当下感受。'],
	},
	{
		slug: 'shanghai-light',
		category: 'view',
		title: 'Shanghai Light',
		alt: 'A Shanghai city view.',
		image: shanghaiView,
		eyebrow: 'View / City',
		summary: '城市和夜景图适合搭配很短的说明，就像一张视觉明信片。',
		location: 'Shanghai',
		year: '2024',
		notes: ['如果 View 页面内容越来越多，它也可以慢慢变成一份可持续扩展的观察笔记。'],
	},
	{
		slug: 'rainy-night',
		category: 'view',
		title: 'Rainy Night',
		alt: 'A rainy night street view.',
		image: rainyNightWalk,
		eyebrow: 'View / Night',
		summary: '夜晚街景、路灯和雨水反光，很适合放进 notes 比较安静的页面里。',
		location: 'Night walk',
		year: '2025',
		notes: ['右侧 notes 可以专门留给这些不太适合写成长文、但又很想记住的画面。'],
	},
];

export const getGalleryCategory = (slug: string) =>
	galleryCategories.find((category) => category.slug === slug);

export const getGalleryItemsByCategory = (slug: GalleryCategorySlug) =>
	galleryItems.filter((item) => item.category === slug);
