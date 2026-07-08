import { prisma } from "../../lib/prisma";

const getAllUsersFromDB = async () => {
    const result = await prisma.user.findMany();

    return result;
};

export const adminService = {
    getAllUsersFromDB
};