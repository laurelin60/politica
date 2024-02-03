"use client";

import { useEffect, useRef, useState } from "react";
// import ActionCard from "@/components/ActionCard";
// import ActionItem from "@/components/ActionItem";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
// import { SelfLoveTag } from "@/components/ui/tag";
import { useChat } from "ai/react";
import { Loader2, Mic, Send } from "lucide-react";

import AssistantMessage from "./AssistantMessage";

export type Action = {
    title: string;
    items: [{ title: string; tag: string; link: string }];
};

const messages = [
    { id: 1, role: "user", content: "What should I eat?" },
    {
        id: 2,
        role: "ai",
        content:
            "Eat plenty of foods filled with antioxidants, like strawberries.",
    },
    {
        id: 3,
        role: "ai",
        content: "Eat chiken.",
    },
    {
        id: 4,
        role: "user",
        content: "Eat chiken.",
    },
    {
        id: 5,
        role: "ai",
        content:
            "Eat plenty of foods filled with antioxidants, like fasdfasiuefhasdkj fasdskjfhadskjfhadskjfh.",
    },
];

const Chat = () => {
    const { input, handleInputChange, handleSubmit } = useChat({
        api: "api/gemini/",
    });

    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const scrollIntoViewInterval = () => {
            if (ref.current) {
                ref.current.scrollIntoView({
                    behavior: "smooth",
                    block: "end",
                });
            }
        };

        scrollIntoViewInterval();

        return () => scrollIntoViewInterval();
    }, [messages]);

    const [actions, setActions] = useState<Action[]>([]);

    return (
        <div className="h-full flex justify-between gap-x-8 w-full">
            <div className="flex-col w-full relative mb-8">
                <ScrollArea
                    className="flex flex-col space-y-4 h-[700px] min-w-full max-w-fit py-2 pr-4 bg-white rounded-4xl"
                    id="messageContainer"
                >
                    <div
                        className="space-y-4 justify-start items-start flex flex-col w-full"
                        ref={ref}
                    >
                        {messages.map((m, index) => (
                            <div key={m.id}>
                                {m.role === "user" ? (
                                    <div className="space-y-4">
                                        <div className="bg-jas-grey_light rounded-xl p-4 flex flex-col gap-y-2">
                                            <div className="flex items-center gap-x-2 flex-row">
                                                <Avatar className="size-8">
                                                    <AvatarImage
                                                        src="https://github.com/shadcn.png"
                                                        alt="@shadcn"
                                                    />
                                                    <AvatarFallback>
                                                        M
                                                    </AvatarFallback>
                                                </Avatar>
                                                <span className="font-bold text-xl">
                                                    you
                                                </span>
                                            </div>
                                            <div className="text-black text-opacity-50 font-semibold flex-nowrap break-words max-w-[400px]">
                                                <span className="min-w-0">
                                                    {m.content}
                                                </span>
                                            </div>
                                        </div>

                                        {index == messages.length - 1 &&
                                            m.role == "user" && (
                                                <div className="bg-[#D3D8DC] rounded-xl p-4 flex flex-row gap-x-2">
                                                    <Avatar className="size-8">
                                                        <AvatarImage
                                                            src="https://studentcouncil.ics.uci.edu/assets/img/logo.svg"
                                                            alt="@icssc"
                                                        />
                                                        <AvatarFallback>
                                                            A
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex gap-y-2 flex-col">
                                                        <div className="flex items-center gap-x-2 flex-row">
                                                            <span className="font-bold text-xl">
                                                                Your personal
                                                                assistant
                                                            </span>
                                                        </div>

                                                        <Loader2 className="animate-spin mx-auto" />
                                                    </div>
                                                </div>
                                            )}
                                    </div>
                                ) : (
                                    <>
                                        <AssistantMessage />
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </ScrollArea>

                <form
                    onSubmit={handleSubmit}
                    className="absolute bottom-0 w-full flex flex-row gap-x-4 h-20"
                >
                    <Input
                        value={input}
                        placeholder="enter a bill that..."
                        onChange={handleInputChange}
                        className="input-form w-[calc(100%-200px)] py-6 text-xl bg-jas-grey_light h-full rounded-3xl border-2 hover:border-blue-500 focus:border-blue-500 focus:outline-none"
                    />

                    <Button type="submit" className="h-20 w-20 rounded-3xl">
                        <Mic className="size-9" />
                    </Button>

                    <Button
                        type="submit"
                        className="h-20 aspect-square rounded-3xl"
                    >
                        <Send className="size-9" />
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default Chat;
