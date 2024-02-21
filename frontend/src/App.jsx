import { useState, useEffect, useMemo } from "react";
import { io } from "socket.io-client";
import notificationSound from "./assets/sounds/notification.mp3"
import "./App.css";

const App = () => {
    const socket = useMemo(() => io("http://localhost:5000"), []);

    // State for managing the options
    const [roles, setRoles] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [rooms, setRooms] = useState([]);

    // State for managing the current selections
    const [selectedRole, setSelectedRole] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");
    const [selectedRoom, setSelectedRoom] = useState("");

    // State for displaying the current signal
    const [currentSignal, setCurrentSignal] = useState("");

    useEffect(() => {
        socket.on("receive-message", (message) => {
            setCurrentSignal(message);
            // Play sound
            const sound = new Audio(notificationSound);
            sound.play();
        });
        // Clean up the socket connection
        return () => {
            socket.disconnect();
        };
    }, [socket]);

    // Function to handle adding new options
    const addOption = (optionType, value) => {
        if (!value) return;
        switch (optionType) {
            case "role":
                setRoles((prev) => [...prev, value]);
                break;
            case "status":
                setStatuses((prev) => [...prev, value]);
                break;
            case "room":
                setRooms((prev) => [...prev, value]);
                break;
            default:
                break;
        }
    };

    // Function to handle sending a signal
    const sendSignal = () => {
        if (selectedRole && selectedStatus && selectedRoom) {
            setCurrentSignal(
                `${selectedRole} ${selectedStatus} - ${selectedRoom}`
            );

            // Emit the signal to the server
            socket.emit("message", {
                room: selectedRoom,
                message: `${selectedRole} ${selectedStatus}`,
            });

            console.log("Signal Sent", {
                role: selectedRole,
                status: selectedStatus,
                room: selectedRoom,
            });

            // Reset selections
            setSelectedRole("");
            setSelectedStatus("");
            setSelectedRoom("");
            // Play sound
            new Audio("/path_to_your_sound.mp3").play();
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Signal System</h1>
            </header>
            <main className="App-main">
                <div className="controls">
                    <div className="roles">
                        <input
                            type="text"
                            placeholder="Add Role"
                            value={selectedRole}
                            onChange={(e) => setSelectedRole(e.target.value)}
                            onKeyPress={(e) =>
                                e.key === "Enter" &&
                                addOption("role", e.target.value)
                            }
                        />
                        {roles.map((role) => (
                            <button
                                key={role}
                                onClick={() => setSelectedRole(role)}
                            >
                                {role}
                            </button>
                        ))}
                    </div>
                    <div className="statuses">
                        <input
                            type="text"
                            placeholder="Add Status"
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            onKeyPress={(e) =>
                                e.key === "Enter" &&
                                addOption("status", e.target.value)
                            }
                        />
                        {statuses.map((status) => (
                            <button
                                key={status}
                                onClick={() => setSelectedStatus(status)}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                    <div className="rooms">
                        <input
                            type="text"
                            placeholder="Add Room"
                            value={selectedRoom}
                            onChange={(e) => setSelectedRoom(e.target.value)}
                            onKeyPress={(e) =>
                                e.key === "Enter" &&
                                addOption("room", e.target.value)
                            }
                        />
                        {rooms.map((room) => (
                            <button
                                key={room}
                                onClick={() => setSelectedRoom(room)}
                            >
                                {room}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="signal-display">
                    <button className="send-signal" onClick={sendSignal}>
                        Send Signal
                    </button>
                </div>
            </main>

            <div style={{ marginTop: "10rem" }}>
                {currentSignal && (
                    <div className="current-signal">
                        <h2>Current Signal</h2>
                        <p>{currentSignal}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default App;
