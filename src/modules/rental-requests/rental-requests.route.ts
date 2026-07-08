import { Router } from "express";
import { auth } from "../../middleware/auth";
import { UserRole } from "../../../generated/prisma/enums";
import { rentalRequestController } from "./rental-requests.controller";

const router = Router();

router.post("/", auth(UserRole.TENANT), rentalRequestController.createRentalRequest);
router.get("/", auth(UserRole.TENANT), rentalRequestController.getUsersRentalRequests);
router.get("/:id", auth(UserRole.TENANT), rentalRequestController.getSingleRentalRequest)

export const rentalRequestRoutes = router;