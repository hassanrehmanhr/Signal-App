import {useCallback } from "react";
import Button from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardFooter,
    CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Pencil } from "lucide-react";

import { useModal } from "@/components/modals/context";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { messageAtom, storeAtom } from "@/components/context";

const StatusesCard = () => {
    const [store] = useAtom(storeAtom);
    const setMessage = useSetAtom(messageAtom);
    const message = useAtomValue(messageAtom);

    const { openModal } = useModal();

    const handleSelect = useCallback(
        (currentValue: string) => {
            setMessage((prev) => ({ ...prev, status: currentValue }));
        },
        [setMessage]
    );

    const handleClear = useCallback(() => {
        setMessage((prev) => ({ ...prev, status: "" }));
    }, [setMessage]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <div className="flex justify-between items-center">
                        <h2>Status</h2>

                        <Button
                            variant="ghost"
                            className="border border-gray-300"
                            onClick={() => openModal("STATUSES")}
                        >
                            <Pencil className="w-5 h-5" />
                            <span className="sr-only">Edit Statuses</span>
                        </Button>
                    </div>
                </CardTitle>
                <CardDescription>
                    Select a status to send in your message.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label>Status</Label>
                            <div className="flex flex-wrap gap-2">
                                {store.statuses.map((status) => (
                                    <Button
                                        key={status.value}
                                        variant={
                                            message.status === status.value
                                                ? "solid"
                                                : "outline"
                                        }
                                        onClick={() => handleSelect(status.value)}
                                    >
                                        {status.label}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </div>
                </form>
                <p className="text-sm text-gray-500 mt-2">
                    Status Selected: {message.status ? message.status : "No status selected"}
                </p>
            </CardContent>

            <CardFooter>
                <Button onClick={handleClear} className="w-full" size="lg">
                    Clear
                </Button>
            </CardFooter>
        </Card>
    );
};
export default StatusesCard;