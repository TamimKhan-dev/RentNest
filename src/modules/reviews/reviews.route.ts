import { Router } from "express";
import { auth } from "../../middleware/auth";
import { UserRole } from "../../../generated/prisma/enums";
import { reviewsController } from "./reviews.controller";

const router = Router();

router.post("/", auth(UserRole.TENANT), reviewsController.giveReviews);

export const reviewsRoutes = router;