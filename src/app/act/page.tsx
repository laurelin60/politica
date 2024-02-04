"use client";

import { useState } from "react";
import Actions from "@/components/Actions";
import Chat from "@/components/Chat";
import { AccessSwitch } from "@/components/ui/access-switch";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Eye, FileText, Sparkles } from "lucide-react";

const Page = () => {
    const [bill, setBill] = useState<string>();

    const handleSelect = (billTitle: string) => {
        setBill((prevBill) => (prevBill == billTitle ? undefined : billTitle));
    };

    return (
        <div className="relative">
            <div className="w-full min-h-[100vh] flex wrapper bg-jas-light py-8 space-x-8">
                <div className="w-[55%] px-8 bg-white rounded-4xl">
                    <Chat onSelect={handleSelect} />
                </div>
                <div className="w-[45%]">
                    <Actions bill={bill} />
                </div>
            </div>

            {/* <Button className="absolute bottom-5 right-5 rounded-full w-16 h-16 bg-jas-purple_light hover:bg-jas-purple/25 border-jas-purple border-2">
                <Sparkles className="text-jas-purple" fill="#7B5AFF" />
            </Button> */}

            <Dialog>
                <DialogTrigger className="absolute bottom-5 right-5 rounded-full flex-center w-16 h-16 bg-jas-purple_light hover:bg-jas-purple/25 border-jas-purple border-2">
                    <Sparkles className="text-jas-purple" fill="#7B5AFF" />
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold">
                            Accessibility Options
                        </DialogTitle>
                        <DialogDescription>
                            <div className="-space-y-2">
                                <div className="flex space-x-4 bg-white py-6 rounded-3xl flex-between">
                                    <div className="flex space-x-2">
                                        <div className="bg-jas-purple bg-opacity-10 w-fit h-fit p-4 rounded-2xl">
                                            <Eye className="text-jas-purple" />
                                        </div>
                                        <div className="w-[90%]">
                                            <h1 className="font-semibold text-xl text-black">
                                                visual impairments
                                            </h1>
                                            <p className="font-semibold text-lg text-jas-dark leading-7">
                                                enhances imagery and text
                                            </p>
                                        </div>
                                    </div>

                                    <AccessSwitch className="w-20 h-10" />
                                </div>
                                <div className="flex space-x-4 bg-white py-6 rounded-3xl flex-between">
                                    <div className="flex space-x-2">
                                        <div className="bg-jas-purple bg-opacity-10 w-fit h-fit p-4 rounded-2xl">
                                            <FileText className="text-jas-purple" />
                                        </div>
                                        <div className="w-[90%]">
                                            <h1 className="font-semibold text-xl text-black">
                                                ADHD assistance
                                            </h1>
                                            <p className="font-semibold text-lg text-jas-dark leading-7">
                                                enhances imagery and text
                                            </p>
                                        </div>
                                    </div>

                                    <AccessSwitch className="w-20 h-10" />
                                </div>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Page;
