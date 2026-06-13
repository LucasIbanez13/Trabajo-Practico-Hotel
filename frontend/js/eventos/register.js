import { register } from "../api/authApi.js";
import { toastSuccess, toastError } from "../utils/toast.js";
import { EMAIL_REGEX, SOLO_LETRAS_REGEX } from "../utils/validators.js";
import { getElements, toggleForms } from "../utils/switchForm.js";

export async function handleRegister(e) {
  e.preventDefault();

  const nombre = document.getElementById("name-register").value.trim();
  const email = document.getElementById("email-register").value.trim();
  const password = document.getElementById("password-register").value;

  if (!SOLO_LETRAS_REGEX.test(nombre)) {
    return toastError("El nombre solo puede contener letras.");
  }
  if (!EMAIL_REGEX.test(email)) {
    return toastError("El email no es válido.");
  }

  try {
    await register({ nombre, email, password });
    toastSuccess("Cuenta creada correctamente. Iniciá sesión.");

    const elements = getElements();
    if (!elements.loginForm.classList.contains("hidden")) {
      // si por algún motivo login está visible, no togglear
    } else {
      toggleForms(elements);
    }
  } catch (error) {
    toastError(error.message || "Error al registrarse.");
  }
}