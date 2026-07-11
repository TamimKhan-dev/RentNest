import { Router } from "express";
import { auth } from "../../middleware/auth";
import { UserRole } from "../../../generated/prisma/enums";
import { tenantController } from "./tenant.controller";

const router = Router();

router.patch("/manage-profile", auth(UserRole.TENANT), tenantController.updateTenantProfile);

export const tenantRoutes = router;