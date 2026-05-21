import { initPanel } from "./panel/panelReserva.js";
import { initFormCrear } from "./eventos/createReserva.js";
import { initEditarReserva } from "./eventos/editarReserva.js";


document.addEventListener("DOMContentLoaded", () => {
  initPanel();
  initFormCrear();
  initEditarReserva();

});