import config from "../../config";
import { prisma } from "../../lib/prisma";
import { stripe } from "../../lib/stripe";
import { handleCheckoutCompleted } from "./payment.utils";

const createCheckoutSessionIntoDB = async (
  rentalRequestId: number,
  userId: number,
) => {
  const rentalRequest = await prisma.rentalRequest.findUnique({
    where: { id: rentalRequestId },
    include: { property: true, payments: true },
  });

  if (!rentalRequest) {
    throw new Error("Rental request not found!");
  }

  if (rentalRequest.tenantId !== userId) {
    throw new Error("This rental request does not belong to you.");
  }

  if (
    rentalRequest.payments.some((payment) => payment.status === "COMPLETED")
  ) {
    throw new Error("You have already paid for this property!");
  }

  if (rentalRequest.status !== "APPROVED") {
    throw new Error(
      "You can only pay for rental requests that are APPROVED by the landlord.",
    );
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",

    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: `Rent Payment - Property #${rentalRequest.propertyId}`,
          },
          unit_amount: Math.round(rentalRequest.property.price * 100),
        },
        quantity: 1,
      },
    ],

    metadata: {
      rentalRequestId: rentalRequestId.toString(),
      tenantId: userId.toString(),
    },

    success_url: "http://localhost:3000/payment/success",
    cancel_url: "http://localhost:3000/payment/cancel",
  });

  await prisma.payment.create({
    data: {
      rentalRequestId,
      transactionId: session.id,
      amount: rentalRequest.property.price,
      status: "PENDING",
      provider: "stripe",
    },
  });

  return {
    paymentUrl: session.url,
  };
};

const handleWebhook = async (payload: Buffer, signature: string) => {
  const endpointSecret = config.stripe_webhook_secret;
  const event = stripe.webhooks.constructEvent(
    payload,
    signature,
    endpointSecret as string,
  );

  switch (event.type) {
    case "checkout.session.completed":
      await handleCheckoutCompleted(event.data.object);
      break;
    default:
      console.log(`No events matched. Unhandled event type ${event.type}.`);
      break;
  }
};

export const paymentService = {
  handleWebhook,
  createCheckoutSessionIntoDB,
};
