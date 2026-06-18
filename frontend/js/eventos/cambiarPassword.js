import { cambiarPasswordUsuario } from "../api/usuarioApi.js";
import { toastSuccess, toastError } from "../utils/toast.js";

let usuarioIdActual = null;

export function abrirModalPassword(id) {
  usuarioIdActual = id;
  document.getElementById("nueva-password").value = "";
  document.getElementById("modal-cambiar-password").style.display = "flex";
}

function cerrarModalPassword() {
  document.getElementById("modal-cambiar-password").style.display = "none";
}

export function initCambiarPassword() {
  const form = document.getElementById("form-cambiar-password");
  const btnCerrar = document.getElementById("btn-cerrar-modal-password");
  const btnCancelar = document.getElementById("btn-cancelar-password");

  btnCerrar?.addEventListener("click", cerrarModalPassword);
  btnCancelar?.addEventListener("click", cerrarModalPassword);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const password = document.getElementById("nueva-password").value.trim();

    if (password.length < 6) {
      toastError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    try {
      await cambiarPasswordUsuario(usuarioIdActual, password);
      cerrarModalPassword();
      toastSuccess("Contraseña actualizada correctamente.");
    } catch (error) {
      toastError(error.message);
    }
  });
}