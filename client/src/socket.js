import { io } from "socket.io-client";

export let socket;

export const initSocket = (store) => {
    if (!socket) {
        socket = io.connect();

        socket.on("welcome", function (data) {
            console.log("socket.js welcome data: ", data);
            socket.emit("thanks", {
                message: "Thank you. It is great to be here.",
            });
        });

        socket.on("thanks-back", function (data) {
            console.log("thanks back: ", data);
            socket.emit("welcome", {
                message: "You are very welcome here.",
            });
        });
    }
};
