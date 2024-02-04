"use client";

import { MouseEvent, useState } from "react";
import Access from "@/components/Access";
import Actions from "@/components/Actions";
import Chat from "@/components/Chat";
import { cn } from "@/lib/utils";

const Page = () => {
    const [bill, setBill] = useState<string>();
    // const [visual, setVisual] = useState(false);
    const [adhd, setAdhd] = useState(false);
    const [yPosition, setYPosition] = useState<number>(0);

    const handleSelect = (billTitle: string) => {
        setBill((prevBill) => (prevBill == billTitle ? undefined : billTitle));
    };

    // const handleVisual = () => {
    //     setVisual((prevVisual) => !prevVisual);
    // };

    const handleAdhd = () => {
        setAdhd((prevAdhd) => !prevAdhd);
    };

    const [bottom, setBottom] = useState(0);

    const handleMouseMove = (e: MouseEvent) => {
        setYPosition(e.clientY);
        setBottom(1728 - yPosition - 922);
    };

    return (
        <div onMouseMove={handleMouseMove} className="max-h-[100vh]">
            <div className={cn("relative")}>
                <div className="w-full h-[100vh] flex wrapper bg-jas-light py-8 space-x-8">
                    <div className="w-[55%] px-8 bg-white rounded-4xl">
                        <Chat onSelect={handleSelect} />
                    </div>
                    <div className="w-[45%]">
                        <Actions bill={bill} />
                    </div>
                </div>

                <Access adhd={adhd} handleAdhd={handleAdhd} />
            </div>

            {adhd ? (
                <>
                    <div
                        className={cn(
                            "absolute z-50 opacity-50 bg-black w-full",
                            "h-[100vh] overflow-hidden",
                        )}
                        style={{
                            left: 0,
                            top: `calc(${yPosition}px - 107.5vh)`,
                        }}
                    />

                    <div
                        className={cn(
                            "absolute z-50 opacity-50 bg-black w-full overflow-hidden",
                            `h-[${bottom}px]]`,
                        )}
                        style={{
                            left: 0,
                            top: `calc(${yPosition}px + 7.5vh)`,
                            height: `${bottom}px`,
                        }}
                    />
                </>
            ) : null}
        </div>
    );
};

export default Page;
