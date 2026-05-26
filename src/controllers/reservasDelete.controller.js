import { prisma } from "../db.js";
import { NotFoundError } from "../errors/AppError.js";

export const deleteReserva = async (req, res, next) => {
  const { id } = req.params;
  try {
    const reserva = await prisma.reserva.findUnique({ where: { id: Number(id) } });
    if (!reserva) return next(new NotFoundError("Reserva no encontrada."));

    await prisma.reserva.delete({ where: { id: Number(id) } });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};