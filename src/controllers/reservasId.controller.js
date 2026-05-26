import { prisma } from "../db.js";
import { NotFoundError } from "../errors/AppError.js";

export const getObtenerID = async (req, res, next) => {
  const { id } = req.params;
  try {
    const reserva = await prisma.reserva.findUnique({ where: { id: Number(id) } });
    if (!reserva) return next(new NotFoundError("Reserva no encontrada."));
    res.json(reserva);
  } catch (error) {
    next(error);
  }
};