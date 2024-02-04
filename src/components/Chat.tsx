"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
// import { useChat } from "ai/react";
import { Loader2 /*Mic,*/, Send } from "lucide-react";

import AssistantMessage from "./AssistantMessage";

export type DataResponse = {
    measure: string;
    subject: string;
    status: string;
    summary: string;
    tags: [
        "Sustainability",
        "GenderEquality",
        "RacialJustice",
        "RefugeeRights",
        "DisabilityRights",
        "Budget",
        "Education",
        "Health",
        "Transportation",
        "Housing",
        "PublicSafety",
        "Labor",
        "Energy",
        "Agriculture",
        "Technology",
    ];
};

export type Data = {
    result: { data: DataResponse[] };
};

type Message = {
    id: number;
    role: string;
    content: string | DataResponse[];
};

// const base_messages = [
//     { id: 1, role: "user", content: "What should I eat?" },
//     {
//         id: 2,
//         role: "ai",
//         content:
//             "Eat plenty of foods filled with antioxidants, like strawberries.",
//     },
//     // {
//     //     id: 3,
//     //     role: "ai",
//     //     content: "Eat chiken.",
//     // },
//     // {
//     //     id: 4,
//     //     role: "user",
//     //     content: "Eat chiken.",
//     // },
//     // {
//     //     id: 5,
//     //     role: "ai",
//     //     content:
//     //         "Eat plenty of foods filled with antioxidants, like fasdfasiuefhasdkj fasdskjfhadskjfhadskjfh.",
//     // },
// ];

const Chat = ({
    onSelect,
}: {
    onSelect: (billTitle: DataResponse) => void;
}) => {
    // const { messages, input, handleInputChange, handleSubmit } = useChat({
    //     api: 'api/trpc/getBillByPrompt?input={"prompt":%20"Find%20me%20a%20bill%20about%20education"}',
    // });

    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState<string>("");

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

    const handleSubmit = async (event: { preventDefault: () => void }) => {
        event.preventDefault();

        setMessages((prevMessages) => [
            ...prevMessages,
            { id: prevMessages.length, role: "user", content: input },
        ]);

        const response = await fetch(
            `api/trpc/getBillByPrompt?input={"prompt":%20"${encodeURIComponent(
                input,
            )}"}`,
        );

        setInput("");

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const newData: Data = await response.json();

        setMessages((prevMessages) => [
            ...prevMessages,
            {
                id: prevMessages.length,
                role: "ai",
                content: newData.result.data,
            },
        ]);

        console.log(newData);
    };

    const handleInputChange = (newInput: ChangeEvent<HTMLInputElement>) => {
        setInput(newInput.currentTarget.value);
    };

    return (
        <div className="h-full flex justify-between gap-x-8 w-full">
            <div className="flex-col w-full relative mb-8">
                {messages.length > 0 ? (
                    <ScrollArea
                        className="flex flex-col space-y-4 h-[680px] min-w-full max-w-fit py-2 pr-4 bg-white rounded-4xl rounded-t-none"
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
                                                        {m.content as string}
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
                                                                    Your
                                                                    personal
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
                                            <AssistantMessage
                                                onSelect={onSelect}
                                                data={
                                                    m.content as DataResponse[]
                                                }
                                            />
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                ) : (
                    <div className="my-auto flex-center flex-col h-full gap-y-2">
                        <img
                            src="/raccoon.png"
                            alt="raccoon"
                            className="w-16 h-16 object-cover"
                        />

                        <div className="text-2xl font-semibold w-[80%] text-center">
                            What legislation are you interested in learning more
                            about?
                        </div>
                    </div>
                )}

                <form
                    // eslint-disable-next-line @typescript-eslint/no-misused-promises
                    onSubmit={(event) => handleSubmit(event)}
                    className="absolute bottom-0 w-full flex flex-row gap-x-4 h-14"
                >
                    <Input
                        value={input}
                        placeholder="enter a bill that..."
                        onChange={handleInputChange}
                        disabled={messages[messages.length - 1]?.role == "user"}
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
                        disabled={messages[messages.length - 1]?.role == "user"}
                    >
                        <Send className="size-9" />
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default Chat;
