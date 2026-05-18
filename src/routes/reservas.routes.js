import { Router } from "express";
import { getReservas } from "../controllers/reservas.controller.js";
import { createReserva } from "../controllers/reservasCreate.controller.js";
import { deleteReserva } from "../controllers/reservasDelete.controller.js";

const router = Router();

router.get("/reservas", getReservas);
router.post("/reservas", createReserva);
router.delete("/reservas/:id", deleteReserva);

export default router;