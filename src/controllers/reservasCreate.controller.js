import { prisma } from "../db.js";

export const createReserva = async (req, res, next) => {
  try {
    const reserva = await prisma.reserva.create({
      data: req.body,
    });
    res.status(201).json(reserva);
  } catch (error) {
    next(error);
  }
};