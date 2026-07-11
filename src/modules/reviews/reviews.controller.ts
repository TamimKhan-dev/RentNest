import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { reviewsService } from "./reviews.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";

const giveReviews = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const tenantId = req.user?.id;

    const result = await reviewsService.giveReviews(payload, Number(tenantId));

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Reviews has been given successfully!",
      data: result,
    });
  },
);

export const reviewsController = {
  giveReviews,
};
