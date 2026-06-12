import { AppError } from "../errors/AppError.js";

export const checkRole = (...rolesPermitidos) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new AppError("No autenticado.", 401));
    }

    if (!rolesPermitidos.includes(req.user.rol)) {
      return next(new AppError("No tenés permisos para realizar esta acción.", 403));
    }

    next();
  };
};