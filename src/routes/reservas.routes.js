import { Router } from "express";
import { getReservas } from "../controllers/reservas.controller.js";
import { createReserva } from "../controllers/reservasCreate.controller.js";
import { deleteReserva } from "../controllers/reservasDelete.controller.js";
import { getObtenerID } from "../controllers/reservasId.controller.js"; 
import { updateReserva } from "../controllers/reservasUpdate.controller.js"; 


const router = Router();

router.get("/reservas", getReservas);
router.get("/reservas/:id", getObtenerID)
router.post("/reservas", createReserva);
router.delete("/reservas/:id", deleteReserva);
router.put("/reservas/:id", updateReserva);


export default router;