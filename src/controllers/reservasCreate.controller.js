import { prisma } from "../db.js";
import { ValidationError } from "../errors/AppError.js";

export const createReserva = async (req, res, next) => {
  try {
    const reserva = await prisma.reserva.create({
      data: req.body,
    });
    res.status(201).json(reserva);
  } catch (error) {
    if (error.code === "P2002") {
      return next(new ValidationError("Ya existe una reserva con ese DNI."));
    }
    next(error);
  }
};