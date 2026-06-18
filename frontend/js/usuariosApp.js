import { initPanelUsuarios } from "./panel/panelUsuarios.js";
import { initEditarUsuario } from "./eventos/editarUsuario.js";
import { initLogout } from "./eventos/logout.js";
import { initCambiarPassword } from "./eventos/cambiarPassword.js";

// Protección de ruta: solo superadmin puede ver esta página
function verificarSuperadmin() {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "./index.html";
    return false;
  }

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));

    if (payload.rol !== "superadmin") {
      window.location.href = "./dashboard.html";
      return false;
    }

    return true;
  } catch {
    localStorage.removeItem("token");
    window.location.href = "./index.html";
    return false;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (!verificarSuperadmin()) return;

  initPanelUsuarios();
  initEditarUsuario();
  initLogout();
  initCambiarPassword();
});