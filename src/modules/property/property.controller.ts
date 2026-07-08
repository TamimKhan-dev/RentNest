import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { propertyService } from "./property.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from 'http-status';

const getAllProperties = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const query = req.query;

        const result = await propertyService.getAllPropertiesFromDB(query);

        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "All properties retrived successfully!",
            data: result
        });
    },
);

export const propertyController = {
    getAllProperties,
};