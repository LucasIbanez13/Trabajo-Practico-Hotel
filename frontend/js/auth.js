import { initSwitchForm } from "./utils/switchForm.js";
import authRoutes from "./routes/auth.routes.js";

document.addEventListener("DOMContentLoaded", () => {
    initSwitchForm();
});


app.use("/auth", authRoutes);