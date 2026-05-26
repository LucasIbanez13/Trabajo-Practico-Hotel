import { obtenerReservas } from "../api/reservaApi.js";
import { abrirModalEditar } from "../eventos/editarReserva.js";
import { handleEliminarReserva } from "../eventos/deleteReserva.js";

export function actualizarReserva(reservas) {
  const tbody = document.getElementById("tabla-reservas");
  tbody.innerHTML = "";

  reservas.forEach(reserva => {

    const tr = document.createElement("tr");
    tr.classList.add("reservas-table__row");

    tr.innerHTML = `
      <td class="reservas-table__cell">${reserva.nombre}</td>
      <td class="reservas-table__cell">${reserva.apellido}</td>
      <td class="reservas-table__cell">${reserva.dni}</td>
      <td class="reservas-table__cell">${reserva.telefono}</td>
      <td class="reservas-table__cell">${reserva.email}</td>
      <td class="reservas-table__cell">${reserva.habitacion}</td>

      <td class="reservas-table__cell">
        ${new Date(reserva.fechaIngreso).toLocaleDateString()}
      </td>

      <td class="reservas-table__cell">
        ${new Date(reserva.fechaSalida).toLocaleDateString()}
      </td>

      <td class="reservas-table__cell">${reserva.cantPersonas}</td>

      <td class="reservas-table__cell reservas-table__cell--estado">
        <span class="reservas-table__cell--${reserva.estado}">
          ${reserva.estado}
        </span>
      </td>

      <td class="reservas-table__cell">
        <div class="reservas-table__actions">

          <button 
            class="btn-action btn-action--edit"
            data-id="${reserva.id}">
            Editar
          </button>

          <button 
            class="btn-action btn-action--delete"
            data-id="${reserva.id}">
            Eliminar
          </button>

        </div>
      </td>
    `;

    tbody.appendChild(tr);

    const btnEditar = tr.querySelector(".btn-action--edit");

    btnEditar.addEventListener("click", () => {
      abrirModalEditar(reserva);
    });

  });

  // eliminar
  initBotonesEliminar();
}


function initBotonesEliminar() {

  const botones = document.querySelectorAll(".btn-action--delete");

  botones.forEach((boton) => {

    boton.addEventListener("click", async () => {
      const id = boton.dataset.id;
      await handleEliminarReserva(id);
    });

  });

}


function initBotonNuevaReserva() {

  const btn = document.getElementById("btn-nueva-reserva");
  const modal = document.getElementById("modal-crear-reserva");

  const btnCerrar = document.getElementById("btn-cerrar-modal");
  const btnCancelar = document.getElementById("btn-cancelar");

  btn?.addEventListener("click", () => {
    modal.style.display = "flex";
  });

  btnCerrar?.addEventListener("click", () => {
    modal.style.display = "none";
  });

  btnCancelar?.addEventListener("click", () => {
    modal.style.display = "none";
  });

}


export async function initPanel() {

  try {
    const reservas = await obtenerReservas();

    actualizarReserva(reservas);

    initBotonNuevaReserva();

  } catch (error) {
    console.error(error);
  }
}