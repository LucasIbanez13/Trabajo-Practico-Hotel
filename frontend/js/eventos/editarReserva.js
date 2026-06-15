import { editarReserva, obtenerReservas } from "../api/reservaApi.js";
import { actualizarReserva } from "../panel/panelReserva.js";
import { toastSuccess, toastError } from "../utils/toast.js";

let reservaEditandoId = null;

const soloLetras = (valor) => /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(valor);
const soloNumeros = (valor) => /^\d+$/.test(valor);
const emailValido = (valor) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);

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

  const nombre = document.getElementById("edit-nombre").value.trim();
  const apellido = document.getElementById("edit-apellido").value.trim();
  const dni = document.getElementById("edit-dni").value.trim();
  const telefono = document.getElementById("edit-telefono").value.trim();
  const email = document.getElementById("edit-email").value.trim();
  const habitacion = document.getElementById("edit-habitacion").value.trim();
  const cantPersonas = document.getElementById("edit-cantPersonas").value.trim();
  const fechaIngreso = document.getElementById("edit-fechaIngreso").value;
  const fechaSalida = document.getElementById("edit-fechaSalida").value;

  if (!nombre) { setError("edit-nombre", "El nombre es obligatorio"); valido = false; }
  else if (!soloLetras(nombre)) { setError("edit-nombre", "Solo letras"); valido = false; }
  else clearError("edit-nombre");

  if (!apellido) { setError("edit-apellido", "El apellido es obligatorio"); valido = false; }
  else if (!soloLetras(apellido)) { setError("edit-apellido", "Solo letras"); valido = false; }
  else clearError("edit-apellido");

  if (!dni) { setError("edit-dni", "El DNI es obligatorio"); valido = false; }
  else if (!/^\d{7,8}$/.test(dni)) { setError("edit-dni", "7 u 8 números sin puntos ni espacios."); valido = false; }
  else clearError("edit-dni");

  if (!telefono) { setError("edit-telefono", "Obligatorio"); valido = false; }
  else if (!/^\d{7,15}$/.test(telefono)) { setError("edit-telefono", "Entre 7 y 15 números."); valido = false; }
  else clearError("edit-telefono");

  if (!email) { setError("edit-email", "Obligatorio"); valido = false; }
  else if (!emailValido(email)) { setError("edit-email", "Email inválido"); valido = false; }
  else clearError("edit-email");

  if (!habitacion || !soloNumeros(habitacion) || Number(habitacion) <= 0) {
    setError("edit-habitacion", "Inválida"); valido = false;
  } else clearError("edit-habitacion");

  if (!cantPersonas || !soloNumeros(cantPersonas) || Number(cantPersonas) <= 0) {
    setError("edit-cantPersonas", "Inválida"); valido = false;
  } else clearError("edit-cantPersonas");

  if (!fechaIngreso || !fechaSalida) {
    toastError("Las fechas son obligatorias."); // antes: alert(...)
    return false;
  }

  if (new Date(fechaSalida) <= new Date(fechaIngreso)) {
    toastError("La salida debe ser posterior al ingreso."); // antes: alert(...)
    return false;
  }

  return valido;
}

export function abrirModalEditar(reserva) {
  reservaEditandoId = reserva.id;

  document.getElementById("edit-nombre").value = reserva.nombre;
  document.getElementById("edit-apellido").value = reserva.apellido;
  document.getElementById("edit-dni").value = reserva.dni || "";
  document.getElementById("edit-telefono").value = reserva.telefono || "";
  document.getElementById("edit-email").value = reserva.email || "";
  document.getElementById("edit-habitacion").value = reserva.habitacion || "";
  document.getElementById("edit-cantPersonas").value = reserva.cantPersonas || "";
  document.getElementById("edit-estado").value = reserva.estado;

  document.getElementById("edit-fechaIngreso").value =
    reserva.fechaIngreso ? reserva.fechaIngreso.slice(0, 16) : "";
  document.getElementById("edit-fechaSalida").value =
    reserva.fechaSalida ? reserva.fechaSalida.slice(0, 16) : "";

  document.getElementById("modal-editar").style.display = "flex";
}

export function initEditarReserva() {
  const form = document.getElementById("form-editar");
  const btnCerrar = document.getElementById("btn-cerrar-modal-editar");
  const btnCancelar = document.getElementById("btn-cancelar-editar");

  btnCerrar?.addEventListener("click", cerrarModalEditar);
  btnCancelar?.addEventListener("click", cerrarModalEditar);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const esValido = validarFormulario();
    if (!esValido) {
      toastError("Revisá los campos marcados en rojo."); // antes: alert(...)
      return;
    }

    try {
      const data = {
        nombre: document.getElementById("edit-nombre").value.trim(),
        apellido: document.getElementById("edit-apellido").value.trim(),
        dni: document.getElementById("edit-dni").value.trim(),
        telefono: document.getElementById("edit-telefono").value.trim(),
        email: document.getElementById("edit-email").value.trim(),
        habitacion: Number(document.getElementById("edit-habitacion").value),
        cantPersonas: Number(document.getElementById("edit-cantPersonas").value),
        fechaIngreso: new Date(document.getElementById("edit-fechaIngreso").value).toISOString(),
        fechaSalida: new Date(document.getElementById("edit-fechaSalida").value).toISOString(),
        estado: document.getElementById("edit-estado").value,
      };

      await editarReserva(reservaEditandoId, data);

      // Cerrar modal
      document.getElementById("modal-editar").style.display = "none";

      toastSuccess("Reserva actualizada correctamente."); // antes: alert(...)

      const reservasActualizadas = await obtenerReservas();
      actualizarReserva(reservasActualizadas);
    } catch (error) {
      toastError(error.message); // antes: alert(error.message)
    }
  });
}

export function cerrarModalEditar() {
  document.getElementById("modal-editar").style.display = "none";
}