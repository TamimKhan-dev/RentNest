import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { rentalRequestService } from "./rental-requests.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";

const createRentalRequest = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id;
    const propertyId = req.body.propertyId;

    const result = await rentalRequestService.createRentelRequestIntoDB(
      Number(userId),
      Number(propertyId),
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Rental request sent successfully!",
      data: result,
    });
  },
);

export const rentalRequestController = {
  createRentalRequest,
};
