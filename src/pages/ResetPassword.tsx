import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { authAPI } from "@/api/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Field, FieldLabel, FieldError } from "@/components/ui/field";

import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";

import { CheckCircle2, AlertCircle, ArrowLeft } from "lucide-react";
import Logo from "@/components/common/Logo";

// ------------------ Schema ------------------
const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

// ------------------ Component ------------------
export function ResetPassword() {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!token) {
      setStatus("error");
      setMessage("Invalid reset token");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      await authAPI.resetPassword(token, data.password, data.confirmPassword);

      setStatus("success");
      setMessage("Password reset successfully! Redirecting...");

      setTimeout(() => navigate("/auth/login"), 3000);
    } catch (error: any) {
      setStatus("error");
      setMessage(
        error.response?.data?.message ||
          "Failed to reset password. Please try again.",
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <Card className="w-full max-w-md shadow-md">
        <CardHeader className="text-center space-y-3">
          <div className="flex justify-center">
            <Logo />
          </div>
          <CardTitle className="text-2xl">Reset Password</CardTitle>
          <CardDescription>Enter your new password below</CardDescription>
        </CardHeader>

        <CardContent>
          {/* SUCCESS */}
          {status === "success" && (
            <Alert className="mb-6 bg-green-50 border-green-200">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-600">
                {message}
              </AlertDescription>
            </Alert>
          )}

          {/* ERROR */}
          {status === "error" && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          )}

          {/* FORM */}
          {status !== "success" && (
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              {/* PASSWORD */}
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>New Password</FieldLabel>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      {...field}
                      disabled={status === "loading"}
                    />
                    {fieldState.error && (
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
                    <FieldLabel>Confirm Password</FieldLabel>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      {...field}
                      disabled={status === "loading"}
                    />
                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* SUBMIT */}
              <Button
                type="submit"
                className="w-full"
                disabled={status === "loading"}
              >
                {status === "loading" ? "Resetting..." : "Reset Password"}
              </Button>

              {/* BACK */}
              <div className="text-center">
                <Link
                  to="/login"
                  className="text-sm text-primary hover:underline inline-flex items-center gap-1"
                >
                  <ArrowLeft className="h-3 w-3" />
                  Back to Login
                </Link>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
