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
    include: {
        category: { select: { name: true }}
    }
  });

  return allProperties;
};

const getSinglePropertyFromDB = async (id: number) => {
    const property = await prisma.property.findUnique({
        where: { id },
        include: { category: {
            select: { name: true }
        }}
    });

    if (!property) {
        throw new Error("Property does not Exist!");
    };


    return property;
};

const getAllCategoriesFromDB = async () => {
    const categories = await prisma.category.findMany();


    return categories;
};

export const propertyService = {
  getAllPropertiesFromDB,
  getSinglePropertyFromDB,
  getAllCategoriesFromDB
};
