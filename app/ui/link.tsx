import { ExternalLinkIcon } from "lucide-react";

import { cn } from "@/app/lib/utils";

export function ExternalLink({
    children,
    className,
    ...rest
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
    return (
        <a
            target="_blank"
            rel="noreferrer"
            {...rest}
            className={cn(
                "flex items-center gap-1",
                "text-blue-500 underline-offset-2 transition-colors hover:text-blue-400 hover:underline",
                className,
            )}
        >
            {children} {<ExternalLinkIcon className="inline h-[1em] w-[1em]" />}
        </a>
    );
}
