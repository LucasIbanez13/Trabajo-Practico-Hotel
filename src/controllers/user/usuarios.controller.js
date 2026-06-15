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