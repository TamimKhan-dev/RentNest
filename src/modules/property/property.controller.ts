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

const getSingleProperty = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;

        const result = await propertyService.getSinglePropertyFromDB(Number(id));

        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "Property retrived successfully!",
            data: result
        });
    },
);

const getAllCategories = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const result = await propertyService.getAllCategoriesFromDB();


        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "Categories retrived successfully!",
            data: result
        });
    },
);

export const propertyController = {
    getAllProperties,
    getSingleProperty,
    getAllCategories
};