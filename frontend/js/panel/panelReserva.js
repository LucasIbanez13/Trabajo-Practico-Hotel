import { obtenerReservas } from "../api/reservaApi.js";

export async function initPanel() {
  const reservas = await obtenerReservas();
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
      <td class="reservas-table__cell">${new Date(reserva.fechaIngreso).toLocaleDateString()}</td>
      <td class="reservas-table__cell">${new Date(reserva.fechaSalida).toLocaleDateString()}</td>
      <td class="reservas-table__cell">${reserva.cantPersonas}</td>
      <td class="reservas-table__cell reservas-table__cell--estado">
        <span class="reservas-table__cell--${reserva.estado}">${reserva.estado}</span>
      </td>
      <td class="reservas-table__cell">
        <div class="reservas-table__actions">
          <button class="btn-action btn-action--edit" id="edit-btn-${reserva.id}">Editar</button>
          <button class="btn-action btn-action--delete" id="delete-btn-${reserva.id}">Eliminar</button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });
}