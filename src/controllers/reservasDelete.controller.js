import { prisma } from "../db.js";

export const deleteReserva = async (req, res, next) => {
  const { id } = req.params;
  try {
    await prisma.reserva.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};