export interface PastebinProfile {
    username: string;
    profileUrl: string;
    avatarUrl: string | null;
}

const PASTEBIN_ORIGIN = 'https://pastebin.com';

function toAbsolutePastebinUrl(path: string): string {
    if (path.startsWith('http://') || path.startsWith('https://')) return path;
    return `${PASTEBIN_ORIGIN}${path.startsWith('/') ? path : `/${path}`}`;
}

/**
 * Parses the logged-in user block from pastebin.com homepage HTML.
 * @see https://pastebin.com/ — `.header__right` / `.header__user-icon`
 */
export function parsePastebinProfileFromHtml(html: string): PastebinProfile | null {
    const headerRight = html.match(/<div class="header__right">([\s\S]*?)(?=<\/header>)/i);
    const scope = headerRight?.[1] ?? html;

    let profilePath: string | null = null;

    const iconLink = scope.match(/header__user-icon[\s\S]*?<a[^>]+href="(\/u\/[^"#?]+)"/i);
    if (iconLink) profilePath = iconLink[1];

    if (!profilePath) {
        const menuLink = scope.match(/<a[^>]+href="(\/u\/[^"#?]+)"[^>]*class="pastebin"/i);
        if (menuLink) profilePath = menuLink[1];
    }

    if (!profilePath) return null;

    const username = decodeURIComponent(profilePath.replace(/^\/u\//, '').trim());
    if (!username) return null;

    let avatarUrl: string | null = null;
    const imgMatch = scope.match(/header__user-icon[\s\S]*?<img[^>]+src="([^"]+)"/i);
    if (imgMatch?.[1]) {
        avatarUrl = toAbsolutePastebinUrl(imgMatch[1]);
    }

    return {
        username,
        profileUrl: toAbsolutePastebinUrl(profilePath),
        avatarUrl,
    };
}

export function profileFromUsername(username: string): PastebinProfile {
    const encoded = encodeURIComponent(username);
    return {
        username,
        profileUrl: `${PASTEBIN_ORIGIN}/u/${encoded}`,
        avatarUrl: null,
    };
}
