export type Role = "Owner" | "Worker" | "Reviewer";

export interface RegisterOwnerRequest {
    companyName: string;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
};

export interface LoginRequest {
    username: string;
    password: string;
};

export interface AuthUser {
    fullName: string;
    roles: Role[];
}

export interface AuthResponse {
    accessToken: string;
    user: AuthUser;
};
