import { prisma } from "../../lib/prisma";

const getAllUsersFromDB = async () => {
  const result = await prisma.user.findMany();

  return result;
};

const updateUserIsBanStatusIntoDB = async (
  userId: number,
  isBanned: boolean,
) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("User with this ID doesn't Exist");
  }

  const result = await prisma.user.update({
    where: { id: userId },
    data: { isBanned },
  });

  return result;
};

const getAllPropertiesFromDB = async () => {
  const result = await prisma.property.findMany();

  return result;
};

const getAllRentalRequestsFromDB = async () => {
  const result = await prisma.rentalRequest.findMany();

  return result;
};

const createCategoryIntoDB = async (categoryName: string) => {
  const existingCategory = await prisma.category.findFirst({
    where: {
      name: {
        equals: categoryName,
        mode: "insensitive",
      },
    },
  });

  if (existingCategory) {
    throw new Error("This category already exists!");
  };

  const result = await prisma.category.create({
    data: { name: categoryName }
  });

  return result;
};

const deleteCategoryFromDB = async (id: number) => {
    const isCategoryExist = await prisma.category.findUnique({
        where: { id }
    });

    if (!isCategoryExist) {
        throw new Error("Category with this ID doesn't exist!");
    };

    const result = await prisma.category.delete({
        where: { id }
    });

    return result;
};

export const adminService = {
  getAllUsersFromDB,
  deleteCategoryFromDB,
  createCategoryIntoDB,
  getAllPropertiesFromDB,
  getAllRentalRequestsFromDB,
  updateUserIsBanStatusIntoDB,
};
