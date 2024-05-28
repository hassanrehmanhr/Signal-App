import { atomWithStorage } from "jotai/utils";
import { atom } from "jotai";

type Common = {
    value: string;
    label: string;
};

interface Store {
    roles: Common[];
    statuses: Common[];
    rooms: Common[];
}

export const messageAtom = atom({
    role: "",
    status: "",
    room: "",
});

export const storeAtom = atomWithStorage<Store>("addNewData", {
    roles: [
        {
            value: "Doctor",
            label: "Doctor",
        },
        {
            value: "Staff",
            label: "Staff",
        },
    ],
    statuses: [
        {
            value: "Needed",
            label: "Needed",
        },
        {
            value: "Patient Ready",
            label: "Patient Ready",
        },
        {
            value: "Call On",
            label: "Call On",
        },
        {
            value: "Patient Check",
            label: "Patient Check",
        },
    ],
    rooms: [
        {
            value: "Lobby",
            label: "Lobby",
        },
        {
            value: "Exam 1",
            label: "Exam 1",
        },
        {
            value: "Exam 2",
            label: "Exam 2",
        },
        {
            value: "Prep 1",
            label: "Prep 1",
        },
        {
            value: "Line 1",
            label: "Line 1",
        },
        {
            value: "Line 2",
            label: "Line 2",
        },
    ],
});
