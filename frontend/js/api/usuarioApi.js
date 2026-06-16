function getAuthHeaders(contentType = true) {
  const token = localStorage.getItem("token");
  return {
    ...(contentType && { "Content-Type": "application/json" }),
    Authorization: `Bearer ${token}`,
  };
}

export async function obtenerUsuarios() {
  const res = await fetch("http://localhost:3000/api/usuarios", {
    headers: getAuthHeaders(false),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Error al obtener usuarios");
  }

  return data;
}

export async function editarUsuario(id, data) {
  const res = await fetch(`http://localhost:3000/api/usuarios/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Error al actualizar el usuario");
  }

  return result;
}

export async function eliminarUsuario(id) {
  const res = await fetch(`http://localhost:3000/api/usuarios/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(false),
  });

  if (!res.ok) {
    const result = await res.json();
    throw new Error(result.message || "Error al eliminar el usuario");
  }
}