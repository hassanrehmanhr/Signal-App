import { useState, useCallback } from "react";
import { useModal } from "@/components/modals/context";
import Button from "../button";
import { Input } from "../input";
import { Trash2, X } from "lucide-react";
import { useAtom } from "jotai";
import { storeAtom } from "@/components/context";

const Roles = () => {
    const { closeModal } = useModal();
    const [input, setInput] = useState("");
    const [store, setStore] = useAtom(storeAtom);

    const handleDelete = useCallback(
        (value: string) => {
            setStore((prev) => ({
                ...prev,
                roles: prev.roles.filter((role) => role.value !== value),
            }));
        },
        [setStore]
    );

    const handleInput = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setInput(e.target.value);
        },
        []
    );

    const handleAdd = useCallback(() => {
        if (input.trim() === "") return;

        setStore((prev) => ({
            ...prev,
            roles: [
                ...prev.roles,
                {
                    value: input,
                    label: input,
                },
            ],
        }));

        setInput("");
    }, [input, setStore]);

    return (
        <div className="mx-auto w-full max-w-full overflow-hidden rounded-xl bg-white p-8 xs:w-[480px] sm:w-[520px] md:w-[600px] xl:w-[720px]">
            <div className="flex items-center justify-between">
                <h3 className="text-xl leading-8 font-bold">Edit Roles</h3>

                <Button variant="ghost" onClick={closeModal}>
                    <X className="h-6 w-6" />
                </Button>
            </div>

            <div className="mb-8">
                <p className="text-sm text-gray-500">Add, or remove roles.</p>

                <div className="mt-4">
                    {store.roles.length === 0 ? (
                        <p className="text-gray-500">No roles added.</p>
                    ) : (
                        store.roles.map((role) => (
                            <div
                                key={role.value}
                                className="flex items-center justify-between py-2 border-b border-gray-200"
                            >
                                <span>{role.value}</span>

                                <Button
                                    variant="ghost"
                                    onClick={() => handleDelete(role.value)}
                                >
                                    <Trash2 className="h-5 w-5" />
                                </Button>
                            </div>
                        ))
                    )}
                </div>

                <div className="flex items-center gap-4 mt-8">
                    <Input
                        placeholder="Add a role"
                        value={input}
                        onChange={handleInput}
                    />
                    <Button onClick={handleAdd}>Add</Button>
                </div>
            </div>
        </div>
    );
};
export default Roles;
