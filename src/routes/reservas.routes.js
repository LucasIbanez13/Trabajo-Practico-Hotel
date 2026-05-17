import { Router } from "express";
import { getCategories, createCategory } from "../controllers/categories.controller.js";

const router = Router();

router.get("/reservas", getCategories);




export default router;