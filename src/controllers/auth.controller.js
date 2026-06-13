import { PrismaClient } from "@prisma/client";
import generateToken from "../auth/signToken.js";
import { AppError } from "../errors/AppError.js";
import bcrypt from "bcrypt"; 

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

        const passwordValida = await bcrypt.compare(password, usuario.password);

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


export const register = async (req, res, next) => {
  const { nombre, email, password } = req.body;

  try {
    // Verificar si el email ya existe
    const usuarioExistente = await prisma.usuario.findUnique({
      where: {
        email,
      },
    });

    if (usuarioExistente) {
      return res.status(409).json({
        mensaje: "El email ya está registrado",
      });
    }

    // Encriptar contraseña
    const passwordHash = await bcrypt.hash(password, 10);

    // Crear usuario
    const nuevoUsuario = await prisma.usuario.create({
      data: {
        nombre,
        email,
        password: passwordHash,
      },
    });

    // No devolver la contraseña
    res.status(201).json({
      mensaje: "Usuario creado correctamente",
      usuario: {
        id: nuevoUsuario.id,
        nombre: nuevoUsuario.nombre,
        email: nuevoUsuario.email,
      },
    });

  } catch (error) {
    next(error);
  }
};