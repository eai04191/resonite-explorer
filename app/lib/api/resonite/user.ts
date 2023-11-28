export type User = {
    id: string;
    username: string;
    normalizedUsername: string;
    registrationDate: string;
    isVerified: boolean;
    isLocked: boolean;
    supressBanEvasion: boolean;
    "2fa_login": boolean;
    tags?: string[];
    profile?: Profile;
    supporterMetadata?: SupporterMetadata[];
    entitlements?: Entitlement[];
    migratedData?: MigratedData;
};

export type Profile = {
    iconUrl: string;
    displayBadges: [];
};

export type SupporterMetadata = {
    $type: string;
    isActiveSupporter: boolean;
    totalSupportMonths: number;
    totalSupportCents: number;
    lastTierCents: number;
    highestTierCents: number;
    lowestTierCents: number;
    firstSupportTimestamp: string;
    lastSupportTimestamp: string;
};

export type Entitlement =
    | EntitlementBadge
    | EntitlementShoutout
    | EntitlementCredit;

export type EntitlementBadge = {
    $type: "badge";
    badgeType: string;
    badgeCount: number;
};

export type EntitlementShoutout = {
    $type: "shoutout";
    shoutoutType: string;
    friendlyDescription: string;
};

export type EntitlementCredit = {
    $type: "credit";
    creditType: string;
    friendlyDescription: string;
};

export type MigratedData = {
    username: string;
    userId: string;
    quotaBytes: number;
    usedBytes: number;
    quotaBytesSources?: QuotaBytesSources;
    registrationDate: string;
};

export type QuotaBytesSources = {
    base: number;
    patreon: number;
};

export async function fetchUser(id: string) {
    try {
        const url = `https://api.resonite.com/users/${id}`;
        const user = (await fetch(url).then((res) => res.json())) as User;

        if (user.profile?.iconUrl) {
            user.profile.iconUrl = user.profile.iconUrl
                .replace("resdb:///", "https://assets.resonite.com/")
                // Remove file extension
                .replace(/\.[^.]+$/, "");
        }

        return user;
    } catch (error) {
        console.error(`Error fetching user ${id}`);
        throw new Error(error as string);
    }
}
