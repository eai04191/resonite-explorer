import { Bot } from "lucide-react";
import { Suspense } from "react";

import { fetchSessions, Session } from "@/app/lib/api/resonite/session";
import { cn } from "@/app/lib/utils";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/app/ui/accordion";

import { ListDetail } from "./ListDetail";
import UserTip, { UnregisteredUserTip, UserTipSkelton } from "./userTip";

export default async function ListWrapper() {
    const sessions = await fetchSessions();

    return (
        <Accordion type="multiple" className="flex flex-col gap-2">
            {sessions
                .sort((a, b) => b.joinedUsers - a.joinedUsers)
                .map((session) => (
                    <AccordionItem
                        key={session.sessionId}
                        value={session.sessionId}
                        style={
                            {
                                "--thumbnail-url": `url('${session.thumbnailUrl}')`,
                                backgroundImage: "var(--thumbnail-url)",
                            } as React.CSSProperties
                        }
                        className={cn(
                            "overflow-hidden rounded-lg bg-black bg-cover bg-center bg-no-repeat",
                            // "[&>*]:backdrop-blur [&>*]:backdrop-opacity-0 [&>*]:transition-[backdrop-filter] [&>*]:duration-300 [&[data-state=open]>*]:backdrop-opacity-100",
                        )}
                    >
                        <AccordionTrigger
                            className={cn(
                                "relative flex flex-1 text-start",
                                // アコーディオンが開いてるときはbg-black/70
                                "bg-black bg-opacity-0 transition-colors [&[data-state=open]]:bg-opacity-70",
                                // アコーディオンが開いてるときは下のborder-radiusを消す
                                "[&[data-state=open]>[data-name=header]]:rounded-b-none",
                                // アコーディオンが閉じきる前にborder-radiusが変わるのを防ぐために、accordion-upのdurationとdelayを合わせる
                                "[&[data-state=closed]>[data-name=header]]:delay-[0.15s]",
                                // アコーディオンが開き始めるときに隙間が見えないように一瞬でborder-radiusを変える
                                "[&[data-state=open]>[data-name=header]]:duration-0",
                                // ListItem内のトランジション
                                "[&[data-state=open]_[data-name=info]]:select-none [&[data-state=open]_[data-name=info]]:opacity-0 [&[data-state=open]_[data-name=name]]:translate-y-3 [&[data-state=open]_[data-name=name]]:scale-110",
                            )}
                        >
                            <ListHeader session={session} />
                        </AccordionTrigger>
                        <AccordionContent>
                            <ListDetail session={session} />
                        </AccordionContent>
                    </AccordionItem>
                ))}
        </Accordion>
    );
}

export function ListHeader({ session }: { session: Session }) {
    return (
        <div
            data-name="header"
            className={cn(
                "flex flex-1 flex-col gap-2 overflow-hidden rounded-lg p-4 transition-[border-radius]",
                "from-gray-900/80 from-70% to-transparent bg-left-top bg-no-repeat text-white",
                // "from-red-500",
            )}
            style={{
                backgroundImage:
                    "radial-gradient(farthest-side at 0px 0px, var(--tw-gradient-stops))",
                backgroundSize: "max(80%, 30em) auto",
            }}
        >
            <div
                data-name="name"
                className={cn(
                    // scaleを大きくするときにはみ出ないようにマージンを取っておく
                    "me-[10vw]",
                    "origin-top-left text-base font-semibold transition-[font-size,_line-height,_transform]",
                )}
            >
                {session.name || (
                    <span className="opacity-50">Unnamed session</span>
                )}
            </div>

            <div
                data-name="info"
                className="flex flex-row gap-2 transition-opacity"
            >
                <div className="flex items-center gap-1">
                    <Suspense
                        fallback={
                            <UserTipSkelton username={session.hostUsername} />
                        }
                    >
                        {session.hostUserId ? (
                            <UserTip userId={session.hostUserId} />
                        ) : (
                            <UnregisteredUserTip
                                username={session.hostUsername}
                            />
                        )}
                    </Suspense>
                    {session.headlessHost && (
                        <Bot className="h-5 w-5 opacity-75" />
                    )}
                </div>

                <div className="flex gap-0.5">
                    <span>{session.joinedUsers}</span>
                    <span className="opacity-50">/</span>
                    <span>{session.maxUsers}</span>
                </div>
            </div>
        </div>
    );
}
