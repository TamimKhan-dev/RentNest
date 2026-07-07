import { UserRole } from "../../../generated/prisma/enums";


export interface IUserPayload {
    id: number;
    email: string;
    name: string;
    password: string;
    isBanned: boolean;
    role: UserRole;
}

export interface ILoginPayload {
    email: string;
    password: string;
};