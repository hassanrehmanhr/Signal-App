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

const statuses = [
    {
        value: "needed",
        label: "Needed",
    },
    {
        value: "patient-ready",
        label: "Patient Ready",
    },
    {
        value: "call-on",
        label: "Call On",
    },
    {
        value: "patient-check",
        label: "Patient Check",
    },
];

const StatusesCard = () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");

    const handleSelect = useCallback(
        (currentValue: string) => {
            setValue(currentValue === value ? "" : currentValue);
            setOpen(false);
        },
        [value]
    );

    const handleClear = useCallback(() => {
        setValue("");
    }, []);

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <div className="flex justify-between items-center">
                        <h2>Status</h2>

                        <Button
                            variant="ghost"
                            className="border border-gray-300"
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
                                        {value
                                            ? statuses.find(
                                                  (status) =>
                                                      status.value === value
                                              )?.label
                                            : "Statuses List"}
                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </PopoverTrigger>

                                <PopoverContent className="w-[200px] p-0">
                                    <Command>
                                        <CommandInput placeholder="Search status..." />
                                        <CommandEmpty>
                                            No statuses found.
                                        </CommandEmpty>
                                        <CommandGroup id="status">
                                            {statuses.map((status) => (
                                                <CommandList key={status.value}>
                                                    <CommandItem
                                                        value={status.value}
                                                        onSelect={handleSelect}
                                                    >
                                                        <Check
                                                            className={cn(
                                                                "mr-2 h-4 w-4",
                                                                value ===
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
                    Status Selected: {value ? value : "No status selected."}
                </p>
            </CardContent>

            <CardFooter>
                <Button onClick={handleClear} className="w-full">
                    Clear
                </Button>
            </CardFooter>
        </Card>
    );
};
export default StatusesCard;
