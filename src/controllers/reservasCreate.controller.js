import { prisma } from "../db.js";
import { ValidationError } from "../errors/AppError.js";

export const createReserva = async (req, res, next) => {
  try {
    const { nombre, apellido, dni, telefono, email, habitacion, fechaIngreso, fechaSalida, cantPersonas, estado } = req.body;

    // Campos obligatorios
    if (!nombre || !apellido || !dni || !telefono || !email || !estado || !fechaIngreso || !fechaSalida) {
      return next(new ValidationError("Todos los campos son obligatorios."));
    }

    // Campos string no vacíos
    const camposString = [nombre, apellido, dni, telefono, email, estado];
    if (camposString.some(campo => typeof campo === "string" && campo.trim() === "")) {
      return next(new ValidationError("Los campos no pueden estar vacíos."));
    }

    // Validación numérica
    const dniNum = Number(dni);
    const habitacionNum = Number(habitacion);
    const cantPersonasNum = Number(cantPersonas);

    if (isNaN(dniNum) || isNaN(habitacionNum) || isNaN(cantPersonasNum)) {
      return next(new ValidationError("DNI, habitación y cantidad de personas deben ser numéricos."));
    }

    if (dniNum <= 0 || habitacionNum <= 0 || cantPersonasNum <= 0) {
      return next(new ValidationError("Los valores numéricos deben ser mayores a 0."));
    }

    const reserva = await prisma.reserva.create({
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

    res.status(201).json(reserva);
  } catch (error) {
    if (error.code === "P2002") {
      return next(new ValidationError("Ya existe una reserva con ese DNI."));
    }
    next(error);
  }
};