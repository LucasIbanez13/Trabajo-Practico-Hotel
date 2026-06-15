import { prisma } from "../../db.js";

export const eliminarUsuario = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    await prisma.usuario.delete({
      where: { id },
    });

    res.json({
      message: "Usuario eliminado correctamente",
    });

  } catch (error) {
    next(error);
  }
};