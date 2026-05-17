import { prisma } from "../db.js";

export const getCategories = async (req, res, next) => {
  try {
    const categories = await prisma.category.findMany({
      include: { products: true },
    });
    res.json(categories);
  } catch (error) {
    next(error);
  }
};

export const createCategory = async (req, res, next) => {
  try {
    const category = await prisma.category.create({
      data: req.body,
    });
    res.json(category);
  } catch (error) {
    next(error);
  }
};