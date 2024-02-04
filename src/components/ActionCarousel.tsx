// import { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { Hand, MapPin } from "lucide-react";

import { RepresentativeType } from "./Actions";
import { Button } from "./ui/button";

const ActionCarousel = (props: {
    handleRepMode: (state: number) => void;
    representatives: RepresentativeType[] | undefined;
    // zipCode: number;
}) => {
    const handleClick = (index: number) => {
        props.handleRepMode(index);
    };

    // const [key, setKey] = useState(0);

    // // const [representatives, setRepresentatives] =
    // //     useState<RepresentativeType[]>();

    // // const handleZip = async () => {
    // //     const response = await fetch(
    // //         `api/trpc/getLegislatorsByZip?input={"zip":%20"${encodeURIComponent(
    // //             props.zipCode,
    // //         )}"}`,
    // //     );

    // //     // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    // //     const newData = await response.json();

    // //     console.log(newData);

    // //     // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    // //     setRepresentatives(newData.result.data);
    // //     console.log(representatives);
    // //     setKey((prevKey) => prevKey + 1);
    // // };

    // // useEffect(() => {
    // //     void handleZip();

    // //     return () => {
    // //         void handleZip();
    // //     };
    // // }, []);

    return (
        <div
            className="flex min-h-full space-x-4 overflow-y-scroll" /*key={key}*/
        >
            {props.representatives?.map((representative, index) => (
                <Card
                    className="min-w-[250px] min-h-full flex-grow rounded-3xl relative"
                    key={representative.name + index}
                >
                    <CardHeader className="pb-4">
                        <img
                            src={representative.pictureUrl}
                            alt="crime raccoon"
                            className="w-[250px] h-[150px] object-contain border-2 rounded-2xl"
                        />
                    </CardHeader>
                    <CardContent className="space-y-1 pb-4">
                        <h3 className="font-bold text-2xl line-clamp-1">
                            {representative.name}
                        </h3>
                        <div className="flex items-center space-x-2 bg-jas-dark text-jas-dark bg-opacity-25 px-3 py-2 rounded-xl w-fit">
                            <MapPin className="size-5" />
                            <p className="font-semibold">
                                District {representative.district}
                            </p>
                        </div>
                    </CardContent>
                    <CardFooter className="absolute bottom-2 w-full pb-2">
                        <Button
                            className="w-full rounded-xl bg-jas-purple hover:bg-jas-purple/80"
                            onClick={() => handleClick(index)}
                        >
                            <Hand className="mr-2" /> Reach Out
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
};

export default ActionCarousel;
