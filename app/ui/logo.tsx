import { cardo } from "@/app/ui/fonts";

export default function AcmeLogo() {
    return (
        <div
            className={`${cardo.className} flex flex-row items-center leading-none text-white`}
        >
            <p className="text-[44px]">
                Resonite
                <br />
                Explorer
            </p>
        </div>
    );
}
