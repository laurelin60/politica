"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Check, Dot, FileText } from "lucide-react";

import { Button } from "./ui/button";

const BILLS: Bill[] = [
    {
        label: "CA Bill 234",
        title: "Increasing access to Hormone Therapy",
    },
    {
        label: "CA Bill 345",
        title: "Increasing access to Hormone Therapy",
    },
    {
        label: "CA Bill 456",
        title: "Increasing access to Hormone Therapy",
    },
];

type Bill = {
    label: string;
    title: string;
};

const AssistantMessage = ({
    onSelect,
}: {
    onSelect: (billTitle: string) => void;
}) => {
    const [selectedBill, setSelectedBill] = useState<string>();

    const handleSelect = (billTitle: string) => {
        onSelect(billTitle);
        setSelectedBill(billTitle);
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-x-2 flex-row">
                <Avatar className="size-10">
                    <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                    />
                    <AvatarFallback>P</AvatarFallback>
                </Avatar>
                <span className="font-bold text-2xl">
                    Your personal assistant
                </span>
            </div>

            <div className="space-y-2 bg-jas-light p-6 rounded-3xl">
                <div className="flex items-center space-x-2 px-2">
                    <div className="bg-jas-purple bg-opacity-25 rounded-xl p-2">
                        <FileText className="text-jas-purple stroke-jas-purple fill-primary-popover   " />
                    </div>
                    <h6 className="font-bold text-xl text-opacity-75">
                        Check out these bills
                    </h6>
                </div>

                {BILLS.map((bill, index) => (
                    <div className="space-y-4" key={bill.label + index}>
                        {bill.label === selectedBill ? (
                            <div
                                onClick={() => handleSelect(bill.label)}
                                className="flex-between p-8 rounded-4xl border-4 border-jas-light bg-jas-purple text-white cursor-pointer"
                            >
                                <div className="w-[90%]">
                                    <div className="flex items-center space-x-2">
                                        <div className="flex items-center space-x-2 bg-white text-white bg-opacity-25 px-4 py-2 rounded-2xl">
                                            <Dot className="size-20 -m-8" />
                                            <p className="font-semibold">
                                                critical
                                            </p>
                                        </div>
                                        <h3 className="text-xl font-semibold opacity-75">
                                            {bill.label}
                                        </h3>
                                    </div>
                                    <h1 className="text-3xl font-bold">
                                        {bill.title}
                                    </h1>
                                </div>
                                <Button
                                    aria-label="clicked"
                                    className="size-12 rounded-full bg-white text-black hover:bg-white cursor-pointer"
                                >
                                    <Check className="min-w-10" />
                                </Button>
                            </div>
                        ) : (
                            <div
                                onClick={() => handleSelect(bill.label)}
                                className="flex-between p-8 rounded-4xl border-4 border-jas-light bg-white cursor-pointer hover:border-jas-purple focus:border-jas-purple focus:outline-none"
                            >
                                <div className="w-[90%]">
                                    <div className="flex items-center space-x-2">
                                        <div className="flex items-center space-x-2 text-jas-pink bg-jas-pink bg-opacity-25 px-4 py-2 rounded-2xl">
                                            <Dot className="size-20 -m-8" />
                                            <p className="font-semibold">
                                                critical
                                            </p>
                                        </div>
                                        <h3 className="text-xl font-semibold opacity-50">
                                            {bill.label}
                                        </h3>
                                    </div>
                                    <h1 className="text-3xl font-bold">
                                        {bill.title}
                                    </h1>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AssistantMessage;
