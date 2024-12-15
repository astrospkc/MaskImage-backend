import express from "express";
const app = express();
import userRoute from "./src/Routes/UserRoutes.js";
import roughImageRouter from "./src/Routes/RoughImage.js";
import connectToMongo from "./src/db.js";
connectToMongo();
const PORT = 4000;

app.use(express.json());

app.use("/api", userRoute);
app.use("/roughImage", roughImageRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
