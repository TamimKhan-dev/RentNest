import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { tenantService } from "./tenant.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";

const updateTenantProfile = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const tenantId = req.user?.id;
    const payload = req.body;

    const result = await tenantService.updateTenantProfileIntoDB(payload, Number(tenantId));

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Profile updated successfully!",
      data: result,
    });
  },
);

export const tenantController = {
  updateTenantProfile,
};
