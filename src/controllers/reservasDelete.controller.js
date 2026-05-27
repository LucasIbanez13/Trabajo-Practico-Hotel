import { prisma } from "../db.js";
import { NotFoundError, ValidationError } from "../errors/AppError.js";

export const deleteReserva = async (req, res, next) => {
  const { id } = req.params;
 
  // 400 - ID inválido
  if (!id || isNaN(id)) {
    return next(new ValidationError("ID inválido."));
  }
 
  try {
    // 404 - Reserva no existe
    const reserva = await prisma.reserva.findUnique({ where: { id: Number(id) } });
    if (!reserva) return next(new NotFoundError("Reserva no encontrada."));
 
    await prisma.reserva.delete({ where: { id: Number(id) } });
 
    // 204 - Eliminado sin contenido
    res.status(204).send();
  } catch (error) {
    next(error); // -> errorHandler -> 500
  }
};
 