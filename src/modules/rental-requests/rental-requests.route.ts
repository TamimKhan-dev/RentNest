import { Router } from "express";
import { auth } from "../../middleware/auth";
import { UserRole } from "../../../generated/prisma/enums";
import { rentalRequestController } from "./rental-requests.controller";

const router = Router();

router.post("/", auth(UserRole.TENANT), rentalRequestController.createRentalRequest);

export const rentalRequestRoutes = router;