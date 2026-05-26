import { prisma } from "../db.js";
import { ValidationError, NotFoundError } from "../errors/AppError.js";

export const updateReserva = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nombre, apellido, dni, telefono, email, habitacion, fechaIngreso, fechaSalida, cantPersonas, estado } = req.body;

    if (!id || isNaN(id)) return next(new ValidationError("ID inválido."));

    if (!nombre || !apellido || !dni || !telefono || !email || !estado || !fechaIngreso || !fechaSalida) {
      return next(new ValidationError("Todos los campos son obligatorios."));
    }

    const camposString = [nombre, apellido, dni, telefono, email, estado];
    if (camposString.some(campo => typeof campo === "string" && campo.trim() === "")) {
      return next(new ValidationError("Los campos no pueden estar vacíos."));
    }

    const dniNum = Number(dni);
    const habitacionNum = Number(habitacion);
    const cantPersonasNum = Number(cantPersonas);

    if (isNaN(dniNum) || isNaN(habitacionNum) || isNaN(cantPersonasNum)) {
      return next(new ValidationError("DNI, habitación y cantidad de personas deben ser numéricos."));
    }

    if (dniNum <= 0 || habitacionNum <= 0 || cantPersonasNum <= 0) {
      return next(new ValidationError("Los valores numéricos deben ser mayores a 0."));
    }

    const reservaExistente = await prisma.reserva.findUnique({ where: { id: Number(id) } });
    if (!reservaExistente) return next(new NotFoundError("Reserva no encontrada."));

    const reservaActualizada = await prisma.reserva.update({
      where: { id: Number(id) },
      data: {
        nombre, apellido,
        dni: String(dniNum),
        telefono, email,
        habitacion: habitacionNum,
        fechaIngreso: new Date(fechaIngreso),
        fechaSalida: new Date(fechaSalida),
        cantPersonas: cantPersonasNum,
        estado,
      },
    });

    res.status(200).json(reservaActualizada);
  } catch (error) {
    next(error);
  }
};