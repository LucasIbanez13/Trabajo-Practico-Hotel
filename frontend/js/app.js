import { initPanel } from "./panel/panelReserva.js";
import { initFormCrear } from "./eventos/createReserva.js";

document.addEventListener("DOMContentLoaded", () => {
  initPanel();
  initFormCrear();
});