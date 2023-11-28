"use client";

function calculateElapsedTime(sessionBeginTime: string) {
    const elapsedInSeconds = Math.floor(
        (Date.now() - new Date(sessionBeginTime).getTime()) / 1000,
    );
    const seconds = elapsedInSeconds % 60;
    const minutes = Math.floor((elapsedInSeconds / 60) % 60);
    const hours = Math.floor((elapsedInSeconds / (60 * 60)) % 24);
    const days = Math.floor(elapsedInSeconds / (60 * 60 * 24));

    return { days, hours, minutes, seconds };
}

function formatTimeUnit(value: number, unit: string) {
    return value > 0 ? `${value} ${unit} ` : "";
}

/**
 * @example 7 hours 30 minutes 15 seconds
 */
function calcElapsedHumanReadableFull(sessionBeginTime: string) {
    const { days, hours, minutes, seconds } =
        calculateElapsedTime(sessionBeginTime);

    return (
        formatTimeUnit(days, "days") +
        formatTimeUnit(hours, "hours") +
        formatTimeUnit(minutes, "minutes") +
        formatTimeUnit(seconds, "seconds").trim()
    );
}
/**
 * show only largest unit
 * @example 7 hours
 */
function calcElapsedHumanReadableShort(sessionBeginTime: string) {
    const { days, hours, minutes, seconds } =
        calculateElapsedTime(sessionBeginTime);

    return (
        (days > 0 && `${days} days`) ||
        (hours > 0 && `${hours} hours`) ||
        (minutes > 0 && `${minutes} minutes`) ||
        (seconds > 0 && `${seconds} seconds`) ||
        ""
    );
}

export function CreatedAt({
    sessionBeginTime,
    showElapsed = true,
}: {
    sessionBeginTime: string;
    showElapsed?: boolean;
}) {
    const localeString = new Date(sessionBeginTime).toLocaleString();

    return (
        <>
            {localeString}
            {showElapsed && (
                <span
                    // マウスカーソルが乗ったときに経過時間を計算してtitleに設定する
                    onMouseEnter={(e) => {
                        const target = e.target as HTMLSpanElement;
                        target.title =
                            calcElapsedHumanReadableFull(sessionBeginTime);
                    }}
                >
                    {" "}
                    ({calcElapsedHumanReadableShort(sessionBeginTime)} ago)
                </span>
            )}
        </>
    );
}
