import React from "react";
import Chat from "@/components/Chat";

const Page = () => {
    return (
        <div className="w-full min-h-[100vh] flex wrapper">
            <div className="w-[60%]">
                <Chat />
            </div>
            <div>actions</div>
        </div>
    );
};

export default Page;
