import { eliminarReserva, obtenerReservas } from "../api/reservaApi.js";

import { actualizarReserva } from "../panel/panelReserva.js";

export async function handleEliminarReserva(id) {
  const confirmar = confirm("¿Eliminar reserva?");
  if (!confirmar) return;

  try {
    await eliminarReserva(id);

    alert("Reserva eliminada correctamente");

    const reservasActualizadas = await obtenerReservas();

    actualizarReserva(reservasActualizadas);
  } catch (error) {
    console.error(error);

    alert("Error al eliminar reserva");
  }
}
