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
  id: number,
  payload: IUpdatePropertyPayload,
) => {
  const property = await prisma.property.findUnique({
    where: { id },
  });

  if (!property) {
    throw new Error("Property with this ID doesn't Exist!");
  };

  const result = await prisma.property.update({
    where: { id },
    data: {
      ...payload,
    },
  });

  return result;
};

export const landLordService = {
  createPropertyIntoDB,
  updatePropertyIntoDB,
};
