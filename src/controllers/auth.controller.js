import { PrismaClient } from "@prisma/client";
import generateToken from "../auth/signToken.js";
import { AppError } from "../errors/AppError.js";

const prisma = new PrismaClient();

export const login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const usuario = await prisma.usuario.findUnique({
            where: { email }
        });

        if (!usuario) {
            throw new AppError("Credenciales incorrectas", 401);
        }

        // cuando el otro agregue bcrypt reemplazás esta línea
        const passwordValida = password === usuario.password;

        if (!passwordValida) {
            throw new AppError("Credenciales incorrectas", 401);
        }

        const token = generateToken(usuario);

        return res.status(200).json({
            message: "Login exitoso",
            token,
            usuario: {
                id: usuario.id,
                nombre: usuario.nombre,
                email: usuario.email,
            }
        });

    } catch (error) {
        next(error);
    }
};