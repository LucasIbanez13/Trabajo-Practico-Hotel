import { prisma } from "../db.js";
import { ValidationError, NotFoundError, ConflictError } from "../errors/AppError.js";

export const updateUsuario = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nombre, email } = req.body;

    if (!id || isNaN(id)) {
      return next(new ValidationError("ID inválido."));
    }

    if (!nombre || !email) {
      return next(new ValidationError("Nombre y email son obligatorios."));
    }

    const camposString = [nombre, email];
    if (camposString.some((campo) => typeof campo === "string" && campo.trim() === "")) {
      return next(new ValidationError("Los campos no pueden estar vacíos."));
    }

    const usuarioExistente = await prisma.usuario.findUnique({
      where: { id: Number(id) },
    });

    if (!usuarioExistente) {
      return next(new NotFoundError("Usuario no encontrado."));
    }

    if (email !== usuarioExistente.email) {
      const emailEnUso = await prisma.usuario.findUnique({
        where: { email },
      });

      if (emailEnUso) {
        return next(new ConflictError("El email ya está en uso por otro usuario."));
      }
    }

    const usuarioActualizado = await prisma.usuario.update({
      where: { id: Number(id) },
      data: { nombre, email },
    });

    res.status(200).json({
      id: usuarioActualizado.id,
      nombre: usuarioActualizado.nombre,
      email: usuarioActualizado.email,
      rol: usuarioActualizado.rol,
    });
  } catch (error) {
    if (error.code === "P2002") {
      return next(new ConflictError("El email ya está en uso por otro usuario."));
    }
    next(error);
  }
};