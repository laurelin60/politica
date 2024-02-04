import { AccessSwitch } from "@/components/ui/access-switch";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { /*Eye,*/ FileText, Sparkles } from "lucide-react";

interface AccessProps {
    adhd: boolean;
    handleAdhd: () => void;
}

const Access = ({ adhd, handleAdhd }: AccessProps) => {
    return (
        <>
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
                                {/* <div className="flex space-x-4 bg-white py-6 rounded-3xl flex-between">
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
                                        <AccessSwitch
                                            checked={visual}
                                            className="w-20 h-10"
                                            onClick={handleVisual}
                                        />
                                    </div> */}
                                <div className="flex space-x-4 bg-white py-6 rounded-3xl flex-between">
                                    <div className="flex space-x-4">
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
                                    <AccessSwitch
                                        checked={adhd}
                                        className="w-20 h-10"
                                        onClick={handleAdhd}
                                    />
                                </div>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default Access;
