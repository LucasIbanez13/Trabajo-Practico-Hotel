import { Router } from "express";
import validateToken from "../auth/verifyToken.js";
import { checkRole } from "../middlewares/checkRole.js";
import { getUsuarios } from "../controllers/user/usuarios.controller.js";
import { editarUsuario } from "../controllers/user/usuariosUpdate.controller.js";
import { eliminarUsuario } from "../controllers/user/usuariosDelete.controller.js";
import { updateUsuarioPassword } from "../controllers/user/usuariosPassword.controller.js";

const router = Router();

router.get("/usuarios", validateToken, checkRole("superadmin"), getUsuarios);
router.put("/usuarios/:id", validateToken, checkRole("superadmin"), editarUsuario);
router.put("/usuarios/:id/password", validateToken, checkRole("superadmin"), updateUsuarioPassword);
router.delete("/usuarios/:id", validateToken, checkRole("superadmin"), eliminarUsuario);

export default router;