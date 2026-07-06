import { WebSocketServer } from "ws";
const rooms = new Map();
function broadcast(videoId, data) {
    const clients = rooms.get(videoId);
    if (!clients) {
        return;
    }
    const text = JSON.stringify(data);
    for (const client of clients) {
        if (client.readyState === client.OPEN) {
            client.send(text);
        }
    }
}
export function createChatServer(server) {
    const wss = new WebSocketServer({ server, path: "/ws" });
    wss.on("connection", (socket, req) => {
        const url = new URL(req.url ?? "", "http://localhost");
        const videoId = url.searchParams.get("videoId");
        const username = url.searchParams.get("username") || "Guest";
        if (!videoId) {
            socket.close(1008, "videoId query required");
            return;
        }
        const room = rooms.get(videoId) || new Set();
        room.add(socket);
        rooms.set(videoId, room);
        socket.on("message", (message) => {
            try {
                const rawMessage = String(message);
                const parsed = JSON.parse(rawMessage);
                const chatMessage = {
                    username,
                    message: String(parsed.message || ""),
                    timestamp: new Date().toISOString(),
                };
                broadcast(videoId, chatMessage);
            }
            catch (error) {
                console.error("Invalid chat message", error);
            }
        });
        socket.on("close", () => {
            const currentRoom = rooms.get(videoId);
            if (currentRoom) {
                currentRoom.delete(socket);
                if (currentRoom.size === 0) {
                    rooms.delete(videoId);
                }
            }
        });
    });
}
//# sourceMappingURL=chat.js.map