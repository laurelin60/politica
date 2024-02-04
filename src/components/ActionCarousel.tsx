import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { MapPin } from "lucide-react";

import { Button } from "./ui/button";

const ActionCarousel = (props: { handleRepMode: (state: boolean) => void }) => {
    const handleClick = () => {
        props.handleRepMode(true);
    };

    return (
        <div className="flex min-h-full space-x-4 overflow-y-scroll">
            {[...Array(3).keys()].map((index) => (
                <Card
                    className="min-w-[250px] min-h-full flex-grow rounded-3xl relative"
                    key={index}
                >
                    <CardHeader className="pb-4">
                        <img
                            src={
                                "https://i.etsystatic.com/24319171/r/il/aa9ecf/3947326330/il_fullxfull.3947326330_537d.jpg"
                            }
                            alt="crime raccoon"
                            className="w-[250px] h-[150px] object-contain border-2 rounded-2xl"
                        />
                    </CardHeader>
                    <CardContent className="space-y-1 pb-4">
                        <h3 className="font-bold text-2xl line-clamp-1">
                            John Williams
                        </h3>
                        <div className="flex items-center space-x-2 bg-jas-dark text-jas-dark bg-opacity-25 px-3 py-2 rounded-xl w-fit">
                            <MapPin className="size-5" />
                            <p className="font-semibold">Support</p>
                        </div>
                    </CardContent>
                    <CardFooter className="absolute bottom-2 w-full pb-2">
                        <Button
                            className="w-full rounded-xl bg-jas-purple hover:bg-jas-purple/80"
                            onClick={handleClick}
                        >
                            Join Now
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
};

export default ActionCarousel;
