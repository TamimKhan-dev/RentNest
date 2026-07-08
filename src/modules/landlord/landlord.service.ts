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
          email: true
        }
      }  
    },
    orderBy: {createdAt: "desc"}
  });

  return property;
};

export const landLordService = {
  createPropertyIntoDB,
  updatePropertyIntoDB,
  deletePropertyFromDB,
  getRentalRequestsFromDB,
};
