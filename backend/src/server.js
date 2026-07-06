import "dotenv/config";
import http from "http";
import app from "./app.js";
import { connectDB } from "./config/database.js";
import { createChatServer } from "./utils/chat.js";
const PORT = process.env.PORT || 5000;
async function startServer() {
    await connectDB();
    const server = http.createServer(app);
    createChatServer(server);
    server.listen(PORT, () => {
        console.log("PORT =", PORT);
        console.log(`🚀 Server running on http://localhost:${PORT}`);
        console.log(`📡 WebSocket ready at ws://localhost:${PORT}/ws`);
    });
}
startServer();
//# sourceMappingURL=server.js.map