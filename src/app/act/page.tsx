"use client";

import { useState } from "react";
import Actions from "@/components/Actions";
import Chat from "@/components/Chat";

const Page = () => {
    const [bill, setBill] = useState<string>();

    const handleSelect = (billTitle: string) => {
        setBill((prevBill) => (prevBill == billTitle ? undefined : billTitle));
    };

    return (
        <div className="w-full min-h-[100vh] flex wrapper bg-jas-light py-8 space-x-8">
            <div className="w-[55%] px-8 bg-white rounded-4xl">
                <Chat onSelect={handleSelect} />
            </div>
            <div className="w-[45%]">
                <Actions bill={bill} />
            </div>
        </div>
    );
};

export default Page;
