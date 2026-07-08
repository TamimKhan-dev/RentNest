import { PropertyWhereInput } from "../../../generated/prisma/models";
import { prisma } from "../../lib/prisma";
import { IPropertyQuery } from "./property.interface";

const getAllPropertiesFromDB = async (query: IPropertyQuery) => {
  const { location, price, type } = query;

  const orConditions: PropertyWhereInput[] = [];

  if (location) {
    orConditions.push({
      location: { contains: location, mode: "insensitive" },
    });
  }

  if (price) {
    orConditions.push({
      price: { equals: Number(price) },
    });
  }

  if (type) {
    orConditions.push({
      category: {
        name: {
          contains: type,
          mode: "insensitive",
        },
      },
    });
  }

  const allProperties = await prisma.property.findMany({
    where: orConditions.length > 0 ? { OR: orConditions } : {},
  });

  return allProperties;
};

export const propertyService = {
  getAllPropertiesFromDB,
};
