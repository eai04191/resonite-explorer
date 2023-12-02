import { Bot, Star } from "lucide-react";
import { Suspense } from "react";

import { Session } from "@/app/lib/api/resonite/session";
import { cn } from "@/app/lib/utils";

import { ExternalLink } from "../link";
import { CreatedAt } from "./CreatedAt";
import UserTip, { UnregisteredUserTip, UserTipSkelton } from "./userTip";

export function ListDetail({ session }: { session: Session }) {
    const NoDescription = () => (
        <span className="opacity-50">This session has no description.</span>
    );

    const Tags = () =>
        session.tags.map((tag) => (
            <span
                key={tag}
                className="inline-block rounded-full bg-gray-800 px-2 py-0.5 text-xs text-white"
            >
                {tag}
            </span>
        ));

    return (
        <div className="flex flex-col gap-4 rounded-b-xl bg-black/70 p-4 pt-3 text-white">
            <div className="flex flex-col gap-2">
                {session.description || <NoDescription />}
                {session.tags.length > 0 && (
                    <div className="inline-flex flex-wrap items-center gap-1">
                        <Tags />
                    </div>
                )}
            </div>

            <div className="flex flex-col gap-1 text-sm">
                <span>{session.accessLevel} can join this session.</span>
                <span>
                    Created at{" "}
                    <CreatedAt sessionBeginTime={session.sessionBeginTime} />
                </span>
            </div>

            <div>
                <span className="flex gap-2">
                    Users
                    <div className="flex gap-0.5">
                        (<span>{session.joinedUsers}</span>
                        <span className="opacity-50">/</span>
                        <span>{session.maxUsers}</span>)
                    </div>
                </span>
            </div>

            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {session.sessionUsers.length === 0 ? (
                    <span className="opacity-50">
                        No one is in this session.
                    </span>
                ) : (
                    session.sessionUsers.map((user) => (
                        <Suspense
                            key={user.username + user.userID}
                            fallback={
                                <UserTipSkelton username={user.username} />
                            }
                        >
                            <div
                                className={cn(
                                    "flex flex-row items-center gap-1",
                                    !user.isPresent && "opacity-50",
                                )}
                            >
                                {/* check userId is not null */}
                                {/* INFO: headlessクライアントの設定などでusernameを変更している場合、UserTipで表示されるusernameとセッションにいるusernameが異なることがある */}
                                {user.userID ? (
                                    <UserTip userId={user.userID} />
                                ) : (
                                    <UnregisteredUserTip
                                        username={user.username}
                                    />
                                )}

                                {user.username === session.hostUsername && (
                                    <span title="Host">
                                        <Star className="h-4 w-4 fill-yellow-300 text-transparent" />
                                    </span>
                                )}
                                {user.username === session.hostUsername &&
                                    session.headlessHost && (
                                        <span title="Headless">
                                            <Bot className="h-4 w-4" />
                                        </span>
                                    )}
                            </div>
                        </Suspense>
                    ))
                )}
            </div>
            <div className="flex gap-3">
                <ExternalLink
                    href={`https://api.resonite.com/sessions/${session.sessionId}`}
                >
                    View in Resonite API
                </ExternalLink>
                <ExternalLink
                    href={session.thumbnailUrl}
                    className={cn({
                        "cursor-pointer opacity-50": !session.thumbnailUrl,
                    })}
                    title={
                        session.thumbnailUrl
                            ? undefined
                            : "This session has no thumbnail."
                    }
                >
                    Open thumbnail in new tab
                </ExternalLink>
            </div>
        </div>
    );
}
