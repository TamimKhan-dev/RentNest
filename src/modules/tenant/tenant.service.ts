import { prisma } from "../../lib/prisma";
import { ITenantProfilePayload } from "./tenant.interface";

const updateTenantProfileIntoDB = async (
  payload: ITenantProfilePayload,
  tenantId: number,
) => {
  const { name, email } = payload;

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser && existingUser.id !== tenantId) {
    throw new Error("This email is already in use.");
  }

  const finalTenantProfile = await prisma.user.update({
    where: { id: tenantId },
    data: {
      name,
      email,
    },
    omit: { password: true },
  });

  return finalTenantProfile;
};

export const tenantService = {
  updateTenantProfileIntoDB,
};
