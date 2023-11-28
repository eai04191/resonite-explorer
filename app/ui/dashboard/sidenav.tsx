import { Github } from "lucide-react";
import Link from "next/link";

import NavLinks, { navLinkBaseStyles } from "@/app/ui/dashboard/nav-links";
import Logo from "@/app/ui/logo";

export default function SideNav() {
    const GitHubLink = () => (
        <Link
            href="https://github.com/eai04191/resonite-explorer"
            className={navLinkBaseStyles}
        >
            <Github className="w-6" />
            <span>GitHub</span>
        </Link>
    );

    return (
        <div className="flex h-full flex-col px-3 py-4 md:px-2">
            <Link
                className="mb-2 flex h-32 items-end justify-start rounded-md bg-eaiRed-600 bg-gradient-to-tr from-eaiRed-600 to-eaiRed-400 p-4 md:h-60"
                href="/"
            >
                <div className="w-32 text-white md:w-40">
                    <Logo />
                </div>
            </Link>
            <div className="flex grow flex-row justify-between space-x-2 overflow-auto md:flex-col md:space-x-0 md:space-y-2">
                <NavLinks />
                <div className="hidden h-auto w-full grow rounded-md bg-white/80 md:block"></div>
                <GitHubLink />
            </div>
        </div>
    );
}
