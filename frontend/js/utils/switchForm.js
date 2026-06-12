function getElements() {
    return {
        headerTitle: document.querySelector(".header__title"),
        loginForm: document.getElementById("form-login"),
        registerForm: document.getElementById("form-register"),
        switchButton: document.getElementById("switch-form"),
        switchText: document.getElementById("switch-text"),
    };
}

function toggleForms({ headerTitle, loginForm, registerForm, switchButton, switchText }) {
    loginForm.classList.toggle("hidden");
    registerForm.classList.toggle("hidden");

    if (loginForm.classList.contains("hidden")) {
        headerTitle.textContent = "Registrarte";
        switchText.textContent = "Ya tienes una cuenta?";
        switchButton.textContent = "Iniciar Sesión";
    } else {
        headerTitle.textContent = "Iniciar Sesión";
        switchText.textContent = "No tienes una cuenta?";
        switchButton.textContent = "Registrarte";
    }
}

export function initSwitchForm() {
    const elements = getElements();
    elements.switchButton.addEventListener("click", () => toggleForms(elements));
}