import { prisma } from "../db.js";
import { NotFoundError, ValidationError } from "../errors/AppError.js";
export const getObtenerID = async (req, res, next) => {
  const { id } = req.params;
 
  // 400 - ID inválido
  if (!id || isNaN(id)) {
    return next(new ValidationError("ID inválido."));
  }
 
  try {
    // 404 - Reserva no existe
    const reserva = await prisma.reserva.findUnique({ where: { id: Number(id) } });
    if (!reserva) return next(new NotFoundError("Reserva no encontrada."));
 
    // 200 - OK
    res.status(200).json(reserva);
  } catch (error) {
    next(error); // -> errorHandler -> 500
  }
};