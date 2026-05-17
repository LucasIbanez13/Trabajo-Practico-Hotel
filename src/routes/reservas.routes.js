import { Router } from "express";
import { getReservas} from "../controllers/reservas.controller.js";

const router = Router();

router.get("/reservas", getReservas);




export default router;