import { Router } from "express";
import { auth } from "../../middleware/auth";
import { UserRole } from "../../../generated/prisma/enums";
import { paymentController } from "./payment.controller";

const router = Router();

router.post("/create", auth(UserRole.TENANT), paymentController.createPaymentIntent);
router.post("/confirm/webhook", paymentController.handleWebhook);
router.get("/", auth(UserRole.TENANT, UserRole.ADMIN), paymentController.getAllPaymentHistory);
router.get("/:id", auth(UserRole.TENANT, UserRole.ADMIN), paymentController.getSinglePaymentDetails);

export const paymentRoutes = router;