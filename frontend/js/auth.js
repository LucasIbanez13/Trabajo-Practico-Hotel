import { initSwitchForm } from "./utils/switchForm.js";
import { handleLogin } from "./eventos/login.js";
import { handleRegister } from "./eventos/register.js";

document.addEventListener("DOMContentLoaded", () => {
    initSwitchForm();
    document.getElementById("form-login").addEventListener("submit", handleLogin);
    document.getElementById("form-register").addEventListener("submit", handleRegister);
});