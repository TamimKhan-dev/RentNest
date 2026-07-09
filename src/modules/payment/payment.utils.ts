import Stripe from "stripe";
import { prisma } from "../../lib/prisma";

export const handleCheckoutCompleted = async (
  session: Stripe.Checkout.Session,
) => {
  const rentalRequestId = Number(session.metadata?.rentalRequestId);
  const rentalRequest = await prisma.rentalRequest.findUnique({
    where: { id: rentalRequestId }
  });

  if (!rentalRequestId) {
    throw new Error("Rental request id not found in session metadata.");
  }

  await prisma.$transaction(async (tx) => {
    await tx.payment.update({
      where: {
        transactionId: session.id,
      },
      data: {
        status: "COMPLETED",
        paidAt: new Date(),
      },
    });

    await tx.rentalRequest.update({
      where: {
        id: rentalRequestId,
      },
      data: {
        status: "ACTIVE",
      },
    });

    await tx.property.update({
        where: {
            id: rentalRequest?.propertyId
        },
        data: {
            isAvailable: false
        }
    });
  });
};