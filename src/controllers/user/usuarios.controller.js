import { prisma } from "../../db.js";

export const getUsuarios = async (req, res, next) => {
  try {
    const usuarios = await prisma.usuario.findMany({
      select: {
        id: true,
        nombre: true,
        email: true,
        rol: true,
        createdAt: true,
      },
    });
    res.json(usuarios);
  } catch (error) {
    next(error);
  }
};
