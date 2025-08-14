"use client";
import GreenPlusButton from "@/components/universal-designs/button/GreenPlus.button";
import Routine from "@/components/universal-designs/routine/Routine";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { openPopup } from "@/redux/features/popus.slice";

import ThreadManager from "@/components/thread/ThreadManager";
export default function Home() {
    const dispatch = useDispatch();

    return (
        <div>
            <h1>Home</h1>
            <GreenPlusButton
                fab
                size="lg"
                ariaLabel="Create new threads and routines"
                className="px-6"
                onClick={() => dispatch(openPopup(<ThreadManager />))}
            />{" "}
            <Routine />
            <Link href="/about">About</Link>
        </div>
    );
}
