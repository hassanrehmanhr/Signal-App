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
import { Check, ChevronsUpDown } from "lucide-react";

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

const roles = [
    {
        value: "lobby",
        label: "Lobby",
    },
    {
        value: "exam1",
        label: "Exam 1",
    },
    {
        value: "exam2",
        label: "Exam 2",
    },
    {
        value: "prep1",
        label: "Prep 1",
    },
    {
        value: "line1",
        label: "Line 1",
    },
    {
        value: "line2",
        label: "Line 2",
    },
];

const RolesCard = () => {
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
                <CardTitle>Role</CardTitle>
                <CardDescription>
                    Select a status to send in your message.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label>Role</Label>
                            <Popover open={open} onOpenChange={setOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        aria-expanded={open}
                                        className="w-full justify-between"
                                    >
                                        {value
                                            ? roles.find(
                                                  (role) => role.value === value
                                              )?.label
                                            : "Roles List"}
                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </PopoverTrigger>

                                <PopoverContent className="w-[200px] p-0">
                                    <Command>
                                        <CommandInput placeholder="Search role..." />
                                        <CommandEmpty>
                                            No roles found.
                                        </CommandEmpty>
                                        <CommandGroup id="role">
                                            {roles.map((role) => (
                                                <CommandList key={role.value}>
                                                    <CommandItem
                                                        value={role.value}
                                                        onSelect={handleSelect}
                                                    >
                                                        <Check
                                                            className={cn(
                                                                "mr-2 h-4 w-4",
                                                                value ===
                                                                    role.value
                                                                    ? "opacity-100"
                                                                    : "opacity-0"
                                                            )}
                                                        />
                                                        {role.label}
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
                    Role Selected: {value ? value : "No role selected."}
                </p>
            </CardContent>

            <CardFooter className="flex justify-between">
                <Button onClick={handleClear}>Clear</Button>
            </CardFooter>
        </Card>
    );
};
export default RolesCard;
