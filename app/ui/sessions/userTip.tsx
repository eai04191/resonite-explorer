import Image from "next/image";

import { fetchUser } from "@/app/lib/api/resonite/user";

export default async function UserTip({ userId }: { userId: string }) {
    const user = await fetchUser(userId);

    return (
        <div className="flex flex-row items-center gap-1">
            <Image
                className="rounded-full"
                src={user.profile?.iconUrl || "/users/blank.png"}
                width={24}
                height={24}
                alt={`${user.username}'s icon`}
            />
            {user.username}
        </div>
    );
}

// fetchUserが出来ない未登録ユーザー用のコンポーネント
export function UnregisteredUserTip({ username }: { username: string }) {
    return (
        <div className="flex flex-row items-center gap-1">
            <Image
                className="rounded-full"
                src={"/users/blank.png"}
                width={24}
                height={24}
                alt={`${username}'s icon`}
            />
            {username}
        </div>
    );
}

export function UserTipSkelton({ username }: { username: string }) {
    return (
        <div className="flex flex-row items-center gap-1">
            <div className="animate-pulse h-6 w-6 rounded-full bg-gray-300/50"></div>
            {username}
        </div>
    );
}
