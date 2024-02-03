import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Check, FileText } from "lucide-react";

import { Button } from "./ui/button";

const AssistantMessage = () => {
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

            <div className="space-y-2 bg-[#F7F6F9] p-6 rounded-3xl">
                <div className="flex items-center space-x-2 px-2">
                    <div className="bg-[#7B5AFF] bg-opacity-25 rounded-xl p-2">
                        <FileText className="text-[#7B5AFF] stroke-[#7B5AFF] fill-primary-popover   " />
                    </div>
                    <h6 className="font-bold text-xl text-opacity-75">
                        Check out these bills
                    </h6>
                </div>

                <div className="space-y-4">
                    <div className="flex-between p-8 rounded-4xl border-4 border-[#F7F6F9] bg-white hover:border-blue-500 focus:border-blue-500 focus:outline-none">
                        <div className="w-[80%]">
                            <h3 className="text-xl font-semibold opacity-50">
                                CA Bill 234
                            </h3>
                            <h1 className="text-3xl font-bold">
                                Increasing access to Hormone Therapy
                            </h1>
                        </div>
                        <Button
                            aria-label="clicked"
                            className="size-12 rounded-full"
                        >
                            <Check className="min-w-10" />
                        </Button>
                    </div>
                    <div className="bg-white p-8 rounded-4xl border-4 border-white hover:border-blue-500 focus:border-blue-500 focus:outline-none">
                        <h3 className="text-xl font-semibold opacity-50">
                            CA Bill 234
                        </h3>
                        <h1 className="text-3xl font-bold">
                            Increasing access to Hormone Therapy
                        </h1>
                    </div>
                    <div className="bg-white p-8 rounded-4xl border-4 border-white hover:border-blue-500 focus:border-blue-500 focus:outline-none">
                        <h3 className="text-xl font-semibold opacity-50">
                            CA Bill 234
                        </h3>
                        <h1 className="text-3xl font-bold">
                            Increasing access to Hormone Therapy
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AssistantMessage;
