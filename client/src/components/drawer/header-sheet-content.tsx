import { useState, useCallback } from "react";

import {
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import Button from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SocketIoType } from "@/type";

const HeaderSheetContent = (socket: SocketIoType) => {
    const [message, setMessage] = useState({
        role: "",
        status: "",
        room: "",
    });

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setMessage((prev) => ({
                ...prev,
                [e.target.id]: e.target.value,
            }));
        },
        [setMessage]
    );

    const handleSubmit = useCallback(() => {
        if (message.role.trim() === "") return;
        if (message.status.trim() === "") return;
        if (message.room.trim() === "") return;

        socket.emit("message", {
            message: `${message.role} - ${message.status} - ${message.room}`,
        });

        setMessage({
            role: "",
            status: "",
            room: "",
        });
    }, [message, socket]);

    return (
        <SheetContent className="max-sm:w-screen">
            <SheetHeader>
                <SheetTitle>Custom Message</SheetTitle>
                <SheetDescription>
                    You can customize your message here.
                </SheetDescription>
            </SheetHeader>

            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center justify-between gap-4">
                    <Label htmlFor="role">Role</Label>
                    <Input
                        id="role"
                        value={message.role}
                        placeholder="Doctor, Staff etc."
                        className="col-span-3"
                        onChange={handleChange}
                    />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="status">Status</Label>
                    <Input
                        id="status"
                        value={message.status}
                        placeholder="Your status here"
                        className="col-span-3"
                        onChange={handleChange}
                    />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="room">Room</Label>
                    <Input
                        id="room"
                        value={message.room}
                        placeholder="Your room here"
                        className="col-span-3"
                        onChange={handleChange}
                    />
                </div>

                {/* Display Message */}
                <div className="grid grid-cols-4 items-center gap-4">
                    <div className="col-span-4 p-4 bg-gray-100 rounded-lg">
                        {`${message.role} ${
                            message.status && "- " + message.status
                        } ${message.room && "- " + message.room}`}

                        <div className="text-sm text-gray-500 mt-2">
                            This is how your message will look like.
                        </div>
                    </div>
                </div>
            </div>

            <SheetFooter>
                <SheetClose asChild>
                    <Button
                        type="submit"
                        className="w-full"
                        size="lg"
                        onClick={handleSubmit}
                    >
                        Send Message
                    </Button>
                </SheetClose>
            </SheetFooter>
        </SheetContent>
    );
};
export default HeaderSheetContent;
