import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { Heart } from "lucide-react";

import { Button } from "./ui/button";

const ActionCarousel = () => {
    return (
        <div className="flex min-h-full space-x-4 overflow-y-scroll">
            {[...Array(3).keys()].map((index) => (
                <Card
                    className="min-w-[250px] min-h-full flex-grow rounded-3xl"
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
                            HRT Advocacy
                        </h3>
                        <div className="flex items-center space-x-2 bg-jas-pink text-jas-pink bg-opacity-25 px-2 py-1 rounded-xl w-fit">
                            <Heart className="size-4" />
                            <p className="font-semibold">Support</p>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full rounded-xl bg-jas-purple hover:bg-jas-purple/80">
                            Join Now
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
};

export default ActionCarousel;
