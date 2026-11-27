import { statSync } from 'node:fs';
import { toString as mdToString } from 'mdast-util-to-string';

const CJK_REGEX = /[\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff]/g;
const LATIN_WORD_REGEX = /[A-Za-z0-9]+(?:['’-][A-Za-z0-9]+)*/g;

function countImages(node) {
	if (!node || typeof node !== 'object') {
		return 0;
	}
	let total = node.type === 'image' ? 1 : 0;
	if (Array.isArray(node.children)) {
		for (const child of node.children) {
			total += countImages(child);
		}
	}
	return total;
}

export function remarkPostTime() {
	return (_tree, { history, data }) => {
		const stat = statSync(history[0]);
		const frontmatter = data.astro.frontmatter;
		if (frontmatter.date === undefined) {
			frontmatter.date = stat.birthtime;
		}
		if (frontmatter.lastmod === undefined) {
			frontmatter.lastmod = stat.mtime;
		}
	};
}

export function remarkReadingTime() {
	return (tree, { data }) => {
		const frontmatter = data.astro.frontmatter;
		if (frontmatter.readingTime === undefined) {
			const plain = mdToString(tree).replace(/https?:\/\/\S+/g, ' ');
			const cjkCount = (plain.match(CJK_REGEX) ?? []).length;
			const latinWords = (
				plain.replace(CJK_REGEX, ' ').match(LATIN_WORD_REGEX) ?? []
			).length;
			const imageCount = countImages(tree);
			const rawMinutes =
				cjkCount / 380 + latinWords / 200 + (imageCount * 4) / 60;
			const minutes = Math.max(1, Math.round(rawMinutes));
			frontmatter.readingTime = {
				text: `读完大约 ${minutes} 分钟`,
				time: Math.round(rawMinutes * 60 * 1000),
				words: cjkCount + latinWords,
				minutes,
			};
		}
	};
}
