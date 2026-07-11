import { prisma } from "../../lib/prisma";
import { IReviewPayload } from "./reviews.interface";

const giveReviews = async (payload: IReviewPayload, tenantId: number) => {
  const { propertyId, rating } = payload;

  const completedRental = await prisma.rentalRequest.findFirst({
    where: {
      tenantId,
      propertyId,
      status: "COMPLETED",
    },
  });

  const existingReview = await prisma.review.findFirst({
    where: {
      tenantId,
      propertyId,
    },
  });

  if (rating < 1 || rating > 5) {
    throw new Error("Rating must be between 1 and 5");
  };

  if (!completedRental) {
    throw new Error(
      "You can only review a property after completing its rental.",
    );
  }

  if (existingReview) {
    throw new Error("You have already reviewed this property.");
  }

  const result = await prisma.review.create({
    data: {
      ...payload,
      tenantId,
    },
  });

  return result;
};

export const reviewsService = {
  giveReviews,
};
