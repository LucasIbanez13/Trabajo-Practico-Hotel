import { eliminarUsuario, obtenerUsuarios } from "../api/usuarioApi.js";
import { actualizarTablaUsuarios } from "../panel/panelUsuarios.js";
import { toastSuccess, toastError } from "../utils/toast.js";

export async function handleEliminarUsuario(id) {
  const modal = document.getElementById("modal-confirmar-eliminar-usuario");
  const btnConfirmar = document.getElementById("btn-confirmar-eliminar-usuario");
  const btnCancelar = document.getElementById("btn-cancelar-eliminar-usuario");

  modal.style.display = "flex";

  btnCancelar.onclick = () => {
    modal.style.display = "none";
  };

  btnConfirmar.onclick = async () => {
    modal.style.display = "none";
    try {
      await eliminarUsuario(id);
      toastSuccess("Usuario eliminado correctamente.");
      const usuariosActualizados = await obtenerUsuarios();
      actualizarTablaUsuarios(usuariosActualizados);
    } catch (error) {
      toastError("Error al eliminar el usuario.");
    }
  };
}