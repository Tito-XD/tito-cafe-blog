export interface FriendLink {
	id?: string;
	avatar?: string;
	bio?: string;
	link?: string;
}

// Edit this list only, the /friends page will update automatically.
export const friends: FriendLink[] = [
	{
		id: 'Rachel',
		avatar: 'https://rachelt.one/res/small_avatar.svg',
		bio: 'Hi, would you like a cup of Rachel today?',
		link: 'https://rachelt.one/zh/',
	},
	{
		id: 'QPomelo',
		avatar: 'https://qpomelo.dev/icons/avatar.jpeg',
		bio: 'aka 柚子',
		link: 'https://qpomelo.dev',
	},
	{
		id: 'Heuluck',
		avatar: 'https://avatars.githubusercontent.com/u/89375068?v=4',
		bio: '',
		link: 'https://hugo.heuluck.dev',
	},
	{
		id: 'Wr',
		avatar: 'https://avatars.githubusercontent.com/u/45558679?v=4',
		bio: '',
		link: 'https://wrye.dev/',
	},
	{
		id: 'Frank uwu',
		avatar: 'https://frankuwu.link/_astro/profile-picture.B3m_m6U7_gWWnD.webp',
		bio: '',
		link: 'https://frankuwu.link/',
	},
	{
		id: '烤鱼',
		avatar: 'https://blog.grilledfish9.xyz/images/2.PNG',
		bio: '',
		link: 'blog.grilledfish9.xyz',
	},
];
