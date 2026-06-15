import { Router } from "express";
import validateToken from "../auth/verifyToken.js";
import { checkRole } from "../middlewares/checkRole.js";
import { getUsuarios } from "../controllers/user/usuarios.controller.js";
import { updateUsuario } from "../controllers/usuariosUpdate.controller.js";

const router = Router();

router.get("/usuarios", validateToken, checkRole("superadmin"), getUsuarios);
router.put("/usuarios/:id", validateToken, checkRole("superadmin"), updateUsuario);

export default router;