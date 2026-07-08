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


export const adminService = {
  getAllUsersFromDB,
  getAllPropertiesFromDB,
  getAllRentalRequestsFromDB,
  updateUserIsBanStatusIntoDB
};
