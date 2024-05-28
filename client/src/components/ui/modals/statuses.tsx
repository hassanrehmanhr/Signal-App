import { useModal } from "@/components/modals/context";
import Button from "../button";
import { Input } from "../input";
import { Trash2, X } from "lucide-react";

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

const Statuses = () => {
    const { closeModal } = useModal();

    return (
        <div className="mx-auto w-full max-w-full overflow-hidden rounded-xl bg-white p-8 xs:w-[480px] sm:w-[520px] md:w-[600px] xl:w-[720px]">
            <div className="flex items-center justify-between">
                <h3 className="text-xl leading-8 font-bold">Edit Statuses</h3>

                <Button variant="ghost" onClick={closeModal}>
                    <X className="h-6 w-6" />
                </Button>
            </div>

            <div className="mb-8">
                <p className="text-sm text-gray-500">
                    Add, or remove statuses.
                </p>

                <div className="mt-4">
                    {statuses.map((status) => (
                        <div
                            key={status.value}
                            className="flex items-center justify-between py-2 border-b border-gray-200"
                        >
                            <span>{status.label}</span>

                            <div>
                                <Button variant="ghost">
                                    <Trash2 className="h-5 w-5" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex items-center gap-4 mt-8">
                    <Input placeholder="Add a status" />
                    <Button>Add</Button>
                </div>
            </div>
        </div>
    );
};
export default Statuses;
