import express from "express";
import cors from "cors";
import reservasRoutes from "./routes/reservas.routes.js";
import { errorHandler } from "./middlewares/errorHandler.js";


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("frontend"));
app.use("/api", reservasRoutes);


app.use(errorHandler);


app.listen(3000);
console.log("Server on port", 3000);