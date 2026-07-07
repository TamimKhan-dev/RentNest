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

const loginUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;

    const { accessToken, refreshToken } = await authService.loginUserFromDB(payload);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24, // 24 hour
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 day
    });

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User logged in successfully!",
      data: { accessToken, refreshToken },
    });
  },
);

export const authController = {
  registerUser,
  loginUser,
};
