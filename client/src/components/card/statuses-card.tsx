import { useState, useCallback } from "react";
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
import { Check, ChevronsUpDown, Pencil } from "lucide-react";

import { cn } from "@/lib/utils";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { useModal } from "@/components/modals/context";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { messageAtom, storeAtom } from "@/components/context";

const StatusesCard = () => {
    const [open, setOpen] = useState(false);
    const [store] = useAtom(storeAtom);
    const { openModal } = useModal();
    const setMessage = useSetAtom(messageAtom);
    const message = useAtomValue(messageAtom);

    const handleSelect = useCallback(
        (currentValue: string) => {
            setMessage((prev) => ({ ...prev, status: currentValue }));
            setOpen(false);
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
                            <span className="sr-only">Edit Roles</span>
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
                            <Popover open={open} onOpenChange={setOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        aria-expanded={open}
                                        className="w-full justify-between"
                                    >
                                        {message.status
                                            ? store.statuses.find(
                                                  (status) =>
                                                      status.value ===
                                                      message.status
                                              )?.label
                                            : "Statuses List"}
                                        <ChevronsUpDown className="ml-2 h-6 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </PopoverTrigger>

                                <PopoverContent className="w-[200px] p-0">
                                    <Command>
                                        <CommandInput placeholder="Search status..." />
                                        <CommandEmpty>
                                            No statuses found.
                                        </CommandEmpty>
                                        <CommandGroup id="status">
                                            {store.statuses.map((status) => (
                                                <CommandList key={status.value}>
                                                    <CommandItem
                                                        value={status.value}
                                                        onSelect={handleSelect}
                                                    >
                                                        <Check
                                                            className={cn(
                                                                "mr-2 h-4 w-4",
                                                                message.status ===
                                                                    status.value
                                                                    ? "opacity-100"
                                                                    : "opacity-0"
                                                            )}
                                                        />
                                                        {status.label}
                                                    </CommandItem>
                                                </CommandList>
                                            ))}
                                        </CommandGroup>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                </form>
                <p className="text-sm text-gray-500 mt-2">
                    Status Selected:{" "}
                    {message.status ? message.status : "No status selected."}
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
