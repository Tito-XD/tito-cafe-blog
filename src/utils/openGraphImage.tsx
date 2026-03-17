/* @jsxRuntime automatic */
/** @jsxImportSource react */

import fs from 'node:fs';
import satori, { type SatoriOptions } from 'satori';
import sharp from 'sharp';
import { FooterDescription, Site, SiteDescription, SiteTitle } from '~/config';

const logoImage = `data:image/png;base64,${(
	await sharp('public/sample/logo.svg').png().toBuffer()
).toString('base64')}`;

const font = async () => {
	const fontPath = 'src/assets/LXGWWenKaiGBScreen.ttf';
	if (!fs.existsSync(fontPath)) {
		console.log('downloading a font for open graph, wait a minute');
		const remoteFont =
			'https://github.com/lxgw/LxgwWenKai-Screen/releases/latest/download/LXGWWenKaiGBScreen.ttf';
		const response = await fetch(remoteFont);
		if (!response.ok) {
			throw new Error(
				`can not download font from ${remoteFont} while generating open graph image`,
			);
		}
		fs.promises.writeFile(fontPath, new DataView(await response.arrayBuffer()));
	}
	return fs.promises.readFile(fontPath);
};

const options: SatoriOptions = {
	width: 1200,
	height: 630,
	fonts: [
		{
			name: 'LXGW WenKai GB Screen',
			data: await font(),
		},
	],
	tailwindConfig: {
		theme: {
			fontFamily: {
				sans: ['"LXGW WenKai GB Screen"'],
				serif: ['"LXGW WenKai GB Screen"'],
				mono: ['Menlo', 'Consolas'],
			},
		},
	},
	loadAdditionalAsset: async (languageCode, segment) => {
		if (languageCode === 'emoji') {
			try {
				const response = await fetch(
					`https://cdn.jsdelivr.net/gh/shuding/fluentui-emoji-unicode/assets/${segment}_color.svg`,
				);
				if (!response.ok) {
					return segment;
				}
				return `data:image/png;base64,${(
					await sharp(await response.arrayBuffer()).png().toBuffer()
				).toString('base64')}`;
			} catch {
				return segment;
			}
		}
		return segment;
	},
};

declare module 'react' {
	interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
		tw?: string;
	}
}

export async function siteOpenGraph() {
	const template = (
		<div tw="flex h-full w-full flex-col justify-between bg-[#f5f7fa] pb-4 pt-6 text-[#2d3436]">
			<div
				tw="mx-auto flex w-[85%] grow flex-col bg-white px-6 py-5"
				style={{ boxShadow: '0 0 20px 10px rgba(93, 169, 255, 0.12)' }}
			>
				<div tw="grow flex flex-col pl-4 mt-2">
					<img alt="logo" src={logoImage} tw="w-auto h-28" />
					<div tw="mt-6 grow flex flex-col items-center text-center">
						<p tw="text-8xl font-bold">{SiteTitle}</p>
						<p tw="mt-4 text-5xl text-[#5d8ecb] font-semibold">{SiteDescription}</p>
					</div>
				</div>
			</div>
			<div tw="mt-5 flex flex-col items-center text-xl">
				<div>{FooterDescription}</div>
				<div tw="text-[#7b8794]">{`Copyright ${new Date().getFullYear()} ${Site}`}</div>
			</div>
		</div>
	);
	return await sharp(Buffer.from(await satori(template, options))).png().toBuffer();
}

type Config = {
	title: string;
	description?: string;
	tags?: string[];
};

export async function postOpenGraph({ title, description, tags }: Config) {
	const template = (
		<div tw="flex h-full w-full flex-col justify-between bg-[#f5f7fa] pb-4 pt-6 text-[#2d3436]">
			<div
				tw="mx-auto flex w-[85%] grow flex-col bg-white px-6 py-5"
				style={{ boxShadow: '0 0 20px 10px rgba(93, 169, 255, 0.12)' }}
			>
				<div tw="flex justify-between items-start mt-2" style={{ columnGap: 24 }}>
					<img alt="logo" src={logoImage} tw="w-auto h-24" />
					<p tw="text-3xl text-[#5d8ecb] text-right">{SiteDescription}</p>
				</div>
				<div tw="grow flex flex-col pl-4 mt-8">
					<p tw="text-6xl font-bold">{title}</p>
					{description && <p tw="mt-5 text-4xl font-bold">{description}</p>}
					<div tw="mt-6 flex text-[#7b8794]">
						{tags?.map((tag) => (
							<p tw="text-xl mr-4" key={tag}>
								{tag}
							</p>
						))}
					</div>
				</div>
			</div>
			<div tw="mt-5 flex flex-col items-center text-xl">
				<div>{FooterDescription}</div>
				<div tw="text-[#7b8794]">{`Copyright ${new Date().getFullYear()} ${Site}`}</div>
			</div>
		</div>
	);
	return await sharp(Buffer.from(await satori(template, options))).png().toBuffer();
}

