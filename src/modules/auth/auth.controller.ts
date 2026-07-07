import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { authService } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { UserRole } from "../../../generated/prisma/enums";

const registerUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    let role: UserRole;

    if (req.body.role === "tenant") {
      role = UserRole.TENANT;
    } else if (req.body.role === "landlord") {
      role = UserRole.LANDLORD;
    } else {
      return sendResponse(res, {
        success: false,
        statusCode: httpStatus.BAD_REQUEST,
        message:
          "Role you provide is not valid, role should be either 'tenant' or 'landlord'",
        data: {},
      });
    }

    const payload = {
      ...req.body,
      role: role,
    };

    const result = await authService.registerUserIntoDB(payload);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "User registered successfully",
      data: result,
    });
  },
);

export const authController = {
  registerUser,
};
