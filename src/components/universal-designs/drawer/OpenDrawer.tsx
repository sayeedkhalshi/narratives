"use client";
import { useDispatch } from "react-redux";
import { openDrawer } from "@/redux/features/drawer.slice"; // adjust to your slice file path

const OpenDrawer = () => {
    const dispatch = useDispatch();

    return (
        <button onClick={() => dispatch(openDrawer())} className="btn-primary">
            Open Drawer
        </button>
    );
};

export default OpenDrawer;
