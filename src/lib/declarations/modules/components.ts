export type AuthorizeAvatarData = Record<string, string>;

export type AuthorizeAvatar = Record<string, AuthorizeAvatarData>;

export interface AuthorizeListItem {
	key: string;
	prependTitle: string;
	appendTitle?: string;
	prependSubtitle: string;
	appendSubtitle?: string;
	httpMethod: string;
	order: string;
}
