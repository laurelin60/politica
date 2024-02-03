"use client";

import { useEffect, useRef, useState } from "react";
// import ActionCard from "@/components/ActionCard";
// import ActionItem from "@/components/ActionItem";
// import AssistantChatBubble from "@/components/AssistantChatBubble";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChat } from "ai/react";
import { Loader2, Mic, Send } from "lucide-react";

export type Action = {
    title: string;
    items: [{ title: string; tag: string; link: string }];
};

const Chat = () => {
    const { messages, input, handleInputChange, handleSubmit } = useChat({
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
        <div className="h-full flex justify-between gap-x-8">
            <div className="flex-col w-full relative mb-16">
                <form
                    onSubmit={handleSubmit}
                    className="absolute bottom-0 w-full flex flex-row gap-x-4 h-[100px]"
                >
                    <Input
                        value={input}
                        placeholder="enter a bill that..."
                        onChange={handleInputChange}
                        className="input-form w-[calc(100%-200px)] py-6 text-xl bg-jas-grey_light h-full rounded-3xl border-2 hover:border-blue-500 focus:border-blue-500 focus:outline-none"
                    />

                    <Button
                        type="submit"
                        className="h-[100px] w-[100px] rounded-3xl"
                    >
                        <Mic className="size-11" />
                    </Button>

                    <Button
                        type="submit"
                        className="h-[100px] aspect-square rounded-3xl"
                    >
                        <Send className="size-11" />
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default Chat;
