export interface FriendLink {
	id?: string;
	avatar?: string;
	bio?: string;
	link?: string;
}

// Edit this list only, the /friends and home pages will update automatically.
export const friends: FriendLink[] = [
	{
		id: 'Rachel',
		avatar: '/friends/rachel.svg',
		bio: 'Hi, would you like a cup of Rachel today?',
		link: 'https://rachelt.one/zh/',
	},
	{
		id: 'QPomelo',
		avatar: '/friends/qpomelo.webp',
		bio: 'aka 柚子',
		link: 'https://qpomelo.dev',
	},
	{
		id: 'Heuluck',
		avatar: '/friends/heuluck.webp',
		bio: '',
		link: 'https://hugo.heuluck.dev',
	},
	{
		id: 'Wr',
		avatar: '/friends/wr.webp',
		bio: '',
		link: 'https://wrye.dev/',
	},
	{
		id: 'Frank uwu',
		avatar: '/friends/frank-uwu.webp',
		bio: '',
		link: 'https://frankuwu.link/',
	},
	{
		id: '烤鱼',
		avatar: 'https://blog.grilledfish9.xyz/images/2.PNG',
		bio: '',
		link: 'https://blog.grilledfish9.xyz',
	},
];
