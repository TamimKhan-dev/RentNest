import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { paymentService } from "./payment.service";

const createPaymentIntent = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const tenantId = req.user?.id;
    const { rentalRequestId } = req.body;

    if (!rentalRequestId) {
      return sendResponse(res, {
        success: false,
        statusCode: httpStatus.BAD_REQUEST,
        message: "Please provide a valid rentalRequestId in the request body.",
        data: [],
      });
    }

    const result = await paymentService.createCheckoutSessionIntoDB(
      Number(rentalRequestId),
      Number(tenantId),
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Your payment was successful!",
      data: result,
    });
  },
);

export const paymentController = {
  createPaymentIntent,
};
