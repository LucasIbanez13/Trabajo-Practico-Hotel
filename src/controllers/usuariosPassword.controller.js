import bcrypt from "bcrypt";
import { prisma } from "../db.js";
import { ValidationError, NotFoundError } from "../errors/AppError.js";

export const updateUsuarioPassword = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { password } = req.body;

    
    if (!id || isNaN(id)) {
      return next(new ValidationError("ID inválido."));
    }

   
    if (!password || typeof password !== "string" || password.trim() === "") {
      return next(new ValidationError("La contraseña es obligatoria."));
    }

   
    if (password.length < 6) {
      return next(new ValidationError("La contraseña debe tener al menos 6 caracteres."));
    }

    const usuarioExistente = await prisma.usuario.findUnique({
      where: { id: Number(id) },
    });

    if (!usuarioExistente) {
      return next(new NotFoundError("Usuario no encontrado."));
    }

    
    const passwordHash = await bcrypt.hash(password, 10);

    await prisma.usuario.update({
      where: { id: Number(id) },
      data: { password: passwordHash },
    });

    res.status(200).json({ message: "Contraseña actualizada correctamente." });
  } catch (error) {
    next(error);
  }
};