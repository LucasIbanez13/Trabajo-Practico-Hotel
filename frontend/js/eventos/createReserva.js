import { crearReserva } from "../api/reservaApi.js";

function setError(id, mensaje) {
  const input = document.getElementById(id);
  let error = input.nextElementSibling;

  if (!error || !error.classList.contains("error-msg")) {
    error = document.createElement("div");
    error.className = "error-msg";
    error.style.color = "red";
    error.style.fontSize = "12px";
    input.insertAdjacentElement("afterend", error);
  }

  error.textContent = mensaje;
  input.style.border = "1px solid red";
}

function clearError(id) {
  const input = document.getElementById(id);
  let error = input.nextElementSibling;

  if (error && error.classList.contains("error-msg")) {
    error.remove();
  }

  input.style.border = "";
}

function validar(datos) {
  let valido = true;

  const { nombre, apellido, dni, telefono, email, habitacion, fechaIngreso, fechaSalida, cantPersonas } = datos;

  if (!nombre || !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre)) {
    setError("nombre", !nombre ? "El nombre es obligatorio" : "Solo letras");
    valido = false;
  } else clearError("nombre");

  if (!apellido || !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(apellido)) {
    setError("apellido", !apellido ? "El apellido es obligatorio" : "Solo letras");
    valido = false;
  } else clearError("apellido");

  if (!dni || !/^\d{7,8}$/.test(dni)) {
    setError("dni", !dni ? "El DNI es obligatorio" : "El DNI debe tener 7 u 8 números");
    valido = false;
  } else clearError("dni");

  if (!telefono || !/^\d{7,15}$/.test(telefono)) {
    setError("telefono", !telefono ? "El teléfono es obligatorio" : "Entre 7 y 15 números");
    valido = false;
  } else clearError("telefono");

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setError("email", !email ? "El email es obligatorio" : "Email inválido");
    valido = false;
  } else clearError("email");

  if (!habitacion || Number(habitacion) < 1) {
    setError("habitacion", "El número de habitación debe ser mayor a 0");
    valido = false;
  } else clearError("habitacion");

  if (!cantPersonas || Number(cantPersonas) < 1) {
    setError("cantPersonas", "La cantidad de personas debe ser al menos 1");
    valido = false;
  } else clearError("cantPersonas");

  if (!fechaIngreso || !fechaSalida) {
    alert("Las fechas son obligatorias");
    return false;
  }

  if (new Date(fechaSalida) <= new Date(fechaIngreso)) {
    alert("La fecha de salida debe ser posterior a la de ingreso");
    return false;
  }

  return valido;
}

export function initFormCrear() {
  const form = document.getElementById("form-crear");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const datos = {
      nombre: document.getElementById("nombre").value.trim(),
      apellido: document.getElementById("apellido").value.trim(),
      dni: document.getElementById("dni").value.trim(),
      telefono: document.getElementById("telefono").value.trim(),
      email: document.getElementById("email").value.trim(),
      habitacion: document.getElementById("habitacion").value,
      fechaIngreso: document.getElementById("fechaIngreso").value,
      fechaSalida: document.getElementById("fechaSalida").value,
      cantPersonas: document.getElementById("cantPersonas").value,
      estado: "pendiente",
    };

    const esValido = validar(datos);
    if (!esValido) return;

    try {
      await crearReserva({
        ...datos,
        habitacion: Number(datos.habitacion),
        fechaIngreso: new Date(datos.fechaIngreso).toISOString(),
        fechaSalida: new Date(datos.fechaSalida).toISOString(),
        cantPersonas: Number(datos.cantPersonas),
      });

      alert("Reserva creada correctamente!");
      form.reset();

    } catch (err) {
      alert(err.message);
    }
  });
}