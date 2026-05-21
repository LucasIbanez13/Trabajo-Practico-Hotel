import { eliminarReserva } from "../api/reservaApi";

export async function eliminarReserva(id) {

    try {

        const respuesta = await fetch(`${eliminarReserva}/${id}`, {
            method: "DELETE"
        });

        // Verificar si salió bien
        if (respuesta.ok) {

            alert("Reserva eliminada correctamente");

            // Recargar reservas
            location.reload();

        } else {

            alert("No se pudo eliminar la reserva");
        }

    } catch (error) {

        console.error(error);

        alert("Error del servidor");
    }
}