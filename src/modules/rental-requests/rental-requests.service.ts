import { prisma } from "../../lib/prisma";


const createRentelRequestIntoDB = async (
  userId: number,
  propertyId: number,
) => {
    const property = await prisma.property.findUnique({
        where: { id: propertyId }
    });

    if (!property) {
        throw new Error("Property with this ID doesn't Exist!");
    };

    if (!property.isAvailable) {
        throw new Error("Property isn't available at this moment");
    };

    const result = await prisma.rentalRequest.create({
        data: {
            tenantId: userId,
            propertyId: propertyId
        }
    });

    return result;
};

export const rentalRequestService = {
  createRentelRequestIntoDB,
};
