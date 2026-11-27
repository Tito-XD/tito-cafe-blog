import type { PostEntry } from './collection';

const CJK_REGEX = /[\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff]/g;
const LATIN_WORD_REGEX = /[A-Za-z0-9]+(?:['’-][A-Za-z0-9]+)*/g;
const IMAGE_REGEX = /!\[[^\]]*\]\([^)]+\)|<img\b[^>]*>/gi;

export function estimateReadingStats(rawMarkdown = '') {
	const imageMatches = rawMarkdown.match(IMAGE_REGEX);
	const imageCount = imageMatches ? imageMatches.length : 0;

	const cleaned = rawMarkdown
		.replace(/```[\s\S]*?```/g, ' ')
		.replace(/~~~[\s\S]*?~~~/g, ' ')
		.replace(IMAGE_REGEX, ' ')
		.replace(/\[([^\]]*)\]\([^)]+\)/g, '$1')
		.replace(/<[^>]+>/g, ' ')
		.replace(/https?:\/\/\S+/g, ' ')
		.replace(/[#>*_~`|\\-]/g, ' ');

	const cjkCount = (cleaned.match(CJK_REGEX) ?? []).length;
	const withoutCjk = cleaned.replace(CJK_REGEX, ' ');
	const latinWords = (withoutCjk.match(LATIN_WORD_REGEX) ?? []).length;

	const rawMinutes = cjkCount / 380 + latinWords / 200 + (imageCount * 4) / 60;
	const minutes = Math.max(1, Math.round(rawMinutes));
	const words = cjkCount + latinWords;

	return {
		words,
		minutes,
		time: Math.round(rawMinutes * 60 * 1000),
		text: `读完大约 ${minutes} 分钟`,
	};
}

export function getPostMinutes(post: PostEntry) {
	if (post.data.readingTime?.minutes) {
		return Math.max(1, Math.round(post.data.readingTime.minutes));
	}
	return estimateReadingStats(post.body ?? '').minutes;
}

export function isAnnualPost(post: PostEntry) {
	if (/^(REWIND|ONWARD)\b/i.test(post.data.title)) {
		return true;
	}
	return Boolean(
		post.data.tags?.some((tag) =>
			['年终总结', '新年伊始', 'REWIND', 'ONWARD'].includes(tag),
		),
	);
}

export function getDisplayTags(tags?: string[]) {
	if (!tags) {
		return [];
	}
	return tags.filter(
		(tag) =>
			!/^\d{4}年?$/.test(tag) &&
			tag !== 'REWIND' &&
			tag !== 'ONWARD' &&
			tag !== 'hidden' &&
			tag !== 'sample post',
	);
}

export function formatDotDate(date?: Date) {
	if (!date) {
		return '';
	}
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');
	return `${year}.${month}.${day}`;
}
