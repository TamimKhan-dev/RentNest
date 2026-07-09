import { Router } from "express";
import { auth } from "../../middleware/auth";
import { UserRole } from "../../../generated/prisma/enums";
import { paymentController } from "./payment.controller";

const router = Router();

router.post("/create", auth(UserRole.TENANT), paymentController.createPaymentIntent);

export const paymentRoutes = router;