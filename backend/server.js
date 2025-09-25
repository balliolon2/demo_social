import express from "express";
import morgan from "morgan";
import cors from "cors";
import authroute from "./routes/auth.route.js";
import profileroute from "./routes/profile.route.js";
import threadroute from "./routes/thread.route.js";
const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use("/api/auth", authroute);
app.use("/api/profile", profileroute);
app.use("/api/threads", threadroute);

app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({ message: err.message || "server error" });
});
const port = 3001;
app.listen(port, () => {
  console.log(`start with port ${port}`);
});
