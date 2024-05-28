import { useModal } from "@/components/modals/context";
import Button from "../button";
import { X } from "lucide-react";

const Statuses = () => {
    const { closeModal } = useModal();

    return (
        <div className="mx-auto w-full max-w-full overflow-hidden rounded-xl bg-white p-12 xs:w-[480px] sm:w-[520px]">
            <div className="flex items-center justify-between">
                <h3 className="text-xl leading-8 md:!text-xl">
                    asdasd
                </h3>

                <Button variant="ghost" onClick={closeModal}>
                    <X className="h-6 w-6" />
                </Button>
            </div>

            <div className="mb-8">
                <p className="text-base leading-5 text-gray">adasdasd</p>
            </div>
        </div>
    );
};
export default Statuses;
