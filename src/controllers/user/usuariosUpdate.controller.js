import { prisma } from "../../db.js";

export const editarUsuario = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    const { nombre, email, rol } = req.body;

    const usuario = await prisma.usuario.update({
      where: { id },
      data: {
        nombre,
        email,
        rol,
      },
      select: {
        id: true,
        nombre: true,
        email: true,
        rol: true,
        createdAt: true,
      },
    });

    res.json(usuario);

  } catch (error) {
    next(error);
  }
};
