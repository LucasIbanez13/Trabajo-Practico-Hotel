import { initPanel } from "./panel/panelReserva.js";
import { initFormCrear } from "./eventos/createReserva.js";
import { initEditarReserva } from "./eventos/editarReserva.js";
import { initLogout } from "./eventos/logout.js";

function getRolFromToken() {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.rol;
  } catch {
    return null;
  }
}

function initBotonUsuarios() {
  const rol = getRolFromToken();
  if (rol !== "superadmin") return;

  const header = document.querySelector(".header");
  const btnLogout = document.getElementById("btn-logout");

  const btnUsuarios = document.createElement("a");
  btnUsuarios.href = "./usuarios.html";
  btnUsuarios.textContent = "Panel de Usuarios";
  btnUsuarios.className = "header__btn-user";

  header.insertBefore(btnUsuarios, btnLogout);
}

document.addEventListener("DOMContentLoaded", () => {
  initPanel();
  initFormCrear();
  initEditarReserva();
  initLogout();
  initBotonUsuarios();
});