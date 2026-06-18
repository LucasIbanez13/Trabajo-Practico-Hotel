import { obtenerUsuarios } from "../api/usuarioApi.js";
import { abrirModalEditarUsuario } from "../eventos/editarUsuario.js";
import { handleEliminarUsuario } from "../eventos/deleteUsuario.js";

function getIdFromToken() {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.id;
  } catch {
    return null;
  }
}

export function actualizarTablaUsuarios(usuarios) {
  const tbody = document.getElementById("tabla-usuarios");
  const miId = getIdFromToken();
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
    const esMiCuenta = usuario.id === miId;

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
          ${!esMiCuenta ? `
          <button class="btn-action btn-action--delete" data-id="${usuario.id}">
            Eliminar
          </button>` : `
          <span style="font-size:0.75rem; color:var(--color-text-muted); padding: 0.3rem 0.75rem;">
            Tu cuenta
          </span>`}
        </div>
      </td>
    `;

    tbody.appendChild(tr);

    tr.querySelector(".btn-action--edit").addEventListener("click", () => {
      abrirModalEditarUsuario(usuario);
    });

    if (!esMiCuenta) {
      tr.querySelector(".btn-action--delete").addEventListener("click", async () => {
        await handleEliminarUsuario(usuario.id);
      });
    }
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