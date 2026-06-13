import { toastSuccess } from "../utils/toast.js";

export function handleLogout() {
  localStorage.removeItem("token");
  toastSuccess("Sesión cerrada.");
  window.location.href = "./index.html";
}

export function initLogout() {
    document.getElementById("btn-logout").addEventListener("click", handleLogout);
}