import { Router } from "express";
import { auth } from "../../middleware/auth";
import { UserRole } from "../../../generated/prisma/enums";
import { landLordController } from "./landlord.controller";

const router = Router();

router.post("/properties", auth(UserRole.LANDLORD), landLordController.createProperty);

export const landLordRoutes = router;