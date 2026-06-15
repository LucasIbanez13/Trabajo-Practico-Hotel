import { Router } from "express";
import { getReservas } from "../controllers/reservas.controller.js";
import { createReserva } from "../controllers/reservasCreate.controller.js";
import { deleteReserva } from "../controllers/reservasDelete.controller.js";
import { getObtenerID } from "../controllers/reservasId.controller.js";
import { updateReserva } from "../controllers/reservasUpdate.controller.js";
import validateToken from "../auth/verifyToken.js";

const router = Router();

router.get("/reservas", validateToken, getReservas);
router.get("/reservas/:id", validateToken, getObtenerID);
router.post("/reservas", validateToken, createReserva);
router.delete("/reservas/:id", validateToken, deleteReserva);
router.put("/reservas/:id", validateToken, updateReserva);

export default router;