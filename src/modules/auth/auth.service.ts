import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import { ILoginPayload, IUserPayload } from "./auth.interface";
import config from "../../config";
import { jwtUtils } from "../../utils/jwt";
import { SignOptions } from "jsonwebtoken";

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
      password: hashPassword,
    },
  });

  const result = await prisma.user.findUnique({
    where: { id: createUser.id },
    omit: { password: true },
  });

  return result;
};

const loginUserFromDB = async (payload: ILoginPayload) => {
  const { email, password } = payload;

  const user = await prisma.user.findUniqueOrThrow({
    where: { email },
  });

  const isPasswordMatched = await bcrypt.compare(password, user.password);

  if (!isPasswordMatched) {
    throw new Error("Password is invalid");
  }

  const jwtPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const accessToken = jwtUtils.createToken(
    jwtPayload,
    config.jwt_access_secret,
    config.jwt_access_expires_in as SignOptions,
  );

  const refreshToken = jwtUtils.createToken(
    jwtPayload,
    config.jwt_refresh_secret,
    config.jwt_refresh_expires_in as SignOptions,
  );

  return {
    accessToken,
    refreshToken,
  };
};

const getMyDetailsFromDB = async (id: number) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: {id},
    omit: { password: true }
  });

  return user;
};

export const authService = {
  registerUserIntoDB,
  getMyDetailsFromDB,
  loginUserFromDB,
};
