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

const getUsersRentalRequestFromDB = async (id: number) => {
  const rentalRequests = await prisma.rentalRequest.findMany({
    where: { tenantId: id },
  });

  return rentalRequests;
};

const getSingleRentalRequestFromDB = async (id: number) => {
  const rentalRequest = await prisma.rentalRequest.findUnique({
    where: { id },
  });

  if (!rentalRequest) {
    throw new Error("Rental request with this ID doesn't Exist!");
  }

  return rentalRequest;
};

const completeRentalRequestIntoDB = async (
  rentalRequestId: number,
  tenantId: number,
) => {
  const rentalRequest = await prisma.rentalRequest.findUnique({
    where: { id: rentalRequestId, tenantId },
  });

  if (!rentalRequest) {
    throw new Error("Rental request not found");
  }

  if (rentalRequest.status !== "ACTIVE") {
    throw new Error(
      `This rental request is currently ${rentalRequest.status}. Only ACTIVE rental requests can be marked as COMPLETED.`,
    );
  };

  const updatedRequest = await prisma.rentalRequest.update({
    where: { id: rentalRequestId },
    data: { status: "COMPLETED" },
  });

  return updatedRequest;
};

export const rentalRequestService = {
  createRentelRequestIntoDB,
  getUsersRentalRequestFromDB,
  completeRentalRequestIntoDB,
  getSingleRentalRequestFromDB,
};
