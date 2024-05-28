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

const RolesCard = () => {
    const [open, setOpen] = useState(false);
    const { openModal } = useModal();
    const [store] = useAtom(storeAtom);
    const setMessage = useSetAtom(messageAtom);
    const message = useAtomValue(messageAtom);

    const handleSelect = useCallback(
        (currentValue: string) => {
            setMessage((prev) => ({ ...prev, role: currentValue }));
            setOpen(false);
        },
        [setMessage]
    );

    const handleClear = useCallback(() => {
        setMessage((prev) => ({ ...prev, role: "" }));
    }, [setMessage]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <div className="flex justify-between items-center">
                        <h2>Role</h2>

                        <Button
                            variant="ghost"
                            className="border border-gray-300"
                            onClick={() => openModal("ROLES")}
                        >
                            <Pencil className="w-5 h-5" />
                            <span className="sr-only">Edit Roles</span>
                        </Button>
                    </div>
                </CardTitle>
                <CardDescription>
                    Select a role to send in your message.
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
                                        {message.role
                                            ? store.roles.find(
                                                  (role) => role.value === message.role
                                              )?.label
                                            : "Roles List"}
                                        <ChevronsUpDown className="ml-2 h-6 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </PopoverTrigger>

                                <PopoverContent className="w-[200px] p-0">
                                    <Command>
                                        <CommandInput placeholder="Search role..." />
                                        <CommandEmpty>
                                            No roles found.
                                        </CommandEmpty>
                                        <CommandGroup id="role">
                                            {store.roles.map((role) => (
                                                <CommandList key={role.value}>
                                                    <CommandItem
                                                        value={role.value}
                                                        onSelect={handleSelect}
                                                    >
                                                        <Check
                                                            className={cn(
                                                                "mr-2 h-4 w-4",
                                                                message.role ===
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
                    Role Selected:{" "}
                    {message.role ? message.role : "No role selected."}
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
export default RolesCard;
