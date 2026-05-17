import { prisma } from "../db.js";

export const getReservas = async (req, res, next) => {
  try {
    const reservas = await prisma.reserva.findMany();
    res.json(reservas);
  } catch (error) {
    next(error);
  }
};