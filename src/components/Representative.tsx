import { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import {
    ArrowLeft /*Sparkle,*/,
    Mail,
    Send,
    Sparkles /*Vote*/,
} from "lucide-react";

import { RepresentativeType } from "./Actions";
import { DataResponse } from "./Chat";
import Tinymce from "./tinymce";
import { Button } from "./ui/button";

const Representative = (props: {
    handleRepMode: (index: number) => void;
    bill: DataResponse;
    repIndex: number;
    representative: RepresentativeType | undefined;
}) => {
    const [value, setValue] = useState("");

    const handleClick = () => {
        props.handleRepMode(-1);

        // setLoading(true);
        // setTimeout(() => {
        //     props.handleRepMode(false);
        //     setLoading(false);
        // }, 2000);
    };

    const [email, setEmail] = useState("");

    const writeEmail = async () => {
        console.log(props.bill);
        const response = await fetch(
            `api/trpc/writeEmailToLegislator?input={"legislatorName":%20"${encodeURIComponent(
                props.representative?.name ?? "",
            )}", "billId":%20"${encodeURIComponent(props.bill.id)}"}`,
        );

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const newData = await response.json();

        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        setEmail(newData.result.data.message);
    };

    useEffect(() => {
        void writeEmail();

        return () => {
            void writeEmail();
        };
    }, []);

    // const response = await fetch(
    //     `api/trpc/writeEmailToLegislator?input={"legislatorName": ${legislator.name}}"}`,
    // );
    // //localhost:3000/api/trpc/writeEmailToLegislator?input={%22legislatorName%22:%20%22Joe%20Williams,%20%22billId%22:%20%2212345%22}%22}
    // http:

    return (
        <div className="space-y-6 flex flex-col w-full">
            <div className="flex space-x-4">
                <div
                    onClick={handleClick}
                    className="flex items-center space-x-2 text-jas-dark h-fit bg-[#ECECEC] border-black border-2 border-opacity-10 bg-opacity-25 p-2 rounded-xl cursor-pointer w-fit"
                >
                    <ArrowLeft className="size-6" />
                </div>

                <div className="flex flex-col space-y-4">
                    <h1 className="text-5xl font-bold">
                        {props.representative?.name ?? "John Williams"}
                    </h1>
                    {/* <div className="flex space-x-2">
                        <div className="flex items-center space-x-2 text-jas-pink bg-jas-pink bg-opacity-25 px-4 py-3 w-fit rounded-2xl">
                            <Vote className="size-6 popover" />
                            <p className="font-semibold">Lobbyist</p>
                        </div>
                        <div className="flex items-center space-x-2 text-[#6C6C6C] bg-[#ECECEC] px-4 py-3 w-fit rounded-2xl">
                            <p className="font-semibold">Racial Equality</p>
                        </div>
                        <div className="flex items-center space-x-2 text-[#6C6C6C] bg-[#ECECEC] px-4 py-3 w-fit rounded-2xl">
                            <p className="font-semibold">Civil Rights</p>
                        </div>
                    </div> */}
                </div>
            </div>

            {/* <div className="flex space-x-4 bg-white p-6 rounded-3xl">
                <div className="bg-jas-pink bg-opacity-10 w-fit h-fit p-4 rounded-2xl">
                    <Sparkle className="text-jas-pink" fill="#CA5AFF" />
                </div>
                <div className="space-y-2 w-[90%]">
                    <h1 className="font-bold text-2xl">
                        Their impact on LGBTQ issues
                    </h1>
                    <p className="font-semibold text-lg text-jas-dark leading-7">
                        Est officia consequat id nostrud. Mollit est nisi
                        deserunt ex qui minim excepteur qui deserunt laborum
                        incididunt.
                    </p>
                </div>
            </div> */}

            <Card className="h-full flex-grow rounded-3xl relative">
                <CardHeader className="pb-4">
                    <div className="flex items-center space-x-2 text-jas-pink bg-jas-pink bg-opacity-10 px-4 py-2 rounded-2xl w-fit">
                        <Sparkles className="size-6" fill="#CA5AFF" />
                        <p className="font-bold">AI-generated Email</p>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4 pb-4">
                    <h3 className="font-bold text-3xl line-clamp-1">
                        Letter to your rep.
                    </h3>
                    <div className="flex items-center space-x-2 bg-[#ECECEC] text-[#6C6C6C] px-4 p-2 rounded-xl w-fit">
                        <Mail className="size-4" />
                        <p className="font-regular text-base">lily@gmail.com</p>
                    </div>

                    <Tinymce
                        initialValue={email}
                        handleValueChange={setValue}
                    />
                    {/* <p className="font-semibold text-lg bg-gradient-to-b from-jas-dark via-gray-400 to-jas-light inline-block text-transparent bg-clip-text line-clamp-4">
                        Nulla exercitation minim ea occaecat adipisicing
                        consectetur aliquip ea. Et cupidatat non labore irure
                        pariatur laborum cupidatat et tempor enim voluptate
                        pariatur. Sint cillum nulla anim magna. In anim et ipsum
                        consectetur sint eiusmod excepteur. Nostrud ipsum
                        excepteur eu officia cupidatat. In Lorem ad
                        reprehenderit culpa aute id ad.
                    </p> */}
                </CardContent>
                <CardFooter className="absolute bottom-4 w-full space-x-4">
                    {/* <Button
                        className="w-full rounded-xl py-6 text-[#6C6C6C] text-xl bg-[#ECECEC] hover:bg-jas-purple/80"
                        onClick={handleClick}
                    >
                        Revise Message
                    </Button> */}
                    <a
                        href={`mailto:yourrepresentative@gmail.com?subject=${encodeURIComponent(
                            `Concerning ${props.bill.subject}`,
                        )}&body=${encodeURIComponent(value)}`}
                        className="flex-center w-full"
                    >
                        <Button
                            className="w-full rounded-xl py-6 bg-jas-purple text-xl hover:bg-jas-purple/80 gap-x-2"
                            // onClick={handleClick}
                        >
                            <Send /> <p>Send Off</p>
                        </Button>
                    </a>
                </CardFooter>
            </Card>
        </div>
    );
};

export default Representative;
