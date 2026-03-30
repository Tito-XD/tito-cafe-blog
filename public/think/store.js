const THINKS_KEY = 'tito-cafe-thinks.v1';
const THINK_DRAFT_KEY = 'tito-cafe-think-draft.v1';
const THINK_DRAFTS_KEY = 'tito-cafe-think-drafts.v1';
const THINK_EVENT = 'tito-cafe-thinks:changed';
const THINK_DRAFT_EVENT = 'tito-cafe-think-drafts:changed';

function safeParse(raw, fallback) {
	try {
		return raw ? JSON.parse(raw) : fallback;
	} catch {
		return fallback;
	}
}

function uniqueStrings(values) {
	const seen = new Set();
	const result = [];

	for (const value of values) {
		const trimmed = String(value ?? '').trim();
		if (!trimmed) continue;
		const key = trimmed.toLocaleLowerCase();
		if (seen.has(key)) continue;
		seen.add(key);
		result.push(trimmed);
	}

	return result;
}

function normalizeTags(tags) {
	if (Array.isArray(tags)) return uniqueStrings(tags);
	return uniqueStrings(String(tags ?? '').split(','));
}

function nowIso() {
	return new Date().toISOString();
}

function makeId() {
	if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID();
	return `think-${Date.now()}-${Math.random().toString(16).slice(2, 10)}`;
}

function normalizeEntry(entry) {
	const createdAt = entry.createdAt ?? nowIso();
	const updatedAt = entry.updatedAt ?? createdAt;

	return {
		id: entry.id ?? makeId(),
		title: String(entry.title ?? '').trim(),
		content: String(entry.content ?? '').trim(),
		mood: String(entry.mood ?? 'clear'),
		tags: normalizeTags(entry.tags),
		color: String(entry.color ?? 'sky'),
		pinned: Boolean(entry.pinned),
		createdAt,
		updatedAt,
	};
}

function normalizeDraft(entry) {
	const createdAt = entry.createdAt ?? nowIso();
	const updatedAt = entry.updatedAt ?? createdAt;

	return {
		draftId: entry.draftId ?? makeId(),
		title: String(entry.title ?? '').trim(),
		content: String(entry.content ?? '').trim(),
		mood: String(entry.mood ?? 'clear'),
		tags: normalizeTags(entry.tags),
		color: String(entry.color ?? 'sky'),
		createdAt,
		updatedAt,
	};
}

function sortEntries(entries) {
	return [...entries].sort((left, right) => {
		if (left.pinned !== right.pinned) return left.pinned ? -1 : 1;
		return (
			new Date(right.updatedAt).getTime() - new Date(left.updatedAt).getTime()
		);
	});
}

function sortDrafts(entries) {
	return [...entries].sort(
		(left, right) =>
			new Date(right.updatedAt).getTime() - new Date(left.updatedAt).getTime(),
	);
}

function emitChange(entries) {
	globalThis.dispatchEvent(
		new CustomEvent(THINK_EVENT, {
			detail: { items: entries },
		}),
	);
}

function emitDraftChange(entries) {
	globalThis.dispatchEvent(
		new CustomEvent(THINK_DRAFT_EVENT, {
			detail: { items: entries },
		}),
	);
}

export function readThinks() {
	const items = safeParse(localStorage.getItem(THINKS_KEY), []);
	return sortEntries(items.map(normalizeEntry).filter((item) => item.content));
}

export function writeThinks(entries) {
	const normalized = sortEntries(
		entries.map(normalizeEntry).filter((item) => item.content),
	);
	localStorage.setItem(THINKS_KEY, JSON.stringify(normalized));
	emitChange(normalized);
	return normalized;
}

export function getThinkById(id) {
	return readThinks().find((item) => item.id === id) ?? null;
}

export function upsertThink(entry) {
	const items = readThinks();
	const incoming = normalizeEntry(entry);
	const index = items.findIndex((item) => item.id === incoming.id);
	const next = {
		...incoming,
		createdAt: index >= 0 ? items[index].createdAt : incoming.createdAt,
		updatedAt: nowIso(),
	};

	if (index >= 0) {
		items[index] = {
			...items[index],
			...next,
		};
	} else {
		items.unshift(next);
	}

	writeThinks(items);
	return next;
}

export function deleteThink(id) {
	return writeThinks(readThinks().filter((item) => item.id !== id));
}

export function togglePinned(id) {
	const items = readThinks().map((item) =>
		item.id === id
			? {
					...item,
					pinned: !item.pinned,
					updatedAt: nowIso(),
				}
			: item,
	);
	return writeThinks(items);
}

export function setPinned(ids, pinned) {
	const targetIds = new Set(ids);
	const items = readThinks().map((item) =>
		targetIds.has(item.id)
			? {
					...item,
					pinned,
					updatedAt: nowIso(),
				}
			: item,
	);
	return writeThinks(items);
}

export function deleteThinks(ids) {
	const targetIds = new Set(ids);
	return writeThinks(readThinks().filter((item) => !targetIds.has(item.id)));
}

export function replaceAllThinks(items) {
	return writeThinks(items);
}

export function readDraft() {
	return safeParse(localStorage.getItem(THINK_DRAFT_KEY), null);
}

export function writeDraft(draft) {
	const normalized = {
		id: draft?.id ?? null,
		title: String(draft?.title ?? '').trim(),
		content: String(draft?.content ?? ''),
		mood: String(draft?.mood ?? 'clear'),
		tags: normalizeTags(draft?.tags),
		color: String(draft?.color ?? 'sky'),
		updatedAt: nowIso(),
	};
	localStorage.setItem(THINK_DRAFT_KEY, JSON.stringify(normalized));
	return normalized;
}

export function clearDraft() {
	localStorage.removeItem(THINK_DRAFT_KEY);
}

export function readDraftShelf() {
	const items = safeParse(localStorage.getItem(THINK_DRAFTS_KEY), []);
	return sortDrafts(items.map(normalizeDraft).filter((item) => item.content));
}

function writeDraftShelf(entries) {
	const normalized = sortDrafts(
		entries.map(normalizeDraft).filter((item) => item.content),
	);
	localStorage.setItem(THINK_DRAFTS_KEY, JSON.stringify(normalized));
	emitDraftChange(normalized);
	return normalized;
}

export function saveDraftSnapshot(draft) {
	const items = readDraftShelf();
	const incoming = normalizeDraft(draft);
	const index = items.findIndex((item) => item.draftId === incoming.draftId);
	const next = {
		...incoming,
		createdAt: index >= 0 ? items[index].createdAt : incoming.createdAt,
		updatedAt: nowIso(),
	};

	if (index >= 0) {
		items[index] = {
			...items[index],
			...next,
		};
	} else {
		items.unshift(next);
	}

	writeDraftShelf(items);
	return next;
}

export function getDraftById(draftId) {
	return readDraftShelf().find((item) => item.draftId === draftId) ?? null;
}

export function loadDraftSnapshot(draftId) {
	const draft = getDraftById(draftId);
	if (!draft) return null;
	writeDraft({
		title: draft.title,
		content: draft.content,
		mood: draft.mood,
		tags: draft.tags,
		color: draft.color,
	});
	return draft;
}

export function deleteDraftSnapshot(draftId) {
	return writeDraftShelf(
		readDraftShelf().filter((item) => item.draftId !== draftId),
	);
}

export function deleteDraftSnapshots(draftIds) {
	const targetIds = new Set(draftIds);
	return writeDraftShelf(
		readDraftShelf().filter((item) => !targetIds.has(item.draftId)),
	);
}

export function createEditableDraft(id) {
	const item = getThinkById(id);
	if (!item) return null;
	return writeDraft(item);
}

export function exportThinks() {
	const payload = {
		version: 1,
		exportedAt: nowIso(),
		items: readThinks(),
	};
	return JSON.stringify(payload, null, 2);
}

export function importThinks(raw) {
	const parsed = safeParse(raw, null);
	if (!parsed) throw new Error('Invalid JSON payload');
	const source = Array.isArray(parsed) ? parsed : parsed.items;
	if (!Array.isArray(source))
		throw new Error('Imported payload does not contain a valid items array');
	return replaceAllThinks(source);
}

export function formatDate(iso, options = {}) {
	const date = new Date(iso);
	return new Intl.DateTimeFormat('zh-CN', {
		dateStyle: 'medium',
		timeStyle: 'short',
		...options,
	}).format(date);
}

export function relativeFromNow(iso) {
	const diff = new Date(iso).getTime() - Date.now();
	const formatter = new Intl.RelativeTimeFormat('zh-CN', { numeric: 'auto' });
	const divisions = [
		['day', 1000 * 60 * 60 * 24],
		['hour', 1000 * 60 * 60],
		['minute', 1000 * 60],
	];

	for (const [unit, amount] of divisions) {
		if (Math.abs(diff) >= amount || unit === 'minute') {
			return formatter.format(Math.round(diff / amount), unit);
		}
	}

	return formatter.format(0, 'minute');
}

export function parseTagInput(value) {
	return normalizeTags(value);
}

export function getThinkStats(items = readThinks()) {
	const tagCount = new Set(
		items.flatMap((item) => item.tags.map((tag) => tag.toLocaleLowerCase())),
	).size;
	return {
		total: items.length,
		pinned: items.filter((item) => item.pinned).length,
		tags: tagCount,
	};
}

export { THINK_EVENT, THINK_DRAFT_EVENT };
