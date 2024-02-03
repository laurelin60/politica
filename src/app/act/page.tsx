"use client";

import React, { useState } from "react";
import Chat from "@/components/Chat";

const Page = () => {
    const [bill, setBill] = useState<string>();

    const handleSelect = (billTitle: string) => {
        setBill(billTitle);
    };

    return (
        <div className="w-full min-h-[100vh] flex wrapper bg-gray-100 py-8">
            <div className="w-[60%] px-8 bg-white rounded-4xl">
                <Chat onSelect={handleSelect} />
            </div>
            <div>actions</div>
        </div>
    );
};

export default Page;
