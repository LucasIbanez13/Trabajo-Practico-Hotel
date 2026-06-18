import { obtenerUsuarios } from "../api/usuarioApi.js";
import { abrirModalEditarUsuario } from "../eventos/editarUsuario.js";
import { handleEliminarUsuario } from "../eventos/deleteUsuario.js";
import { abrirModalPassword } from "../eventos/cambiarPassword.js";

export function actualizarTablaUsuarios(usuarios) {
  const tbody = document.getElementById("tabla-usuarios");
  tbody.innerHTML = "";

  if (!usuarios || usuarios.length === 0) {
    const tr = document.createElement("tr");
    tr.classList.add("reservas-table__row");
    tr.innerHTML = `
      <td class="reservas-table__cell reservas-table__empty" colspan="5">
        No hay usuarios registrados
      </td>
    `;
    tbody.appendChild(tr);
    return;
  }

  usuarios.forEach((usuario) => {
    const tr = document.createElement("tr");
    tr.classList.add("reservas-table__row");

    tr.innerHTML = `
      <td class="reservas-table__cell">${usuario.id}</td>
      <td class="reservas-table__cell">${usuario.nombre}</td>
      <td class="reservas-table__cell">${usuario.email}</td>
      <td class="reservas-table__cell reservas-table__cell--estado">
        <span class="usuario-rol usuario-rol--${usuario.rol}">
          ${usuario.rol}
        </span>
      </td>
      <td class="reservas-table__cell">
        <div class="reservas-table__actions">
          <button class="btn-action btn-action--edit" data-id="${usuario.id}">
            Editar
          </button>
          <button class="btn-action btn-action--password" data-id="${usuario.id}">
            Contraseña
          </button>
          <button class="btn-action btn-action--delete" data-id="${usuario.id}">
            Eliminar
          </button>
        </div>
      </td>
    `;

    tbody.appendChild(tr);

    tr.querySelector(".btn-action--edit").addEventListener("click", () => {
      abrirModalEditarUsuario(usuario);
    });

    tr.querySelector(".btn-action--password").addEventListener("click", () => {
      abrirModalPassword(usuario.id);
    });

    tr.querySelector(".btn-action--delete").addEventListener("click", async () => {
      await handleEliminarUsuario(usuario.id);
    });
  });
}

export async function initPanelUsuarios() {
  try {
    const usuarios = await obtenerUsuarios();
    actualizarTablaUsuarios(usuarios);
  } catch (error) {
    console.error("Error al cargar usuarios:", error);
  }
}