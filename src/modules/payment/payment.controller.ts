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

const getAllPaymentHistory = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user;

    const result = await paymentService.getAllPaymentHistoryFromDB(
      Number(user?.id),
      user?.role as string,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Payment history retrieved successfully",
      data: result,
    });
  },
);

const getSinglePaymentDetails = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
        const user = req.user;
        const paymentId = req.params.id;

    const result = await paymentService.getSinglePaymentDetailsFromDB(
      Number(user?.id),
      Number(paymentId),
      user?.role as string,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Payment details retrieved successfully",
      data: result,
    });
  },
);

const handleWebhook = catchAsync(
 async( req : Request, res : Response, next : NextFunction) => {
        const event = req.body as Buffer;
        const signature = req.headers['stripe-signature']!;

        await paymentService.handleWebhook(event, signature as string)

        sendResponse(res, {
            success : true,
            statusCode : 200,
            message : "Webhook triggered successfully",
            data : null
        })
    }
);

export const paymentController = {
  handleWebhook,
  getSinglePaymentDetails,
  getAllPaymentHistory,
  createPaymentIntent,
};
