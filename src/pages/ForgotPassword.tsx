

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "react-router-dom";

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

// ---------------- Schema ----------------
const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

// ---------------- Component ----------------
export function ForgotPassword() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setStatus("loading");
    setMessage("");

    try {
      await authAPI.forgotPassword(data.email);

      setStatus("success");
      setMessage("Password reset link sent to your email!");
      form.reset();
    } catch (error: any) {
      setStatus("error");
      setMessage(
        error.response?.data?.message ||
          "Something went wrong. Please try again.",
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
          <CardTitle className="text-2xl">Forgot Password?</CardTitle>
          <CardDescription>
            Enter your email and we’ll send a reset link
          </CardDescription>
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
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Email Address</FieldLabel>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      {...field}
                      disabled={status === "loading"}
                    />
                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Button
                type="submit"
                className="w-full"
                disabled={status === "loading"}
              >
                {status === "loading" ? "Sending..." : "Send Reset Link"}
              </Button>

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
