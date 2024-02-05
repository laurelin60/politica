"use client";

import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import Access from "@/components/Access";
import Actions from "@/components/Actions";
import Chat, { DataResponse } from "@/components/Chat";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";

const Page = () => {
    const [bill, setBill] = useState<DataResponse>();
    // const [visual, setVisual] = useState(false);
    const [adhd, setAdhd] = useState(false);
    const [yPosition, setYPosition] = useState<number>(0);

    const handleSelect = (billTitle: DataResponse) => {
        setBill((prevBill) =>
            prevBill?.measure == billTitle.measure ? undefined : billTitle,
        );
    };

    // const handleVisual = () => {
    //     setVisual((prevVisual) => !prevVisual);
    // };

    const handleAdhd = () => {
        setAdhd((prevAdhd) => !prevAdhd);
    };

    const [bottom, setBottom] = useState(0);

    const handleMouseMove = (e: MouseEvent) => {
        setYPosition(e.clientY);
        setBottom(1728 - yPosition - 922 + 20);
    };

    const [tutorial, setTutorial] = useState(true);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedTutorial =
                window.localStorage.getItem("politiCAtutorial");
            if (!storedTutorial) {
                setStage(0);
                setTutorial(false);
            }

            const windowZipCode = parseInt(
                window.localStorage.getItem("politiCAzipcode") ?? "",
            );
            if (zipCode && !isNaN(windowZipCode)) {
                setZipCode(windowZipCode);
            }
        }
    }, []);

    const [stage, setStage] = useState(-1);
    const [location, setLocation] = useState("");

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLocation(e.currentTarget.value);
    };

    const handleEnd = () => {
        setStage(3);

        if (typeof window !== "undefined") {
            window.localStorage.setItem("politiCAtutorial", "true");
        }

        setTutorial(true);
    };

    const [zipCode, setZipCode] = useState<number>(90095);

    const handleZipCode = (zipCode: number) => {
        setZipCode(zipCode);

        if (typeof window !== "undefined") {
            window.localStorage.setItem("politiCAzipcode", zipCode.toString());
        }
    };

    return (
        <>
            <div
                onMouseMove={handleMouseMove}
                className={cn("max-h-[100vh]", !tutorial && "brightness-50")}
            >
                <img
                    src="./sideNavPolitica.svg"
                    style={{
                        height: "100vh",
                        position: "absolute",
                        left: "0",
                        top: "0",
                        zIndex: "2000",
                    }}
                />

                <div className={cn("relative")}>
                    <div className="w-full h-[100vh] flex wrapper bg-jas-light py-8 space-x-8">
                        <div className="w-[55%] px-8 bg-white rounded-4xl">
                            <Chat onSelect={handleSelect} />
                        </div>
                        <div className="w-[45%]">
                            <Actions bill={bill} zipCode={zipCode} />
                        </div>
                    </div>
                    <Access adhd={adhd} handleAdhd={handleAdhd} />
                </div>

                {adhd ? (
                    <>
                        <div
                            className={cn(
                                "absolute z-50 opacity-50 bg-black w-full",
                                "h-[100vh] overflow-hidden",
                            )}
                            style={{
                                left: 0,
                                top: `calc(${yPosition}px - 107.5vh)`,
                            }}
                        />
                        <div
                            className={cn(
                                "absolute z-50 opacity-50 bg-black w-full overflow-hidden",
                                `h-[${bottom}px]]`,
                            )}
                            style={{
                                left: 0,
                                top: `calc(${yPosition}px + 7.5vh)`,
                                height: `${bottom}px`,
                            }}
                        />
                    </>
                ) : null}
            </div>

            <div>
                {!tutorial && (
                    <div className="fixed inset-0 flex items-center justify-center">
                        <div className="bg-white w-[500px] h-fit rounded-4xl flex items-center p-8 flex-col space-y-8 relative">
                            {stage === 0 ? (
                                <div className="pb-12 space-y-8">
                                    <img
                                        src="./onboard_1.png"
                                        className="h-fit"
                                    />
                                    <div className="space-y-4 flex-center flex-col">
                                        <div className="flex flex-col flex-center space-y-2">
                                            <h1 className="font-bold text-4xl">
                                                Welcome to{" "}
                                                <span className="text-jas-purple">
                                                    PolitiCA
                                                </span>
                                            </h1>
                                            <h3 className="text-xl font-medium text-jas-dark">
                                                Your personalized legislative
                                                assistant
                                            </h3>
                                        </div>
                                        <Button
                                            className="bg-jas-purple hover:bg-jas-purple/80 text-white py-7 px-8 rounded-2xl text-2xl"
                                            onClick={() => setStage(1)}
                                        >
                                            Start Now
                                        </Button>
                                    </div>
                                </div>
                            ) : stage === 1 ? (
                                <div className="space-y-4 flex-center flex-col pb-12">
                                    <div className="flex flex-col text-center flex-center space-y-1">
                                        <h1 className="font-bold text-3xl">
                                            Enter your location
                                        </h1>
                                        <h3 className="text-lg w-[80%] font-medium text-jas-dark">
                                            Get personalized political
                                            information based on your location
                                        </h3>
                                    </div>

                                    <Input
                                        value={location}
                                        placeholder="Enter your location"
                                        onChange={handleInputChange}
                                        className="input-form bg-[#ECECEC] py-6 text-lg text-opacity-70 text-black h-14 rounded-2xl border-2 active:ring-black active:ring-opacity-60"
                                    />

                                    <Button
                                        className="bg-jas-purple hover:bg-jas-purple/80 text-white py-6 px-7 rounded-2xl text-xl"
                                        onClick={() => {
                                            setStage(2);
                                            handleZipCode(parseInt(location));
                                        }}
                                    >
                                        Confirm Location
                                    </Button>
                                </div>
                            ) : (
                                <AdvocacyInterests handleEnd={handleEnd} />
                            )}

                            <div className="space-x-4 flex flex-row absolute bottom-8">
                                {[...Array(stage).keys()].map((index) => (
                                    <div
                                        className="bg-jas-purple p-2 w-20 rounded-full h-4"
                                        key={index}
                                    />
                                ))}
                                {[...Array(2 - stage + 1).keys()].map(
                                    (index) => (
                                        <div
                                            className="bg-jas-dark bg-opacity-25 p-2 w-20 rounded-full h-4"
                                            key={index}
                                        />
                                    ),
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Page;

const AdvocacyInterests = (props: { handleEnd: () => void }) => {
    return (
        <div className="space-y-4 flex-center flex-col pb-12">
            <div className="flex flex-col text-center flex-center space-y-1">
                <h1 className="font-bold text-3xl">
                    Select your advocacy interests
                </h1>
                <h3 className="text-lg w-[90%] font-medium text-jas-dark">
                    choose areas that most resonate with you
                </h3>
            </div>

            <ToggleGroup
                type="multiple"
                className="grid grid-cols-3 gap-2 pb-4"
            >
                <ToggleGroupItem
                    value="LGBTQ+"
                    className="bg-jas-dark font-medium text-base p-5 rounded-xl bg-opacity-25 border-jas-dark border-opacity-25 border-2 hover:border-jas-purple text-jas-dark hover:bg-jas-purple/10 hover:text-jas-purple transition-all"
                >
                    LGBTQ+
                </ToggleGroupItem>
                <ToggleGroupItem
                    value="gender"
                    className="bg-jas-dark font-medium text-base p-5 rounded-xl bg-opacity-25 border-jas-dark border-opacity-25 border-2 hover:border-jas-purple text-jas-dark hover:bg-jas-purple/10 hover:text-jas-purple transition-all"
                >
                    Gender
                </ToggleGroupItem>
                <ToggleGroupItem
                    value="race"
                    className="bg-jas-dark font-medium text-base p-5 rounded-xl bg-opacity-25 border-jas-dark border-opacity-25 border-2 hover:border-jas-purple text-jas-dark hover:bg-jas-purple/10 hover:text-jas-purple transition-all"
                >
                    Education
                </ToggleGroupItem>
                <ToggleGroupItem
                    value="equality"
                    className="bg-jas-dark font-medium text-base p-5 rounded-xl bg-opacity-25 border-jas-dark border-opacity-25 border-2 hover:border-jas-purple text-jas-dark hover:bg-jas-purple/10 hover:text-jas-purple transition-all"
                >
                    Equality
                </ToggleGroupItem>
                <ToggleGroupItem
                    value="mental health"
                    className="bg-jas-dark font-medium text-sm p-5 rounded-xl bg-opacity-25 border-jas-dark border-opacity-25 border-2 hover:border-jas-purple text-jas-dark hover:bg-jas-purple/10 hover:text-jas-purple transition-all"
                >
                    Mental Health
                </ToggleGroupItem>
                <ToggleGroupItem
                    value="culture"
                    className="bg-jas-dark font-medium text-base p-5 rounded-xl bg-opacity-25 border-jas-dark border-opacity-25 border-2 hover:border-jas-purple text-jas-dark hover:bg-jas-purple/10 hover:text-jas-purple transition-all"
                >
                    Financial
                </ToggleGroupItem>
            </ToggleGroup>

            <Button
                className="bg-jas-purple hover:bg-jas-purple/80 text-white py-6 px-7 rounded-2xl text-xl"
                onClick={props.handleEnd}
            >
                Confirm Selection
            </Button>
        </div>
    );
};
