import { useCallback } from "react";
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

const RolesCard = () => {
    const { openModal } = useModal();
    const [store] = useAtom(storeAtom);
    const setMessage = useSetAtom(messageAtom);
    const message = useAtomValue(messageAtom);

    const handleSelect = useCallback(
        (currentValue: string) => {
            setMessage((prev) => ({ ...prev, role: currentValue }));
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
                            <div className="flex flex-wrap gap-2">
                                {store.roles.map((role) => (
                                    <Button
                                        key={role.value}
                                        variant={
                                            message.role === role.value
                                                ? "solid"
                                                : "outline"
                                        }
                                        onClick={() => handleSelect(role.value)}
                                    >
                                        {role.label}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </div>
                </form>
                <p className="text-sm text-gray-500 mt-2">
                    Role Selected: {message.role ? message.role : "No role selected"}
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
