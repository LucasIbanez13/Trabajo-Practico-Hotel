import { crearReserva } from "../api/reservaApi.js";

const validar = (datos) => {
  const { nombre, apellido, dni, telefono, email, habitacion, fechaIngreso, fechaSalida, cantPersonas } = datos;

  if (!nombre || !apellido || !dni || !telefono || !email || !habitacion || !fechaIngreso || !fechaSalida || !cantPersonas) {
    return "Completá todos los campos.";
  }

  if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre)) return "El nombre solo puede contener letras.";
  if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(apellido)) return "El apellido solo puede contener letras.";
  if (!/^\d{7,8}$/.test(dni)) return "El DNI debe tener 7 u 8 números sin puntos ni espacios.";
  if (!/^\d{7,15}$/.test(telefono)) return "El teléfono debe tener entre 7 y 15 números.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "El email no es válido.";
  if (Number(habitacion) < 1) return "El número de habitación debe ser mayor a 0.";
  if (Number(cantPersonas) < 1) return "La cantidad de personas debe ser al menos 1.";

  const ingreso = new Date(fechaIngreso);
  const salida = new Date(fechaSalida);
  if (isNaN(ingreso.getTime()) || isNaN(salida.getTime())) return "Las fechas no son válidas.";
  if (salida <= ingreso) return "La fecha de salida debe ser posterior a la de ingreso.";

  return null;
};

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
    };

    const error = validar(datos);
    if (error) {
      alert(error);
      return;
    }

    try {
      await crearReserva({
        ...datos,
        habitacion: Number(datos.habitacion),
        fechaIngreso: new Date(datos.fechaIngreso).toISOString(),
        fechaSalida: new Date(datos.fechaSalida).toISOString(),
        cantPersonas: Number(datos.cantPersonas),
      });

      alert("Reserva creada!");
      form.reset();
    } catch (err) {
      alert(err.message);
    }
  });
}