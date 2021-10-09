import { io, Socket } from "socket.io-client";

export const socket = io(`${import.meta.env.VITE_APP_SOCKET_URL}`, {
  transports: ["websocket"],
  autoConnect: false,
});

export { Socket };
