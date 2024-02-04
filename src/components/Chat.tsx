"use client";

import { useEffect, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChat } from "ai/react";
import { Loader2 /*Mic,*/, Send } from "lucide-react";

import AssistantMessage from "./AssistantMessage";

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

const Chat = ({ onSelect }: { onSelect: (billTitle: string) => void }) => {
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

    return (
        <div className="h-full flex justify-between gap-x-8 w-full">
            <div className="flex-col w-full relative mb-8">
                <ScrollArea
                    className="flex flex-col space-y-4 h-[680px] min-w-full max-w-fit py-2 pr-4 bg-white rounded-4xl"
                    id="messageContainer"
                >
                    <div
                        className="space-y-8 justify-start items-start flex flex-col w-full py-4"
                        ref={ref}
                    >
                        {messages.map((m, index) => (
                            <div key={m.id}>
                                {m.role === "user" ? (
                                    <div className="space-y-4">
                                        <div className="rounded-t-xl flex flex-col gap-y-2">
                                            <div className="flex items-center gap-x-2 flex-row">
                                                <Avatar className="size-10">
                                                    <AvatarImage
                                                        src="https://github.com/shadcn.png"
                                                        alt="@shadcn"
                                                    />
                                                    <AvatarFallback>
                                                        Y
                                                    </AvatarFallback>
                                                </Avatar>
                                                <span className="font-bold text-2xl">
                                                    You
                                                </span>
                                            </div>
                                            <div className="p-4 rounded-[24px] border-4 border-jas-dark text-white bg-jas-dark">
                                                <p className="font-semibold text-xl">
                                                    {m.content}
                                                </p>
                                            </div>
                                        </div>

                                        {index == messages.length - 1 &&
                                            m.role == "user" && (
                                                <div className="bg-jas-light rounded-xl p-4 flex flex-row gap-x-2">
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
                                        <AssistantMessage onSelect={onSelect} />
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </ScrollArea>

                <form
                    onSubmit={handleSubmit}
                    className="absolute bottom-0 w-full flex flex-row gap-x-4 h-14"
                >
                    <Input
                        value={input}
                        placeholder="enter a bill that..."
                        onChange={handleInputChange}
                        className="input-form w-[calc(100%-80px)] bg-[#ECECEC] py-6 text-xl text-opacity-70 text-black h-14 rounded-2xl border-2 active:ring-black active:ring-opacity-60"
                    />

                    {/* <Button
                        type="submit"
                        className="h-20 w-20 rounded-3xl bg-[#D5D5D5] text-[#6C6C6C] hover:bg-[#D5D5D5]/80"
                    >
                        <Mic className="size-9" />
                    </Button> */}

                    <Button
                        type="submit"
                        className="h-14 aspect-square rounded-2xl bg-jas-purple hover:bg-jas-purple/80"
                    >
                        <Send className="size-9" />
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default Chat;
