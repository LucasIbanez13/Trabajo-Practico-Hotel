import { crearProducto } from "../api/reservaApi.js";

export function initFormCrear() {
  const form = document.getElementById("form-crear");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const dni = document.getElementById("dni").value;
    const telefono = document.getElementById("telefono").value;
    const email = document.getElementById("email").value;
    const habitacion = document.getElementById("habitacion").value;
    const fechaIngreso = document.getElementById("fechaIngreso").value;
    const fechaSalida = document.getElementById("fechaSalida").value;
    const cantPersonas = document.getElementById("cantPersonas").value;

    if (!nombre || !apellido || !dni || !telefono || !email || !habitacion || !fechaIngreso || !fechaSalida || !cantPersonas) {
      alert("Completá todos los campos");
      return;
    }

    await crearProducto({
      nombre, apellido, dni, telefono, email,
      habitacion: Number(habitacion),
      fechaIngreso: new Date(fechaIngreso),
      fechaSalida: new Date(fechaSalida),
      cantPersonas: Number(cantPersonas)
    });

    alert("Reserva creada!");
    form.reset();
  });
}