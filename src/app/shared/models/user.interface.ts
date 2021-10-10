export type Roles = 'SUSCRIPTOR' | 'ADMIN';

export interface User {
    username: string;
    password: string;
}

export interface UserResponse {
    messagge: string;
    token: string;
    userId: number;
    role: Roles;
}