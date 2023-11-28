"use client";

import {
    Castle,
    ChevronRightIcon,
    CircleUser,
    Globe,
    Package,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/app/lib/utils";

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
    {
        name: "Public Sessions",
        shortName: "Sessions",
        href: "/sessions",
        icon: Globe,
    },
    {
        name: "Public Inventory",
        shortName: "Inventory",
        // href: "/inventory",
        icon: Package,
    },
    {
        name: "Users",
        // href: "/users",
        icon: CircleUser,
    },
    {
        name: "Groups",
        // href: "/groups",
        icon: Castle,
    },
];

export const navLinkBaseStyles =
    "group flex grow items-center justify-center gap-2 rounded-md bg-white/80 p-3 text-sm font-medium md:flex-none md:justify-start md:p-3";

export default function NavLinks() {
    const pathname = usePathname();

    return (
        <>
            {links.map((link) => {
                const LinkIcon = link.icon;
                return (
                    <Link
                        key={link.name}
                        href={link.href || "#"}
                        className={cn(
                            navLinkBaseStyles,
                            {
                                "cursor-default select-none opacity-70":
                                    link.href === undefined,
                            },
                            {
                                "bg-eaiRed-100 text-eaiRed-600":
                                    pathname === link.href,
                            },
                        )}
                    >
                        <LinkIcon className="w-6" />
                        <p className="hidden md:block">{link.name}</p>
                        <p className="md:hidden">
                            {link.shortName || link.name}
                        </p>
                        <ChevronRightIcon className="ml-auto hidden opacity-0 transition-opacity group-hover:opacity-100 md:block" />
                    </Link>
                );
            })}
        </>
    );
}
