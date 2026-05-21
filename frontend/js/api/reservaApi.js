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

export async function eliminarReserva(id) {
  const res = await fetch(`http://localhost:3000/api/reservas/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Error al eliminar reserva");
  }
}

export async function editarReserva(id, data) {
  const res = await fetch(`http://localhost:3000/api/reservas/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Error al actualizar la reserva");
  }

  return result;
}