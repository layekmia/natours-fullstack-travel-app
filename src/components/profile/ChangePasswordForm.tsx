import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { authAPI } from "@/api/auth";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";

import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";

import {
  CheckCircle,
  AlertCircle,
  Key,
  Lock,
  Shield,
  Loader2,
} from "lucide-react";

/* ---------------- Schema ---------------- */
const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    password: z.string().min(8, "New password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type PasswordFormData = z.infer<typeof passwordSchema>;

/* ---------------- Component ---------------- */
export function ChangePasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const form = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: PasswordFormData) => {
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      await authAPI.updatePassword(data);
      setSuccess("Password changed successfully!");
      form.reset();
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to change password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full border-0 shadow-sm bg-white dark:bg-gray-900">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2 mb-1">
          <div className="p-1.5 rounded-lg bg-primary-100 dark:bg-primary-900/50">
            <Key className="h-4 w-4 text-primary-600 dark:text-primary-400" />
          </div>
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
            Change Password
          </CardTitle>
        </div>
        <CardDescription className="text-gray-500 dark:text-gray-400">
          Update your account password securely
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6 pt-4">
        {/* Success Message */}
        {success && (
          <Alert className="bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800 rounded-xl">
            <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
            <AlertDescription className="text-green-600 dark:text-green-400 text-sm">
              {success}
            </AlertDescription>
          </Alert>
        )}

        {/* Error Message */}
        {error && (
          <Alert variant="destructive" className="rounded-xl">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-sm">{error}</AlertDescription>
          </Alert>
        )}

        {/* Security Tip */}
        <div className="bg-blue-50 dark:bg-blue-950/30 rounded-xl p-3 border border-blue-100 dark:border-blue-800">
          <div className="flex items-start gap-2">
            <Shield className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5" />
            <div>
              <p className="text-xs font-medium text-blue-800 dark:text-blue-300">
                Password Requirements
              </p>
              <p className="text-xs text-blue-700 dark:text-blue-400 mt-0.5">
                Minimum 8 characters, including letters and numbers
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form
          id="password-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5"
        >
          <FieldGroup className="space-y-4">
            {/* CURRENT PASSWORD */}
            <Controller
              name="currentPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    <Lock className="h-3.5 w-3.5" />
                    Current Password
                  </FieldLabel>
                  <Input
                    type="password"
                    placeholder="Enter current password"
                    {...field}
                    disabled={isLoading}
                    className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:bg-white dark:focus:bg-gray-900 transition-colors"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* NEW PASSWORD */}
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    <Key className="h-3.5 w-3.5" />
                    New Password
                  </FieldLabel>
                  <Input
                    type="password"
                    placeholder="Enter new password"
                    {...field}
                    disabled={isLoading}
                    className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:bg-white dark:focus:bg-gray-900 transition-colors"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* CONFIRM PASSWORD */}
            <Controller
              name="confirmPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    <Shield className="h-3.5 w-3.5" />
                    Confirm Password
                  </FieldLabel>
                  <Input
                    type="password"
                    placeholder="Confirm new password"
                    {...field}
                    disabled={isLoading}
                    className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:bg-white dark:focus:bg-gray-900 transition-colors"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter className="border-t border-gray-100 dark:border-gray-800 pt-5 flex justify-end">
        <Button
          type="submit"
          form="password-form"
          disabled={isLoading}
          className="bg-primary-600 hover:bg-primary-700 text-white px-6"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Changing Password...
            </>
          ) : (
            "Change Password"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
