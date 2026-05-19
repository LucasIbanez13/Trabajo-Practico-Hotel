import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getObtenerID = async (req, res, next) => {

    const { id } = req.params;

    try {

        const reserva = await prisma.reserva.findUnique({
            where: {
                id: Number(id)
            }
        });

        // Verificar si existe
        if (!reserva) {
            return res.status(404).json({
                mensaje: "Reserva no encontrada"
            });
        }

        res.json(reserva);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            mensaje: "Error al obtener la reserva"
        });

    }

}