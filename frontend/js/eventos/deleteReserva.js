import { eliminarReserva, obtenerReservas } from "../api/reservaApi.js";
import { actualizarReserva } from "../panel/panelReserva.js";
import { toastSuccess, toastError } from "../utils/toast.js";

export async function handleEliminarReserva(id) {
  const modal = document.getElementById("modal-confirmar-eliminar");
  const btnConfirmar = document.getElementById("btn-confirmar-eliminar");
  const btnCancelar = document.getElementById("btn-cancelar-eliminar");

  modal.style.display = "flex";

  btnCancelar.onclick = () => {
    modal.style.display = "none";
  };

  btnConfirmar.onclick = async () => {
    modal.style.display = "none";
    try {
      await eliminarReserva(id);
      toastSuccess("Reserva eliminada correctamente."); // antes: alert(...)
      const reservasActualizadas = await obtenerReservas();
      actualizarReserva(reservasActualizadas);
    } catch (error) {
      toastError("Error al eliminar la reserva."); // antes: alert(...)
    }
  };
}