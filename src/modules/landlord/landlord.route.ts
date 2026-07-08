import { Router } from "express";
import { auth } from "../../middleware/auth";
import { UserRole } from "../../../generated/prisma/enums";
import { landLordController } from "./landlord.controller";

const router = Router();

router.post("/properties", auth(UserRole.LANDLORD), landLordController.createProperty);
router.put("/properties/:id", auth(UserRole.LANDLORD), landLordController.updateProperty);
router.delete("/properties/:id", auth(UserRole.LANDLORD), landLordController.deleteProperty);
router.get("/requests", auth(UserRole.LANDLORD), landLordController.getRentalRequests);
router.patch("/requests/:id", auth(UserRole.LANDLORD), landLordController.updateRentalRequestStatus);

export const landLordRoutes = router;