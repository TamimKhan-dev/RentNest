import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { landLordService } from "./landlord.service";
import { RentalRequestStatus } from "../../../generated/prisma/enums";

const createProperty = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;

    const result = await landLordService.createPropertyIntoDB(
      payload,
      Number(req.user?.id),
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Property created successfully!",
      data: result,
    });
  },
);

const updateProperty = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const propertyId = req.params.id;
    const landLordId = req.user?.id;

    const result = await landLordService.updatePropertyIntoDB(
      Number(propertyId),
      Number(landLordId),
      payload,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Property updated successfully!",
      data: result,
    });
  },
);

const deleteProperty = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const propertyId = req.params.id;
    const landLordId = req.user?.id;

    const result = await landLordService.deletePropertyFromDB(
      Number(propertyId),
      Number(landLordId),
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Property deleted successfully!",
      data: result,
    });
  },
);

const getRentalRequests = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.user?.id;

    const result = await landLordService.getRentalRequestsFromDB(Number(id));

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Rental requests retrived successfully!",
      data: result,
    });
  },
);

const updateRentalRequestStatus = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const rentalRequestId = req.params.id;
    const landlordId = req.user?.id;
    const { status } = req.body;

    if (!status) {
      return sendResponse(res, {
        success: false,
        statusCode: httpStatus.BAD_REQUEST,
        message: "Provide a valid status to update either pending or approved!",
        data: null
      });
    }

    const result = await landLordService.updateRentalRequestStatusIntoDB(
      Number(rentalRequestId),
      Number(landlordId),
      status.toUpperCase() as RentalRequestStatus,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Rental requests status updated successfully!",
      data: result,
    });
  },
);

export const landLordController = {
  createProperty,
  updateProperty,
  deleteProperty,
  getRentalRequests,
  updateRentalRequestStatus,
};
