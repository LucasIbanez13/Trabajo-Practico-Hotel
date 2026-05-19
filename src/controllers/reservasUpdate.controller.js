import { prisma } from "../db.js";

export const updateReserva = async (req, res, next) => {
  try {
    const { id } = req.params;

    const {
      nombre,
      apellido,
      dni,
      telefono,
      email,
      habitacion,
      fechaIngreso,
      fechaSalida,
      cantPersonas,
      estado,
    } = req.body;

  
    if (!id || isNaN(id)) {
      return res.status(400).json({
        message: "ID inválido",
      });
    }

    if (
      !nombre ||
      !apellido ||
      !dni ||
      !telefono ||
      !email ||
      !habitacion ||
      !fechaIngreso ||
      !fechaSalida ||
      !cantPersonas ||
      !estado
    ) {
      return res.status(400).json({
        message: "Todos los campos son obligatorios",
      });
    }

    const camposString = [
      nombre,
      apellido,
      dni,
      telefono,
      email,
      estado,
    ];

    const hayCamposVacios = camposString.some(
      (campo) => campo.trim() === ""
    );

    if (hayCamposVacios) {
      return res.status(400).json({
        message: "Los campos no pueden estar vacíos",
      });
    }

    const reservaExistente = await prisma.reserva.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!reservaExistente) {
      return res.status(404).json({
        message: "Reserva no encontrada",
      });
    }

    const reservaActualizada = await prisma.reserva.update({
      where: {
        id: Number(id),
      },
      data: {
        nombre,
        apellido,
        dni,
        telefono,
        email,
        habitacion,
        fechaIngreso: new Date(fechaIngreso),
        fechaSalida: new Date(fechaSalida),
        cantPersonas,
        estado,
      },
    });

    res.status(200).json(reservaActualizada);
  } catch (error) {
    next(error);
  }
};