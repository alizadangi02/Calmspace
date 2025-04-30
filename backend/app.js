import './constants.js';
import express from "express";
import cors from "cors";
import { connectDB } from "./DB/Database.js";
import bodyParser from "body-parser";
import helmet from "helmet";
import morgan from "morgan";
import sleepRoutes from "./Routers/sleepRoutes.js";
import moodRoutes from "./Routers/moodRoutes.js";
import userRoutes from "./Routers/userRoutes.js";
import postRoutes from "./Routers/postRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import adminRoutes from "./Routers/adminRoutes.js";
import { initializeSocket } from "./services/socketService.js";
import { createServer } from 'http';

const app = express();
const server = createServer(app);

const port = process.env.PORT;

connectDB();

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000'
];

app.use(express.json());

app.use(helmet());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// Initialize Socket.IO
initializeSocket(server);

// Routes
app.use("/api/v1/sleep", sleepRoutes);
app.use("/api/v1/mood", moodRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/post", postRoutes);
app.use("/api/v1/chat", chatRoutes);
app.use("/api/v1/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

server.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
