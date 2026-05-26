const soloLetras = (v) => /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(v);
const soloNumeros = (v) => /^\d+$/.test(v);
const emailValido = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const dniValido = (v) => /^\d{7,8}$/.test(v);
const telefonoValido = (v) => /^\d{7,15}$/.test(v);

export function validarReserva(datos) {
  const { nombre, apellido, dni, telefono, email, habitacion, fechaIngreso, fechaSalida, cantPersonas } = datos;

  if (!nombre || !apellido || !dni || !telefono || !email || !habitacion || !fechaIngreso || !fechaSalida || !cantPersonas)
    return "Completá todos los campos.";

  if (!soloLetras(nombre)) return "El nombre solo puede contener letras.";
  if (!soloLetras(apellido)) return "El apellido solo puede contener letras.";
  if (!dniValido(dni)) return "El DNI debe tener 7 u 8 números.";
  if (!telefonoValido(telefono)) return "El teléfono debe tener entre 7 y 15 números.";
  if (!emailValido(email)) return "El email no es válido.";
  if (Number(habitacion) < 1) return "El número de habitación debe ser mayor a 0.";
  if (Number(cantPersonas) < 1) return "La cantidad de personas debe ser al menos 1.";

  const ingreso = new Date(fechaIngreso);
  const salida = new Date(fechaSalida);
  if (isNaN(ingreso.getTime()) || isNaN(salida.getTime())) return "Las fechas no son válidas.";
  if (salida <= ingreso) return "La fecha de salida debe ser posterior a la de ingreso.";

  return null;
}