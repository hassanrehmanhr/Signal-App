import { atomWithStorage } from "jotai/utils";
import { atom } from "jotai";

import { io } from "socket.io-client";

export const socket = io("https://signal-app-etqx.onrender.com");

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
        {
            value: "Assistant",
            label: "Assistant",
        },
        {
            value: "Hygenist",
            label: "Hygenist",
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
            value: "Room 1",
            label: "Room 1",
        },
        {
            value: "Room 2",
            label: "Room 2",
        },
    ],
});
