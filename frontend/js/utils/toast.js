export function showToast(message, type = "success") {
  const existing = document.querySelector(".toast");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.classList.add("toast", `toast--${type}`);
  toast.textContent = message;
  document.body.appendChild(toast);

  // Desaparece a los 3 segundos
  setTimeout(() => {
    toast.style.opacity = "0";
    // Mantiene el translateX(-50%) del CSS al desaparecer
    toast.style.transform = "translateX(-50%) translateY(10px)";
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

export const toastSuccess = (msg) => showToast(msg, "success");
export const toastError   = (msg) => showToast(msg, "error");