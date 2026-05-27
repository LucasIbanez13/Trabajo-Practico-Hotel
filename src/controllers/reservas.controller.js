import { prisma } from "../db.js";

export const getReservas = async (req, res, next) => {
  try {
    const reservas = await prisma.reserva.findMany();
    res.status(200).json(reservas);
  } catch (error) {
    next(error); // -> errorHandler -> 500
  }
};