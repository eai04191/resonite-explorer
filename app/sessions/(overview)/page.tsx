import { Suspense } from "react";

import { cn } from "@/app/lib/utils";
import ListWrapper from "@/app/ui/sessions/lists";

export default async function Page() {
    return (
        <main>
            <h1 className={cn("mb-4 text-xl font-medium md:text-2xl")}>
                Public Sessions
            </h1>

            <div className="">
                <Suspense fallback={<></>}>
                    <ListWrapper />
                </Suspense>
            </div>
        </main>
    );
}
