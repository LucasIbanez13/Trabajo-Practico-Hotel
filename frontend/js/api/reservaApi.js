function getAuthHeaders(contentType = true) {
  const token = localStorage.getItem("token");

  return {
    ...(contentType && { "Content-Type": "application/json" }),
    Authorization: `Bearer ${token}`,
  };
}

export async function obtenerReservas() {
  const res = await fetch("http://localhost:3000/api/reservas", {
    headers: getAuthHeaders(false),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Error al obtener reservas");
  }

  return data;
}

export async function crearReserva(data) {
  const res = await fetch("http://localhost:3000/api/reservas", {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Error al crear la reserva");
  }

  return result;
}

export async function eliminarReserva(id) {
  const res = await fetch(`http://localhost:3000/api/reservas/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(false),
  });

  if (!res.ok) {
    const result = await res.json();
    throw new Error(result.message || "Error al eliminar reserva");
  }
}

export async function editarReserva(id, data) {
  const res = await fetch(`http://localhost:3000/api/reservas/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Error al actualizar la reserva");
  }

  return result;
}