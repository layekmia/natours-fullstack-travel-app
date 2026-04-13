import { ApiResponse, ForgotPasswordData, LoginCredentials, ResetPasswordData, SignUpData, UpdatePasswordData, User } from "@/types";
import apiClient from "./client";

export const authAPI = {
    signup: (data: SignUpData): Promise<ApiResponse<User>> =>
        apiClient.post('/users/signup', data),

    login: (data: LoginCredentials): Promise<ApiResponse<User>> =>
        apiClient.post('/users/login', data),
    logout: (): Promise<ApiResponse<null>> =>
        apiClient.get("/users/logout"),

    forgotPassword: (data: ForgotPasswordData): Promise<ApiResponse<null>> =>
        apiClient.post('/users/forgotPassword', data),

    resetPassword: (data: ResetPasswordData): Promise<ApiResponse<User>> =>
        apiClient.post('/users/resetPassword', data),

    updatePassword: (data: UpdatePasswordData): Promise<ApiResponse<User>> =>
        apiClient.patch('/users/updatePassword', data)
}