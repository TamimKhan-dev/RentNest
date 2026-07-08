import { prisma } from "../../lib/prisma";

const createRentelRequestIntoDB = async (
  userId: number,
  propertyId: number,
) => {
  const property = await prisma.property.findUnique({
    where: { id: propertyId },
  });

  const rentalRequest = await prisma.rentalRequest.findFirst({
    where: { tenantId: userId, propertyId },
  });

  if (rentalRequest) {
    throw new Error(
      "You have already sent rental request to this property owner",
    );
  }

  if (!property) {
    throw new Error("Property with this ID doesn't Exist!");
  }

  if (!property.isAvailable) {
    throw new Error("Property isn't available at this moment");
  }

  const result = await prisma.rentalRequest.create({
    data: {
      tenantId: userId,
      propertyId: propertyId,
    },
  });

  return result;
};

export const rentalRequestService = {
  createRentelRequestIntoDB,
};
