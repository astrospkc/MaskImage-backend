import express from "express";
const app = express();
import userRoute from "./src/Routes/UserRoutes.js";
import roughImageRouter from "./src/Routes/RoughImage.js";
import connectToMongo from "./src/db.js";
import cors from "cors";
connectToMongo();
const PORT = 4000;

const allowedOrigin = [
  "http://localhost:5173",
  "https://mask-image-five.vercel.app",
];
app.use(express.json());

app.use(
  cors({
    origin: allowedOrigin,
  })
);
app.options(
  "*",
  cors({
    origin: allowedOrigin,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/api", userRoute);
app.use("/roughImage", roughImageRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
