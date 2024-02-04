import React, { useEffect, useState } from "react";
import { Dot, Lightbulb, Zap, ArrowUpRightFromCircle } from "lucide-react";

import ActionCarousel from "./ActionCarousel";
import { DataResponse } from "./Chat";
import Representative from "./Representative";

export type RepresentativeType = {
    name: string;
    party: string;
    pictureUrl: string;
    type: string;
    district: number;
};

const Actions = ({
                     bill,
                     zipCode
                 }: {
    bill: DataResponse | undefined;
    zipCode: number;
}) => {
    if (bill == undefined) {
        return (
            <div className="flex-center w-full h-full">
                <img src="./raccoon.png" className="object-cover w-[400px]" />
            </div>
        );
    }
    const [representatives, setRepresentatives] =
        useState<RepresentativeType[]>();

    const handleZip = async () => {
        console.log(zipCode);

        const response = await fetch(
            `api/trpc/getLegislatorsByZip?input={"zip":%20"${encodeURIComponent(
                zipCode
            )}"}`
        );

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const newData = await response.json();

        console.log(newData);

        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        setRepresentatives(newData.result.data);
    };

    useEffect(() => {
        void handleZip();

        return () => {
            void handleZip();
        };
    }, []);

    const [repMode, setRepMode] = useState(false);
    const [repIndex, setRepIndex] = useState(0);

    const handleRepMode = (index?: number) => {
        setRepMode(index == -1 ? false : true);
        setRepIndex(index ?? 0);
    };

    return (
        <>
            {repMode ? (
                <div className="flex-grow flex h-full w-full">
                    <Representative
                        handleRepMode={handleRepMode}
                        repIndex={repIndex}
                        bill={bill}
                        representative={
                            representatives
                                ? representatives[repIndex >= 0 ? repIndex : 0]
                                : undefined
                        }
                    />
                </div>
            ) : (
                <div className="space-y-5 h-full flex flex-col w-full">
                    <div className="flex items-center space-x-4">
                        <div
                            className="flex items-center space-x-2 text-jas-pink bg-jas-pink bg-opacity-25 px-4 py-2 rounded-2xl">
                            <Zap className="size-6 popover" />
                            <p className="font-bold">one-sentence summary</p>
                        </div>
                        <div className="flex items-center space-x-2 text-jas-dark">
                            <Dot className="size-8 -m-4" />
                            <a className="font-semibold text-xl hover:underline text-jas-dark"
                               href={"https://leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id=" + bill.id}>
                                {bill.measure}
                            </a>
                            <ArrowUpRightFromCircle/>
                        </div>
                    </div>

                    <div>
                        <h1 className="font-bold text-4xl line-clamp-2">
                            {bill.subject}
                        </h1>
                    </div>

                    <div className="flex space-x-4 bg-white p-6 rounded-3xl">
                        <div className="bg-jas-purple bg-opacity-10 w-fit h-fit p-4 rounded-2xl">
                            <Lightbulb
                                className="text-jas-purple"
                                fill="#7B5AFF"
                            />
                        </div>
                        <div className="space-y-2 w-[90%]">
                            <h1 className="font-bold text-3xl">
                                What you need to know
                            </h1>
                            <p className="font-semibold text-xl text-jas-dark leading-7 line-clamp-4">
                                {bill.summary}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="bg-jas-purple bg-opacity-10 w-fit h-fit p-4 rounded-2xl">
                            <Zap className="text-jas-purple" fill="#7B5AFF" />
                        </div>
                        <h2 className="font-bold text-3xl">Take Action</h2>
                    </div>

                    <div className="flex-grow flex">
                        <ActionCarousel
                            handleRepMode={handleRepMode}
                            // zipCode={zipCode}
                            representatives={representatives}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default Actions;
