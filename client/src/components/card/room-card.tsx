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

const RoomCard = () => {
    const [open, setOpen] = useState(false);
    const [store] = useAtom(storeAtom);
    const setMessage = useSetAtom(messageAtom);
    const message = useAtomValue(messageAtom);

    const { openModal } = useModal();

    const handleSelect = useCallback(
        (currentValue: string) => {
            setMessage((prev) => ({ ...prev, room: currentValue }));
            setOpen(false);
        },
        [setMessage]
    );

    const handleClear = useCallback(() => {
        setMessage((prev) => ({ ...prev, room: "" }));
    }, [setMessage]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <div className="flex justify-between items-center">
                        <h2>Room</h2>

                        <Button
                            variant="ghost"
                            className="border border-gray-300"
                            onClick={() => openModal("ROOMS")}
                        >
                            <Pencil className="w-5 h-5" />
                            <span className="sr-only">Edit Roles</span>
                        </Button>
                    </div>
                </CardTitle>
                <CardDescription>
                    Select a room to send in your message.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label>Room</Label>
                            <Popover open={open} onOpenChange={setOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        aria-expanded={open}
                                        className="w-full justify-between"
                                    >
                                        {message.room
                                            ? store.rooms.find(
                                                  (room) =>
                                                      room.value ===
                                                      message.room
                                              )?.label
                                            : "Rooms List"}
                                        <ChevronsUpDown className="ml-2 h-6 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </PopoverTrigger>

                                <PopoverContent className="w-[200px] p-0">
                                    <Command>
                                        <CommandInput placeholder="Search room..." />
                                        <CommandEmpty>
                                            No rooms found.
                                        </CommandEmpty>
                                        <CommandGroup id="room">
                                            {store.rooms.map((room) => (
                                                <CommandList key={room.value}>
                                                    <CommandItem
                                                        value={room.value}
                                                        onSelect={handleSelect}
                                                    >
                                                        <Check
                                                            className={cn(
                                                                "mr-2 h-4 w-4",
                                                                message.room ===
                                                                    room.value
                                                                    ? "opacity-100"
                                                                    : "opacity-0"
                                                            )}
                                                        />
                                                        {room.label}
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
                    Room Selected:{" "}
                    {message.room ? message.room : "No room selected."}
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
export default RoomCard;
