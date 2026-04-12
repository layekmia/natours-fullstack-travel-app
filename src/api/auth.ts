import { ApiResponse, ForgotPasswordData, LoginCredentials, ResetPasswordData, SignUpData, User } from "@/types";
import apiClient from "./client";

export const authAPI = {
    signup: (data: SignUpData): Promise<ApiResponse<{ data: User }>> => apiClient.post('/users/signup', data),

    login: (data: LoginCredentials): Promise<ApiResponse<{ data: User }>> => apiClient.post('/users/login', data),

    forgotPassword: (data: ForgotPasswordData): Promise<ApiResponse<null>> => apiClient.post('/users/forgotPassword', data),

    resetPassword: (data: ResetPasswordData): Promise<ApiResponse<{ data: User }>> => apiClient.post('/users/resetPassword', data),

    updatePassword: (data: ResetPasswordData): Promise<ApiResponse<{ data: User }>> => apiClient.patch('/users/updatePassword', data)
}