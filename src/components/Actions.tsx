import React, { useState } from "react";
import { Dot, Lightbulb, Zap } from "lucide-react";

import ActionCarousel from "./ActionCarousel";
import Representative from "./Representative";

const Actions = ({ bill }: { bill: string | undefined }) => {
    if (bill == undefined) {
        return (
            <div className="flex-center w-full h-full">
                <img src="./raccoon.png" className="object-cover w-[400px]" />
            </div>
        );
    }

    const [repMode, setRepMode] = useState(false);

    const handleRepMode = (state: boolean) => {
        setRepMode(state);
    };

    return (
        <>
            {repMode ? (
                <div className="flex-grow flex h-full w-full">
                    <Representative handleRepMode={handleRepMode} />
                </div>
            ) : (
                <div className="space-y-5 h-full flex flex-col w-full">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2 text-jas-pink bg-jas-pink bg-opacity-25 px-4 py-2 rounded-2xl">
                            <Zap className="size-6 popover" />
                            <p className="font-bold">one-sentence summary</p>
                        </div>
                        <div className="flex items-center space-x-2 text-jas-dark">
                            <Dot className="size-8 -m-4" />
                            <p className="font-semibold text-xl">{bill}</p>
                        </div>
                    </div>

                    <div>
                        <h1 className="font-bold text-4xl line-clamp-2">
                            A bill that increases access to Hormone Therapy
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
                            <p className="font-semibold text-xl text-jas-dark leading-7">
                                The proposed bill aims to make Hormone Therapy
                                more accessible. This means ensuring that more
                                people can easily obtain the necessary
                                medications and treatment.
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
                        <ActionCarousel handleRepMode={handleRepMode} />
                    </div>
                </div>
            )}
        </>
    );
};

export default Actions;
