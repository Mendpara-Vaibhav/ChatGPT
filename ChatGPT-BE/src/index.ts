import express from "express";
import cors from "cors";
import { router as apiRoutes } from "./routes.js";

const app = express();
const PORT = process.env.PORT || 8888;

app.use(cors());
app.use(express.json());

app.use("/api", apiRoutes);

app.get("/", (req, res) => {
  res.send("Backend server is running!");
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
