import { useState, useEffect, useMemo } from "react";
import { io } from "socket.io-client";

// Jotai Import
import { useAtomValue, useSetAtom } from "jotai";
import { messageAtom } from "@/components/context";

// Assets Import
import notificationSound from "@/assets/sounds/notification.mp3";

// Components Import
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import RoomCard from "@/components/card/room-card";
import StatusesCard from "@/components/card/statuses-card";
import RolesCard from "@/components/card/roles-card";
import ModalContainer from "@/components/modals/view";
import Button from "./components/ui/button";
import clsx from "clsx";

function App() {
    const socket = useMemo(() => io("http://localhost:5000"), []);

    const [currentSignal, setCurrentSignal] = useState("");

    const message = useAtomValue(messageAtom);
    const setMessage = useSetAtom(messageAtom);

    useEffect(() => {
        socket.on("receive-message", (message) => {
            setCurrentSignal(message);
            const sound = new Audio(notificationSound);
            sound.play();
        });
        return () => {
            socket.disconnect();
        };
    }, [socket]);

    const handleSendMessage = () => {
        socket.emit("message", {
            message: `${message.role} - ${message.status} - ${message.room}`,
        });

        setMessage((prev) => ({ ...prev, role: "", status: "", room: "" }));

        new Audio(notificationSound).play();
    };

    return (
        <>
            <div className="flex flex-col h-screen">
                <Header socket={socket} />

                <main className="flex-1 container py-4">
                    {currentSignal && (
                        <div
                            className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 animate-bounce mt-4"
                            role="alert"
                        >
                            <p className="font-bold">New Signal</p>
                            <p>{currentSignal}</p>
                        </div>
                    )}

                    <div
                        className={clsx(
                            "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12 mt-6 md:mt-12 lg:mt-32",
                            currentSignal && "mt-2 md:mt-4 lg:mt-8"
                        )}
                    >
                        <RolesCard />

                        <StatusesCard />

                        <RoomCard />
                    </div>

                    {message.role && message.status && message.room && (
                        <div className="mt-8">
                            <h2 className="text-md font-semibold">Message</h2>

                            <div className="w-fit">
                                <div className="px-4 py-2 bg-gray-100 rounded-lg font-medium mt-1.5">
                                    {message.role} - {message.status} -{" "}
                                    {message.room}
                                </div>

                                <Button
                                    className="mt-4 w-full"
                                    onClick={handleSendMessage}
                                >
                                    Send Message
                                </Button>
                            </div>
                        </div>
                    )}
                </main>

                <Footer />
            </div>

            <ModalContainer />
        </>
    );
}

export default App;
