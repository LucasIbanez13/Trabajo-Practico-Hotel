import express from "express";
import reservasRoutes from "./routes/reservas.routes.js";

const app = express();

app.use(express.json());

app.use("/api", reservasRoutes);


app.listen(3000);
console.log("Server on port", 3000);