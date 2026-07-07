import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import { IUserPayload } from "./auth.interface";
import config from "../../config";

const registerUserIntoDB = async (payload: IUserPayload) => {
  const { email, password } = payload;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (user) {
    throw new Error("User with this email already exists!");
  }

  const hashPassword = await bcrypt.hash(
    password,
    Number(config.bcrypt_salt_rounds),
  );

  const createUser = await prisma.user.create({
    data: {
      ...payload,
      password: hashPassword
    },
  });

  const result = await prisma.user.findUnique({
    where: { id: createUser.id },
    omit: { password: true },
  });

  return result;
};

export const authService = {
  registerUserIntoDB,
};
