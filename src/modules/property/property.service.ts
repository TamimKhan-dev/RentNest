import { PropertyWhereInput } from "../../../generated/prisma/models";
import { prisma } from "../../lib/prisma";
import { IPropertyQuery } from "./property.interface";

const getAllPropertiesFromDB = async (query: IPropertyQuery) => {
  const {
    location,
    minPrice,
    maxPrice,
    type,
    amenities,
  } = query;

  const andConditions: PropertyWhereInput[] = [];

  if (location) {
    andConditions.push({
      location: {
        contains: location,
        mode: "insensitive",
      },
    });
  }

  if (minPrice || maxPrice) {
    andConditions.push({
      price: {
        ...(minPrice && { gte: Number(minPrice) }),
        ...(maxPrice && { lte: Number(maxPrice) }),
      },
    });
  }

  if (type) {
    andConditions.push({
      category: {
        name: {
          contains: type,
          mode: "insensitive",
        },
      },
    });
  }

  if (amenities) {
    const amenitiesArray = amenities
      .split(",")
      .map((item: string) => item.trim());

    andConditions.push({
      amenities: {
        hasEvery: amenitiesArray
      },
    });
  }

  const properties = await prisma.property.findMany({
    where: andConditions.length
      ? {
          isAvailable: true,
          AND: andConditions,
        }
      : { isAvailable: true },
    include: {
      category: {
        select: {
          name: true,
        },
      },
    },
  });

  return properties;
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
