import { editarUsuario, obtenerUsuarios } from "../api/usuarioApi.js";
import { actualizarTablaUsuarios } from "../panel/panelUsuarios.js";
import { toastSuccess, toastError } from "../utils/toast.js";

let usuarioEditandoId = null;
let editandoPropiaCuenta = false;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SOLO_LETRAS_REGEX = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

function getIdFromToken() {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.id;
  } catch {
    return null;
  }
}

function setError(id, mensaje) {
  const input = document.getElementById(id);
  let error = input.nextElementSibling;
  if (!error || !error.classList.contains("error-msg")) {
    error = document.createElement("div");
    error.className = "error-msg";
    input.insertAdjacentElement("afterend", error);
  }
  error.textContent = mensaje;
  input.style.border = "1px solid red";
}

function clearError(id) {
  const input = document.getElementById(id);
  let error = input.nextElementSibling;
  if (error && error.classList.contains("error-msg")) error.remove();
  input.style.border = "";
}

function validarFormulario() {
  let valido = true;

  const nombre = document.getElementById("edit-usuario-nombre").value.trim();
  const email = document.getElementById("edit-usuario-email").value.trim();

  if (!nombre) {
    setError("edit-usuario-nombre", "El nombre es obligatorio");
    valido = false;
  } else if (!SOLO_LETRAS_REGEX.test(nombre)) {
    setError("edit-usuario-nombre", "Solo se permiten letras");
    valido = false;
  } else {
    clearError("edit-usuario-nombre");
  }

  if (!email) {
    setError("edit-usuario-email", "El email es obligatorio");
    valido = false;
  } else if (!EMAIL_REGEX.test(email)) {
    setError("edit-usuario-email", "Email inválido");
    valido = false;
  } else {
    clearError("edit-usuario-email");
  }

  return valido;
}

export function abrirModalEditarUsuario(usuario) {
  const miId = getIdFromToken();
  editandoPropiaCuenta = usuario.id === miId;

  usuarioEditandoId = usuario.id;
  document.getElementById("edit-usuario-nombre").value = usuario.nombre || "";
  document.getElementById("edit-usuario-email").value = usuario.email || "";
  document.getElementById("edit-usuario-rol").value = usuario.rol || "empleado";

  // Mostrar u ocultar el campo rol según si es su propia cuenta
  const grupoRol = document.getElementById("grupo-rol-usuario");
  grupoRol.style.display = editandoPropiaCuenta ? "none" : "flex";

  document.getElementById("modal-editar-usuario").style.display = "flex";
}

function cerrarModalEditarUsuario() {
  document.getElementById("modal-editar-usuario").style.display = "none";
}

export function initEditarUsuario() {
  const form = document.getElementById("form-editar-usuario");
  const btnCerrar = document.getElementById("btn-cerrar-modal-editar-usuario");
  const btnCancelar = document.getElementById("btn-cancelar-editar-usuario");

  btnCerrar?.addEventListener("click", cerrarModalEditarUsuario);
  btnCancelar?.addEventListener("click", cerrarModalEditarUsuario);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!validarFormulario()) {
      toastError("Revisá los campos marcados en rojo.");
      return;
    }

    try {
      const data = {
        nombre: document.getElementById("edit-usuario-nombre").value.trim(),
        email: document.getElementById("edit-usuario-email").value.trim(),
      };

      // Solo incluir rol si no está editando su propia cuenta
      if (!editandoPropiaCuenta) {
        data.rol = document.getElementById("edit-usuario-rol").value;
      }

      await editarUsuario(usuarioEditandoId, data);
      cerrarModalEditarUsuario();
      toastSuccess("Usuario actualizado correctamente.");

      const usuariosActualizados = await obtenerUsuarios();
      actualizarTablaUsuarios(usuariosActualizados);
    } catch (error) {
      toastError(error.message);
    }
  });
}