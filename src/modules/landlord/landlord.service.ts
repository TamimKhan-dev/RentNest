import { RentalRequestStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import {
  IPropertyDetailsPayload,
  IUpdatePropertyPayload,
} from "./landlord.interface";

const createPropertyIntoDB = async (
  payload: IPropertyDetailsPayload,
  userId: number,
) => {
  const { categoryId } = payload;

  const category = await prisma.category.findUnique({
    where: { id: categoryId },
  });

  if (!category) {
    throw new Error(
      "Category you provided doesn't Exist! (Category ID must be between 1 and 4)",
    );
  }

  const createProperty = await prisma.property.create({
    data: {
      ...payload,
      ownerId: userId,
    },
  });

  const result = await prisma.property.findUnique({
    where: { id: createProperty.id },
  });

  return result;
};

const updatePropertyIntoDB = async (
  propertyId: number,
  landLordId: number,
  payload: IUpdatePropertyPayload,
) => {
  const property = await prisma.property.findUnique({
    where: { id: propertyId },
  });

  if (!property) {
    throw new Error("Property with this ID doesn't Exist!");
  }

  if (property.ownerId !== landLordId) {
    throw new Error("Unauthorized: You do not own this property");
  }

  const result = await prisma.property.update({
    where: { id: propertyId },
    data: {
      ...payload,
    },
  });

  return result;
};

const deletePropertyFromDB = async (propertyId: number, landLordId: number) => {
  const property = await prisma.property.findUnique({
    where: { id: propertyId },
  });

  if (!property) {
    throw new Error("Property with this ID doesn't Exist!");
  }

  if (property.ownerId !== landLordId) {
    throw new Error("Unauthorized: You do not own this property");
  }

  const result = await prisma.property.delete({
    where: { id: propertyId },
  });

  return result;
};

const getRentalRequestsFromDB = async (id: number) => {
  const property = await prisma.rentalRequest.findMany({
    where: {
      property: {
        ownerId: id,
      },
    },
    include: {
      property: true,
      tenant: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return property;
};

const updateRentalRequestStatusIntoDB = async (
  rentalRequestId: number,
  landlordId: number,
  newStatus: RentalRequestStatus,
) => {
  const rentalRequest = await prisma.rentalRequest.findUnique({
    where: { id: rentalRequestId },
    include: { property: true },
  });

  if (newStatus !== "APPROVED" && newStatus !== "REJECTED") {
    throw new Error(
      "Invalid status update! Landlords can only set status to APPROVED or REJECTED.",
    );
  }

  if (!rentalRequest) {
    throw new Error("Rental request with this ID doesn't Exist");
  }

  if (rentalRequest?.property.ownerId !== landlordId) {
    throw new Error(
      "You don't own this property that's why you can't update it's status",
    );
  }

  const result = await prisma.rentalRequest.update({
    where: { id: rentalRequestId },
    data: { status: newStatus },
  });

  return result;
};

export const landLordService = {
  createPropertyIntoDB,
  updatePropertyIntoDB,
  deletePropertyFromDB,
  getRentalRequestsFromDB,
  updateRentalRequestStatusIntoDB,
};
