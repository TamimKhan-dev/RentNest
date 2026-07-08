import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { adminService } from "./admin.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";

const getAllUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await adminService.getAllUsersFromDB();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "All users retrived successfully!",
      data: result,
    });
  },
);

const updateUserIsBanStatus = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const { isBanned } = req.body;

    if (isBanned === undefined || typeof isBanned !== "boolean") {
      return sendResponse(res, {
        success: false,
        statusCode: httpStatus.BAD_REQUEST,
        message:
          "You have to must provide a Boolean value false(unban), true(ban)!",
        data: null,
      });
    }

    const result = await adminService.updateUserIsBanStatusIntoDB(
      Number(id),
      isBanned,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User ban status updated successfully!",
      data: result,
    });
  },
);

const getAllProperties = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await adminService.getAllPropertiesFromDB();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "All Properties retrived successfully!",
      data: result,
    });
  },
);

const getAllRentalRequests = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await adminService.getAllRentalRequestsFromDB();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Rental requests retrived successfully!",
      data: result,
    });
  },
);

export const adminController = {
  getAllUsers,
  getAllProperties,
  getAllRentalRequests,
  updateUserIsBanStatus,
};
