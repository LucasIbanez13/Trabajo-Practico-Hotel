export async function obtenerReservas() {
  const res = await fetch("http://localhost:3000/api/reservas");
  const data = await res.json();
  return data;
}

export async function crearProducto() {
}

export async function editarProducto() {
}

export async function eliminarProducto() {
}