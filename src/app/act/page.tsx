import React from "react";
import Chat from "@/components/Chat";

const Page = () => {
    return (
        <div className="w-full min-h-[100vh] flex wrapper bg-gray-100">
            <div className="w-[60%] pt-8 px-8 bg-white rounded-4xl">
                <Chat />
            </div>
            <div>actions</div>
        </div>
    );
};

export default Page;
