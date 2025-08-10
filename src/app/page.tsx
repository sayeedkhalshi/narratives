import OpenDrawer from "@/components/universal-designs/drawer/OpenDrawer";
import Link from "next/link";

export default function Home() {
    return (
        <div>
            <h1>Home</h1>
            <OpenDrawer />
            <Link href="/about">About</Link>
        </div>
    );
}
