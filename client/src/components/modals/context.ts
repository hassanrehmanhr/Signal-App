import { atom, useSetAtom, useAtomValue } from "jotai";

export type MODAL_VIEW = "ROLES" | "ROOMS" | "STATUSES";

const modalAtom = atom({
    open: false,
    view: "ROLES",
});

export function useModal() {
    const modal = useAtomValue(modalAtom);
    const setModal = useSetAtom(modalAtom);

    function openModal(view: MODAL_VIEW) {
        setModal({
            ...modal,
            view,
            open: true,
        });
    }

    function closeModal() {
        setModal({
            ...modal,
            open: false,
        });
    }

    return {
        ...modal,
        openModal,
        closeModal,
    };
}
