import type { ImageMetadata } from 'astro';

import frankAvatar from '~/assets/attachments/link/Frank_uwu/frank-avatar.png';
import frankBackground from '~/assets/attachments/link/Frank_uwu/frank-background.png';
import frankDrawingSticker from '~/assets/attachments/link/Frank_uwu/frank-drawing-sticker.png';
import frankNooooSticker from '~/assets/attachments/link/Frank_uwu/frank-noooo-sticker.png';
import frankNotDrawingSticker from '~/assets/attachments/link/Frank_uwu/frank-not-drawing-sticker.png';
import frankStanding from '~/assets/attachments/link/Frank_uwu/frank-standing.png';
import kayuAvatar from '~/assets/attachments/link/Kayu=Dog/kayu-avatar.png';
import kayuBackground from '~/assets/attachments/link/Kayu=Dog/kayu-background.png';
import kayuPhotoCornerSticker from '~/assets/attachments/link/Kayu=Dog/kayu-photo-corner-sticker.png';
import kayuStanding from '~/assets/attachments/link/Kayu=Dog/kayu-standing.png';
import kayuTailDrawSticker from '~/assets/attachments/link/Kayu=Dog/kayu-tail-draw-sticker.png';
import kayuYeahSticker from '~/assets/attachments/link/Kayu=Dog/kayu-yeah-sticker.png';
import oddTonBackground from '~/assets/attachments/link/ODD_TON/odd-ton-background.png';
import oddTonCatTransparent from '~/assets/attachments/link/ODD_TON/odd-ton-cat- transparent.png';
import oddTonGoSticker from '~/assets/attachments/link/ODD_TON/odd-ton-go-sticker.png';
import oddTonGuitarTransparent from '~/assets/attachments/link/ODD_TON/odd-ton-guitar- transparent.png';
import oddTonHeadSticker from '~/assets/attachments/link/ODD_TON/odd-ton-head-sticker.png';
import oddTonPlayGuitarTransparent from '~/assets/attachments/link/ODD_TON/odd-ton-play-guitar- transparent.png';
import oddTonStandingTransparent from '~/assets/attachments/link/ODD_TON/odd-ton-standing- transparent.png';
import tzDecadeAvatar from '~/assets/attachments/link/TZ_Decade/tz-decade-avatar.png';
import tzDecadeBackground from '~/assets/attachments/link/TZ_Decade/tz-decade-background.png';
import tzDecadeFlowersSticker from '~/assets/attachments/link/TZ_Decade/tz-decade-flowers-sticker.png';
import tzDecadeGamingSticker from '~/assets/attachments/link/TZ_Decade/tz-decade-gaming-sticker.png';
import tzDecadeStanding from '~/assets/attachments/link/TZ_Decade/tz-decade-standing.png';
import tzDecadeTigerbooSticker from '~/assets/attachments/link/TZ_Decade/tz-decade-tigerboo-sticker.png';
import titoAvatar from '~/assets/attachments/link/Tito_XD/tito-avatar.png';
import titoBackground from '~/assets/attachments/link/Tito_XD/tito-background.png';
import titoFlowersSticker from '~/assets/attachments/link/Tito_XD/tito-flowers-sticker.png';
import titoPalmSticker from '~/assets/attachments/link/Tito_XD/tito-palm-sticker.png';
import titoStanding from '~/assets/attachments/link/Tito_XD/tito-standing.png';
import titoStrikeSticker from '~/assets/attachments/link/Tito_XD/tito-strike-sticker.png';

export type LinkButton = {
	label: string;
	href?: string;
};

export type LinkSticker = {
	image: ImageMetadata;
	alt: string;
	x: number;
	y: number;
	width: number;
	rotate: number;
};

export type LinkResident = {
	id: 'Tito_XD' | 'TZ_Decade' | 'Frank_uwu' | 'Kayu=Dog' | 'ODD_TON';
	domain?: string;
	accent: string;
	secondaryAccent: string;
	portrait: ImageMetadata;
	background: ImageMetadata;
	avatar: ImageMetadata;
	portraitPosition: string;
	boardImage?: ImageMetadata;
	buttons: LinkButton[];
	stickers: LinkSticker[];
};

const placeholderButtons: LinkButton[] = [
	{ label: '小红书' },
	{ label: '微博' },
	{ label: 'X' },
];

export const linkResidents: LinkResident[] = [
	{
		id: 'Tito_XD',
		accent: '#5ec8ff',
		secondaryAccent: '#f5dd74',
		portrait: titoStanding,
		background: titoBackground,
		avatar: titoAvatar,
		portraitPosition: '52% 54%',
		buttons: [
			{ label: 'Current Site', href: '/' },
			{ label: 'Gallery', href: '/gallery' },
			{ label: 'About', href: '/about' },
			...placeholderButtons,
		],
		stickers: [
			{
				image: titoStrikeSticker,
				alt: 'Tito_XD strike sticker',
				x: 8,
				y: 8,
				width: 28,
				rotate: -9,
			},
			{
				image: titoFlowersSticker,
				alt: 'Tito_XD flowers sticker',
				x: 67,
				y: 7,
				width: 24,
				rotate: 8,
			},
			{
				image: titoPalmSticker,
				alt: 'Tito_XD palm sticker',
				x: 55,
				y: 55,
				width: 26,
				rotate: -4,
			},
			{
				image: titoAvatar,
				alt: 'Tito_XD avatar sticker',
				x: 12,
				y: 61,
				width: 18,
				rotate: 12,
			},
		],
	},
	{
		id: 'TZ_Decade',
		domain: 'tzdecade.link',
		accent: '#ffb44c',
		secondaryAccent: '#6fd6ff',
		portrait: tzDecadeStanding,
		background: tzDecadeBackground,
		avatar: tzDecadeAvatar,
		portraitPosition: '50% 55%',
		buttons: [
			{ label: 'Blog / Link', href: 'https://tzdecade.link' },
			...placeholderButtons,
		],
		stickers: [
			{
				image: tzDecadeGamingSticker,
				alt: 'TZ_Decade gaming sticker',
				x: 7,
				y: 8,
				width: 30,
				rotate: -7,
			},
			{
				image: tzDecadeTigerbooSticker,
				alt: 'TZ_Decade TigerBoo sticker',
				x: 64,
				y: 10,
				width: 24,
				rotate: 9,
			},
			{
				image: tzDecadeFlowersSticker,
				alt: 'TZ_Decade flowers sticker',
				x: 52,
				y: 55,
				width: 28,
				rotate: -8,
			},
			{
				image: tzDecadeAvatar,
				alt: 'TZ_Decade avatar sticker',
				x: 16,
				y: 62,
				width: 18,
				rotate: 10,
			},
		],
	},
	{
		id: 'Frank_uwu',
		domain: 'frankuwu.link',
		accent: '#87f0b5',
		secondaryAccent: '#ff8ec7',
		portrait: frankStanding,
		background: frankBackground,
		avatar: frankAvatar,
		portraitPosition: '50% 55%',
		buttons: [
			{ label: 'Blog / Link', href: 'https://frankuwu.link' },
			...placeholderButtons,
		],
		stickers: [
			{
				image: frankDrawingSticker,
				alt: 'Frank_uwu drawing sticker',
				x: 5,
				y: 9,
				width: 32,
				rotate: -6,
			},
			{
				image: frankNooooSticker,
				alt: 'Frank_uwu noooo sticker',
				x: 62,
				y: 6,
				width: 25,
				rotate: 9,
			},
			{
				image: frankNotDrawingSticker,
				alt: 'Frank_uwu not drawing sticker',
				x: 56,
				y: 56,
				width: 31,
				rotate: -8,
			},
			{
				image: frankAvatar,
				alt: 'Frank_uwu avatar sticker',
				x: 13,
				y: 64,
				width: 17,
				rotate: 12,
			},
		],
	},
	{
		id: 'Kayu=Dog',
		domain: 'kayufish.link',
		accent: '#f6d35c',
		secondaryAccent: '#86a8ff',
		portrait: kayuStanding,
		background: kayuBackground,
		avatar: kayuAvatar,
		portraitPosition: '51% 55%',
		buttons: [
			{ label: 'Blog / Link', href: 'https://kayufish.link' },
			...placeholderButtons,
		],
		stickers: [
			{
				image: kayuYeahSticker,
				alt: 'Kayu=Dog yeah sticker',
				x: 8,
				y: 6,
				width: 27,
				rotate: -8,
			},
			{
				image: kayuTailDrawSticker,
				alt: 'Kayu=Dog tail draw sticker',
				x: 63,
				y: 7,
				width: 27,
				rotate: 8,
			},
			{
				image: kayuPhotoCornerSticker,
				alt: 'Kayu=Dog photo corner sticker',
				x: 58,
				y: 55,
				width: 29,
				rotate: -6,
			},
			{
				image: kayuAvatar,
				alt: 'Kayu=Dog avatar sticker',
				x: 15,
				y: 63,
				width: 17,
				rotate: 10,
			},
		],
	},
	{
		id: 'ODD_TON',
		domain: 'oddton.link',
		accent: '#9ef06f',
		secondaryAccent: '#55d8ff',
		portrait: oddTonStandingTransparent,
		background: oddTonBackground,
		avatar: oddTonHeadSticker,
		portraitPosition: '53% 56%',
		boardImage: oddTonBackground,
		buttons: [
			{ label: 'Blog / Link', href: 'https://oddton.link' },
			...placeholderButtons,
		],
		stickers: [
			{
				image: oddTonGoSticker,
				alt: 'ODD_TON go sticker',
				x: 6,
				y: 8,
				width: 34,
				rotate: -7,
			},
			{
				image: oddTonGuitarTransparent,
				alt: 'ODD_TON guitar sticker',
				x: 64,
				y: 10,
				width: 24,
				rotate: 9,
			},
			{
				image: oddTonCatTransparent,
				alt: 'ODD_TON cat sticker',
				x: 56,
				y: 58,
				width: 24,
				rotate: -9,
			},
			{
				image: oddTonPlayGuitarTransparent,
				alt: 'ODD_TON play guitar sticker',
				x: 11,
				y: 55,
				width: 26,
				rotate: 8,
			},
		],
	},
];
