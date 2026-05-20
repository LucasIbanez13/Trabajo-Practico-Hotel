export async function obtenerReservas() {
  const res = await fetch("http://localhost:3000/api/reservas");
  const data = await res.json();
  return data;
}

export async function crearReserva(data) {
  const res = await fetch("http://localhost:3000/api/reservas", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const result = await res.json();
  if (!res.ok) throw new Error(result.message || "Error al crear la reserva");
  return result;
}

export async function editarProducto() {
}

export async function eliminarProducto() {
}