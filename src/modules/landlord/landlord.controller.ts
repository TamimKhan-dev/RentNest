import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { landLordService } from "./landlord.service";

const createProperty = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const payload = req.body;

        const result = await landLordService.createPropertyIntoDB(payload, Number(req.user?.id));

        sendResponse(res, {
            success: true,
            statusCode: httpStatus.CREATED,
            message: "Property created successfully!",
            data: result
        });
    }
);

export const landLordController = {
    createProperty,
};