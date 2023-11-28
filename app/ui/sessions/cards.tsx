import { fetchSessions, Session } from "@/app/lib/api/resonite/session";

export default async function CardWrapper() {
    const sessions = await fetchSessions();

    return (
        <>
            {sessions
                .sort((a, b) => b.joinedUsers - a.joinedUsers)
                .map((session) => (
                    <Card key={session.sessionId} session={session} />
                ))}
        </>
    );
}

export function Card({ session }: { session: Session }) {
    return (
        <div className="overflow-hidden rounded-xl bg-gray-50 p-2 shadow-sm">
            <div className="flex p-4">
                <h3
                    className="flex flex-1 gap-2 overflow-hidden text-sm font-medium"
                    title={session.name}
                >
                    <span className="flex-1 truncate">
                        {(session.name + " ").repeat(2)}
                    </span>
                    <span className="flex flex-shrink-0 gap-0.5 text-gray-500">
                        <span className="whitespace-nowrap">
                            {session.joinedUsers}
                        </span>
                        <span className="opacity-50">/</span>
                        <span className="whitespace-nowrap">
                            {session.maxUsers}
                        </span>
                    </span>
                </h3>
            </div>
            <div
                className={
                    "aspect-[2/1] rounded-xl bg-black bg-cover bg-center p-12"
                }
                style={
                    {
                        backgroundImage: `url('${session.thumbnailUrl}')`,
                    } as React.CSSProperties
                }
            ></div>
        </div>
    );
}
