import { editarUsuario, obtenerUsuarios } from "../api/usuarioApi.js";
import { actualizarTablaUsuarios } from "../panel/panelUsuarios.js";
import { toastSuccess, toastError } from "../utils/toast.js";

let usuarioEditandoId = null;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SOLO_LETRAS_REGEX = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

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
  usuarioEditandoId = usuario.id;
  document.getElementById("edit-usuario-nombre").value = usuario.nombre || "";
  document.getElementById("edit-usuario-email").value = usuario.email || "";
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