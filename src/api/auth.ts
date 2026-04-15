import { ApiResponse, LoginCredentials, SignUpData, UpdatePasswordData, User } from "@/types";
import apiClient from "./client";

export const authAPI = {
    signup: (data: SignUpData): Promise<ApiResponse<User>> =>
        apiClient.post('/users/signup', data),

    login: (data: LoginCredentials): Promise<ApiResponse<User>> =>
        apiClient.post('/users/login', data),
    logout: (): Promise<ApiResponse<null>> =>
        apiClient.get("/users/logout"),

    forgotPassword: (email: string): Promise<ApiResponse<{ message: string }>> =>
        apiClient.post("/users/forgotPassword", { email }),

    resetPassword: (token: string, password: string, confirmPassword: string): Promise<ApiResponse<{ token: string; data: User }>> =>
        apiClient.patch(`/users/resetPassword/${token}`, { password, confirmPassword }),

    updatePassword: (data: UpdatePasswordData): Promise<ApiResponse<User>> =>
        apiClient.patch('/users/updatePassword', data)
}