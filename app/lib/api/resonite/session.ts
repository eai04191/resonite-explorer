import he from "he";
import DOMPurify from "isomorphic-dompurify";
import { unstable_noStore as noStore } from "next/cache";

export interface Session {
    name: string;
    description?: string;
    correspondingWorldId?: CorrespondingWorldId;
    tags: string[];
    sessionId: string;
    normalizedSessionId: string;
    /**
     * 未登録ユーザーが作ったセッションの場合はundefined?
     */
    hostUserId?: string;
    hostUserSessionId?: string;
    hostMachineId: string;
    hostUsername: string;
    compatibilityHash: string;
    appVersion: string;
    headlessHost: boolean;
    sessionURLs: string[];
    parentSessionIds: string[];
    nestedSessionIds: string[];
    sessionUsers: SessionUser[];
    thumbnailUrl?: string;
    joinedUsers: number;
    activeUsers: number;
    totalJoinedUsers: number;
    totalActiveUsers: number;
    maxUsers: number;
    mobileFriendly: boolean;
    sessionBeginTime: string;
    lastUpdate: string;
    accessLevel: string;
    hideFromListing: boolean;
    hasEnded: boolean;
    isValid: boolean;
    universeId?: string;
}

export interface SessionUser {
    username: string;
    /**
     * 未登録ユーザーの場合はundefined?
     */
    userID?: string;
    isPresent: boolean;
    outputDevice?: number;
}

export interface CorrespondingWorldId {
    recordId: string;
    ownerId: string;
}

type fetchSessionsOptions = {
    includeEmptyHeadless?: boolean;
    minActiveUsers?: number;
};

function sanitize(dirty: string) {
    let clean = DOMPurify.sanitize(dirty, {
        ALLOWED_TAGS: ["#text", "br"],
    });

    // JSDomによって&amp;のようにされたHTMLエンティティをデコード
    clean = he.decode(clean);

    // <br>タグをスペースに置き換える
    clean = clean.replace(/<br\s*\/?>/gi, " ");

    return clean;
}

export async function fetchSessions({
    includeEmptyHeadless = false,
    minActiveUsers = 1,
}: fetchSessionsOptions = {}) {
    noStore();

    const params = new URLSearchParams({
        includeEmptyHeadless: includeEmptyHeadless ? "true" : "false",
        minActiveUsers: minActiveUsers.toString(),
    });
    // official API (Amsterdams)
    const url1 = `https://api.resonite.com/sessions?${params.toString()}`;
    // unofficial API (Tokyo)
    const url2 = `https://resonite-alternative-api.mizle.net/sessions?${params.toString()}`;
    // Promise race!
    const fastestResponse = await Promise.race([fetch(url1), fetch(url2)]);
    console.log("Fastest response:", new URL(fastestResponse.url).host);
    const sessions = (await fastestResponse.json()) as Session[];

    const sanitizedSessions = sessions
        // nameとdescriptionに含まれうるTMPのリッチテキストタグをサニタイズ
        .map((session) => {
            session.name = sanitize(session.name);
            session.description = session.description
                ? sanitize(session.description)
                : undefined;
            return session;
        }) as Session[];

    return sanitizedSessions;
}
