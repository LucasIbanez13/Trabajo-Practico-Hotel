import { Router } from "express";
import validateToken from "../auth/verifyToken.js";
import { checkRole } from "../middlewares/checkRole.js";
import { getUsuarios, editarUsuario, eliminarUsuario } from "../controllers/user/usuarios.controller.js";

const router = Router();

router.get("/usuarios", validateToken, checkRole("superadmin"), getUsuarios);
router.put("/usuarios/:id", validateToken, checkRole("superadmin"), editarUsuario);
router.delete("/usuarios/:id", validateToken, checkRole("superadmin"), eliminarUsuario);

export default router;
