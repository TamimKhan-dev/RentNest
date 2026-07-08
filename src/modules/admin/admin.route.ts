import { Router } from "express";
import { auth } from "../../middleware/auth";
import { UserRole } from "../../../generated/prisma/enums";
import { adminController } from "./admin.controller";


const router = Router();

router.get("/properties", auth(UserRole.ADMIN), adminController.getAllProperties);
router.get("/rentals", auth(UserRole.ADMIN), adminController.getAllRentalRequests)
router.get("/users", auth(UserRole.ADMIN), adminController.getAllUsers);
router.post("/categories", auth(UserRole.ADMIN), adminController.createCategory);
router.delete("/categories/:id", auth(UserRole.ADMIN), adminController.deleteCategory);
router.patch("/users/:id", auth(UserRole.ADMIN), adminController.updateUserIsBanStatus);

export const adminRoutes = router;