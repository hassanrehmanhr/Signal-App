import { lazy, Suspense, Fragment } from "react";
import clsx from "clsx";
import { Dialog, Transition } from "@headlessui/react";
import { useModal, MODAL_VIEW } from "@/components/modals/context";
import Button from "@/components/ui/button";

// dynamic imports
const ROLES = lazy(() => import("@/components/ui/modals/roles"));
const ROOMS = lazy(() => import("@/components/ui/modals/rooms"));
const STATUSES = lazy(() => import("@/components/ui/modals/statuses"));

function renderModalContent(view: MODAL_VIEW | string) {
    switch (view) {
        case "ROLES":
            return <ROLES />;
        case "ROOMS":
            return <ROOMS />;
        case "STATUSES":
            return <STATUSES />;
        default:
            return null;
    }
}

export default function ModalContainer() {
    const { open, view, closeModal } = useModal();
    return (
        // TODO: ADD LOADER IF NEEDED
        <Suspense fallback={null}>
            <Transition appear show={open} as={Fragment}>
                <Dialog
                    as="div"
                    className={clsx(
                        "fixed inset-0 z-[9999] h-full w-full overflow-y-auto overflow-x-hidden bg-gray-dark bg-opacity-40 p-4 text-center"
                    )}
                    onClose={closeModal}
                >
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 z-[9999] cursor-pointer" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    {view && (
                        <span
                            className="inline-block h-full align-middle"
                            aria-hidden="true"
                        >
                            &#8203;
                        </span>
                    )}

                    {/* This element is need to fix FocusTap headless-ui warning issue */}
                    <div className="sr-only">
                        <Button
                            size="sm"
                            onClick={closeModal}
                            className="opacity-50 hover:opacity-80 "
                        >
                            <span></span>
                        </Button>
                    </div>

                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-105"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-105"
                    >
                        <div className="relative z-[9999] inline-block w-full text-left align-middle sm:w-auto">
                            {view && renderModalContent(view)}
                        </div>
                    </Transition.Child>
                </Dialog>
            </Transition>
        </Suspense>
    );
}
