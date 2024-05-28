import { Role } from "./authTypes";

export interface RegisterNonOwnerRequest {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    role: Role;
};

export interface UserResponse {
    id: string;
    firstName: string;
    lastName: string;
    roles: Role[];
}
