import { login } from "../api/authApi.js";
import { toastSuccess, toastError } from "../utils/toast.js";
import { EMAIL_REGEX } from "../utils/validators.js";

export async function handleLogin(e) {
  e.preventDefault();

  const email = document.getElementById("email-login").value.trim();
  const password = document.getElementById("password-login").value;

  if (!EMAIL_REGEX.test(email)) {
    return toastError("El email no es válido.");
  }
  if (!password) {
    return toastError("La contraseña es obligatoria.");
  }

  try {
    const data = await login({ email, password });
    localStorage.setItem("token", data.token);
    toastSuccess("Login exitoso.");
    window.location.href = "./dashboard.html";
  } catch (error) {
    toastError(error.message || "Error al iniciar sesión.");
  }
}