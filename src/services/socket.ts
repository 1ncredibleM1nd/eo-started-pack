import { io, Socket } from "socket.io-client";
import { container } from "tsyringe";

export const socket = io(`${import.meta.env.VITE_APP_SOCKET_URL}`, {
  transports: ["websocket"],
  autoConnect: false,
});

export { Socket };

container.register(Socket, { useValue: socket });
