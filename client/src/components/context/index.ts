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
            value: "doctor",
            label: "Doctor",
        },
        {
            value: "staff",
            label: "Staff",
        },
    ],
    statuses: [
        {
            value: "needed",
            label: "Needed",
        },
        {
            value: "patientready",
            label: "Patient Ready",
        },
        {
            value: "callon",
            label: "Call On",
        },
        {
            value: "patientcheck",
            label: "Patient Check",
        },
    ],
    rooms: [
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
    ],
});
