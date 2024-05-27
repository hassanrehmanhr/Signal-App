// import { useState, useEffect, useMemo } from "react";
// import { io } from "socket.io-client";
// import notificationSound from "./assets/sounds/notification.mp3";
// import "./App.css";
// // import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
// // import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
// // import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
// // import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
// import ToggleButton from "@mui/material/ToggleButton";
// import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
// import { Typography, Button, TextField } from "@mui/material";
// import { ClickAwayListener } from "@mui/base/ClickAwayListener";

// const App = () => {
//   const socket = useMemo(() => io("http://localhost:5000"), []);

//   // State for managing the options
//   const [roles, setRoles] = useState(["Staff", "Doctor"]);
//   const [statuses, setStatuses] = useState([
//     "Needed",
//     "Patient Ready",
//     "Call On",
//     "Patient Check",
//   ]);
//   const [rooms, setRooms] = useState([
//     "Lobby",
//     "Exam 1",
//     "Exam 2",
//     "Prep 1",
//     "Line 1",
//     "Line 2",
//   ]);

//   // State for managing the current selections
//   const [selectedRole, setSelectedRole] = useState("");
//   const [selectedStatus, setSelectedStatus] = useState("");
//   const [selectedRoom, setSelectedRoom] = useState("");

//   const [addNewRole, setAddNewRole] = useState(false);
//   // const [selectedStatus, setSelectedStatus] = useState("");
//   // const [selectedRoom, setSelectedRoom] = useState("");
//   const [newtext, setNewtext] = useState("");

//   // State for displaying the current signal
//   const [currentSignal, setCurrentSignal] = useState("");

//   // const [alignment, setAlignment] = React.useState('left');

//   const handleRole = (event, newRole) => {
//     setSelectedRole(newRole);
//   };
//   const handleStatus = (event, newStatus) => {
//     setSelectedStatus(newStatus);
//   };
//   const handleRoom = (event, newRoom) => {
//     setSelectedRoom(newRoom);
//   };

//   useEffect(() => {
//     socket.on("receive-message", (message) => {
//       setCurrentSignal(message);
//       // Play sound
//       const sound = new Audio(notificationSound);
//       sound.play();
//     });
//     // Clean up the socket connection
//     return () => {
//       socket.disconnect();
//     };
//   }, [socket]);

//   // Function to handle adding new options
//   const addOption = (optionType, value) => {
//     setNewtext("");

//     console.log("Selected Role:", selectedRole);
//     if (!value) return;
//     switch (optionType) {
//       case "role":
//         setRoles((prev) => [...prev, value]);
//         // setAddNewRole(false);
//         break;
//       case "status":
//         setStatuses((prev) => [...prev, value]);
//         break;
//       case "room":
//         setRooms((prev) => [...prev, value]);
//         break;
//       default:
//         break;
//     }
//   };

//   // Function to handle sending a signal
//   const sendSignal = () => {
//     if (selectedRole && selectedStatus && selectedRoom) {
//       setCurrentSignal(`${selectedRole} ${selectedStatus} - ${selectedRoom}`);

//       // Emit the signal to the server
//       socket.emit("message", {
//         room: selectedRoom,
//         message: `${selectedRole} ${selectedStatus}`,
//       });

//       console.log("Signal Sent", {
//         role: selectedRole,
//         status: selectedStatus,
//         room: selectedRoom,
//       });

//       // Reset selections
//       setSelectedRole("");
//       setSelectedStatus("");
//       setSelectedRoom("");
//       // Play sound
//       new Audio("/path_to_your_sound.mp3").play();
//     }
//   };

//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>Signal System</h1>
//       </header>
//       <main className="App-main">
//         <div
//           style={{
//             display: "flex",
//             flexDirection: "row",
//             justifyContent: "center",
//             alignItems: "flex-start",
//             gap: "20px",
//           }}
//         >
//           <div className="roles">
//             <ToggleButtonGroup
//               value={selectedRole}
//               exclusive
//               onChange={handleRole}
//               orientation="vertical"
//             >
//               {roles.map((role) => (
//                 <ToggleButton
//                   key={role}
//                   value={role}
//                   style={{
//                     backgroundColor:
//                       selectedRole !== role ? "lightblue" : "transparent",
//                     border:
//                       selectedRole !== role
//                         ? "1px solid lightblue"
//                         : "1px solid grey",
//                     minWidth: "160px",
//                   }}
//                 >
//                   <Typography color={selectedRole !== role ? "black" : "white"}>
//                     {role}
//                   </Typography>
//                 </ToggleButton>
//               ))}

//               {addNewRole && (
//                 <ClickAwayListener
//                   onClickAway={() => {
//                     setAddNewRole(false);
//                   }}
//                 >
//                   <ToggleButton
//                     style={{
//                       backgroundColor: "transparent",
//                     }}
//                   >
//                     <input
//                       type="text"
//                       placeholder="Add Role"
//                       value={newtext}
//                       onChange={(e) => {
//                         console.log(e.target.value);
//                         setNewtext(e.target.value);
//                       }}
//                       // TODO: Check non deprecated
//                       onKeyPress={(e) =>
//                         e.key === "Enter" && addOption("role", e.target.value)
//                       }
//                     />
//                   </ToggleButton>
//                 </ClickAwayListener>
//               )}

//               <ToggleButton
//                 style={{
//                   backgroundColor: "transparent",

//                   border: "1px solid lightblue",
//                 }}
//                 onClick={() => {
//                   console.log("Adding");

//                   if (!addNewRole) {
//                     setAddNewRole(true);
//                   } else {
//                     addOption("role", newtext);
//                   }
//                 }}
//               >
//                 <Typography color="lightblue">
//                   {addNewRole ? "Add" : "+"}
//                 </Typography>
//               </ToggleButton>
//             </ToggleButtonGroup>
//           </div>
//           <div className="statuses">
//             <ToggleButtonGroup
//               value={selectedStatus}
//               exclusive
//               onChange={handleStatus}
//               orientation="vertical"
//             >
//               {statuses.map((status) => (
//                 <ToggleButton
//                   key={status}
//                   value={status}
//                   style={{
//                     backgroundColor:
//                       selectedStatus !== status ? "lightyellow" : "transparent",
//                     border:
//                       selectedStatus !== status
//                         ? "1px solid lightyellow"
//                         : "1px solid grey",
//                   }}
//                 >
//                   <Typography
//                     color={selectedStatus !== status ? "black" : "white"}
//                   >
//                     {status}
//                   </Typography>
//                 </ToggleButton>
//               ))}
//             </ToggleButtonGroup>
//           </div>
//           <div className="rooms">
//             <ToggleButtonGroup
//               value={selectedRoom}
//               exclusive
//               onChange={handleRoom}
//               aria-label="text alignment"
//               orientation="vertical"
//             >
//               {rooms.map((room) => (
//                 <ToggleButton
//                   key={room}
//                   value={room}
//                   style={{
//                     backgroundColor:
//                       selectedRoom !== room ? "lightgreen" : "transparent",
//                     border:
//                       selectedRoom !== room
//                         ? "1px solid lightgreen"
//                         : "1px solid grey",
//                   }}
//                 >
//                   <Typography color={selectedRoom !== room ? "black" : "white"}>
//                     {room}
//                   </Typography>
//                 </ToggleButton>
//               ))}
//             </ToggleButtonGroup>
//           </div>
//         </div>

//         <div
//           style={{
//             marginTop: "2rem",
//             display: "flex",
//             flexDirection: "column",
//             gap: "10px",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           <Button
//             onClick={sendSignal}
//             variant="contained"
//             sx={{
//               backgroundColor: "lightblue",
//               color: "black",
//               height: "3rem",
//             }}
//             fullWidth
//           >
//             Send Signal
//           </Button>

//           <Button
//             onClick={() => {
//               setSelectedRole("");
//               setSelectedStatus("");
//               setSelectedRoom("");
//               setCurrentSignal("");
//             }}
//             variant="text"
//             sx={{
//               height: "1.5rem",
//             }}
//             fullWidth
//             color="error"
//           >
//             Cancel
//           </Button>
//         </div>
//       </main>

//       <div style={{ marginTop: "10rem" }}>
//         {currentSignal && (
//           <div className="current-signal">
//             <h2>Current Signal</h2>
//             <p>{currentSignal}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default App;

import { useState, useEffect, useMemo } from "react";
import { io } from "socket.io-client";
import notificationSound from "./assets/sounds/notification.mp3";
import "./App.css";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { Typography, Button } from "@mui/material";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";

const App = () => {
    const socket = useMemo(() => io("http://localhost:5000"), []);

    // State for managing the options
    const [roles, setRoles] = useState(["Staff", "Doctor"]);
    const [statuses, setStatuses] = useState([
        "Needed",
        "Patient Ready",
        "Call On",
        "Patient Check",
    ]);
    const [rooms, setRooms] = useState([
        "Lobby",
        "Exam 1",
        "Exam 2",
        "Prep 1",
        "Line 1",
        "Line 2",
    ]);

    // State for managing the current selections
    const [selectedRole, setSelectedRole] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");
    const [selectedRoom, setSelectedRoom] = useState("");

    const [addNewRole, setAddNewRole] = useState(false);
    const [addNewStatus, setAddNewStatus] = useState(false);
    const [addNewRoom, setAddNewRoom] = useState(false);
    const [newText, setNewText] = useState("");

    // State for displaying the current signal
    const [currentSignal, setCurrentSignal] = useState("");

    const handleRole = (event, newRole) => {
        setSelectedRole(newRole);
    };
    const handleStatus = (event, newStatus) => {
        setSelectedStatus(newStatus);
    };
    const handleRoom = (event, newRoom) => {
        setSelectedRoom(newRoom);
    };

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

    const addOption = (optionType, value) => {
        setNewText("");
        if (!value) return;
        switch (optionType) {
            case "role":
                setRoles((prev) => [...prev, value]);
                setAddNewRole(false);
                break;
            case "status":
                setStatuses((prev) => [...prev, value]);
                setAddNewStatus(false);
                break;
            case "room":
                setRooms((prev) => [...prev, value]);
                setAddNewRoom(false);
                break;
            default:
                break;
        }
    };

    const sendSignal = () => {
        if (selectedRole && selectedStatus && selectedRoom) {
            setCurrentSignal(
                `${selectedRole} ${selectedStatus} - ${selectedRoom}`
            );
            socket.emit("message", {
                room: selectedRoom,
                message: `${selectedRole} ${selectedStatus}`,
            });

            setSelectedRole("");
            setSelectedStatus("");
            setSelectedRoom("");
            new Audio("/path_to_your_sound.mp3").play();
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Signal System</h1>
            </header>
            <main className="App-main">
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "flex-start",
                        gap: "20px",
                    }}
                >
                    <div className="roles">
                        <ToggleButtonGroup
                            value={selectedRole}
                            exclusive
                            onChange={handleRole}
                            orientation="vertical"
                        >
                            {roles.map((role) => (
                                <ToggleButton
                                    key={role}
                                    value={role}
                                    style={{
                                        backgroundColor:
                                            selectedRole !== role
                                                ? "lightblue"
                                                : "transparent",
                                        border:
                                            selectedRole !== role
                                                ? "1px solid lightblue"
                                                : "1px solid grey",
                                        minWidth: "160px",
                                    }}
                                >
                                    <Typography
                                        color={
                                            selectedRole !== role
                                                ? "black"
                                                : "white"
                                        }
                                    >
                                        {role}
                                    </Typography>
                                </ToggleButton>
                            ))}

                            {addNewRole && (
                                <ClickAwayListener
                                    onClickAway={() => {
                                        setAddNewRole(false);
                                    }}
                                >
                                    <ToggleButton
                                        style={{
                                            backgroundColor: "transparent",
                                        }}
                                    >
                                        <input
                                            type="text"
                                            placeholder="Add Role"
                                            value={newText}
                                            onChange={(e) => {
                                                setNewText(e.target.value);
                                            }}
                                            onKeyPress={(e) =>
                                                e.key === "Enter" &&
                                                addOption(
                                                    "role",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </ToggleButton>
                                </ClickAwayListener>
                            )}

                            <ToggleButton
                                style={{
                                    backgroundColor: "transparent",
                                    border: "1px solid lightblue",
                                }}
                                onClick={() => {
                                    if (!addNewRole) {
                                        setAddNewRole(true);
                                    } else {
                                        addOption("role", newText);
                                    }
                                }}
                            >
                                <Typography color="lightblue">
                                    {addNewRole ? "Add" : "+"}
                                </Typography>
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </div>

                    <div className="statuses">
                        <ToggleButtonGroup
                            value={selectedStatus}
                            exclusive
                            onChange={handleStatus}
                            orientation="vertical"
                        >
                            {statuses.map((status) => (
                                <ToggleButton
                                    key={status}
                                    value={status}
                                    style={{
                                        backgroundColor:
                                            selectedStatus !== status
                                                ? "lightyellow"
                                                : "transparent",
                                        border:
                                            selectedStatus !== status
                                                ? "1px solid lightyellow"
                                                : "1px solid grey",
                                    }}
                                >
                                    <Typography
                                        color={
                                            selectedStatus !== status
                                                ? "black"
                                                : "white"
                                        }
                                    >
                                        {status}
                                    </Typography>
                                </ToggleButton>
                            ))}

                            {addNewStatus && (
                                <ClickAwayListener
                                    onClickAway={() => {
                                        setAddNewStatus(false);
                                    }}
                                >
                                    <ToggleButton
                                        style={{
                                            backgroundColor: "transparent",
                                        }}
                                    >
                                        <input
                                            type="text"
                                            placeholder="Add Status"
                                            value={newText}
                                            onChange={(e) => {
                                                setNewText(e.target.value);
                                            }}
                                            onKeyPress={(e) =>
                                                e.key === "Enter" &&
                                                addOption(
                                                    "status",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </ToggleButton>
                                </ClickAwayListener>
                            )}

                            <ToggleButton
                                style={{
                                    backgroundColor: "transparent",
                                    border: "1px solid lightyellow",
                                }}
                                onClick={() => {
                                    if (!addNewStatus) {
                                        setAddNewStatus(true);
                                    } else {
                                        addOption("status", newText);
                                    }
                                }}
                            >
                                <Typography color="lightyellow">
                                    {addNewStatus ? "Add" : "+"}
                                </Typography>
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </div>

                    <div className="rooms">
                        <ToggleButtonGroup
                            value={selectedRoom}
                            exclusive
                            onChange={handleRoom}
                            aria-label="text alignment"
                            orientation="vertical"
                        >
                            {rooms.map((room) => (
                                <ToggleButton
                                    key={room}
                                    value={room}
                                    style={{
                                        backgroundColor:
                                            selectedRoom !== room
                                                ? "lightgreen"
                                                : "transparent",
                                        border:
                                            selectedRoom !== room
                                                ? "1px solid lightgreen"
                                                : "1px solid grey",
                                    }}
                                >
                                    <Typography
                                        color={
                                            selectedRoom !== room
                                                ? "black"
                                                : "white"
                                        }
                                    >
                                        {room}
                                    </Typography>
                                </ToggleButton>
                            ))}

                            {addNewRoom && (
                                <ClickAwayListener
                                    onClickAway={() => {
                                        setAddNewRoom(false);
                                    }}
                                >
                                    <ToggleButton
                                        style={{
                                            backgroundColor: "transparent",
                                        }}
                                    >
                                        <input
                                            type="text"
                                            placeholder="Add Room"
                                            value={newText}
                                            onChange={(e) => {
                                                setNewText(e.target.value);
                                            }}
                                            onKeyPress={(e) =>
                                                e.key === "Enter" &&
                                                addOption(
                                                    "room",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </ToggleButton>
                                </ClickAwayListener>
                            )}

                            <ToggleButton
                                style={{
                                    backgroundColor: "transparent",
                                    border: "1px solid lightgreen",
                                }}
                                onClick={() => {
                                    if (!addNewRoom) {
                                        setAddNewRoom(true);
                                    } else {
                                        addOption("room", newText);
                                    }
                                }}
                            >
                                <Typography color="lightgreen">
                                    {addNewRoom ? "Add" : "+"}
                                </Typography>
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </div>
                </div>

                <div
                    style={{
                        marginTop: "2rem",
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Button
                        onClick={sendSignal}
                        variant="contained"
                        sx={{
                            backgroundColor: "lightblue",
                            color: "black",
                            height: "3rem",
                        }}
                        fullWidth
                    >
                        Send Signal
                    </Button>

                    <Button
                        onClick={() => {
                            setSelectedRole("");
                            setSelectedStatus("");
                            setSelectedRoom("");
                            setCurrentSignal("");
                        }}
                        variant="text"
                        sx={{
                            height: "1.5rem",
                        }}
                        fullWidth
                        color="error"
                    >
                        Cancel
                    </Button>
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
