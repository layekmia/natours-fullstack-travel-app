import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { useAuth } from "@/context/AuthContext";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

import { Camera, Loader2, Mail, User } from "lucide-react";

// Validation
const profileSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name too long"),
  email: z.string().email("Please enter a valid email address"),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export function ProfileForm() {
  const { user, updateUser } = useAuth();
  const [isUploading, setIsUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(
    user?.photo || null,
  );

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
    },
  });

  const { isSubmitting } = form.formState;

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB");
      return;
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    setIsUploading(true);

    // Preview
    const reader = new FileReader();
    reader.onloadend = () => setPreviewImage(reader.result as string);
    reader.readAsDataURL(file);

    const formData = new FormData();
    formData.append("photo", file);

    const result = await updateUser(formData);

    if (!result.success) {
      setPreviewImage(user?.photo || null);
      toast.error(result.error || "Failed to update photo");
    } else {
      toast.success("Profile photo updated successfully");
    }

    setIsUploading(false);
  };

  const onSubmit = async (data: ProfileFormData) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);

    const result = await updateUser(formData);

    if (result.success) {
      toast.success("Profile updated successfully");
    } else {
      toast.error(result.error || "Update failed");
    }
  };

  return (
    <Card className="w-full border-0  shadow-sm bg-white dark:bg-gray-900">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2 mb-1">
          <div className="p-1.5 rounded-lg bg-primary-100 dark:bg-primary-900/50">
            <User className="h-4 w-4 text-primary-600 dark:text-primary-400" />
          </div>
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
            Profile Settings
          </CardTitle>
        </div>
        <CardDescription className="text-gray-500 dark:text-gray-400">
          Update your personal information and profile photo
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6 pt-4">
        {/* Avatar Upload Section */}
        <div className="flex flex-col items-center gap-4 pb-2 border-b border-gray-100 dark:border-gray-800">
          <div className="relative group">
            <Avatar className="h-24 w-24 ring-4 ring-gray-100 dark:ring-gray-800 transition-all group-hover:ring-primary-200 dark:group-hover:ring-primary-800">
              <AvatarImage src={previewImage || undefined} alt={user?.name} />
              <AvatarFallback className="bg-gradient-to-br from-primary-500 to-primary-700 text-white text-2xl font-bold">
                {user?.name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <label className="absolute bottom-0 right-0 p-1.5 bg-primary-600 hover:bg-primary-700 rounded-full cursor-pointer transition-all shadow-lg group-hover:scale-110">
              {isUploading ? (
                <Loader2 className="h-3.5 w-3.5 text-white animate-spin" />
              ) : (
                <Camera className="h-3.5 w-3.5 text-white" />
              )}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
                disabled={isUploading}
              />
            </label>
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {user?.name}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Click the camera icon to change your photo
            </p>
          </div>
        </div>

        {/* Form */}
        <form
          id="profile-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5"
        >
          <FieldGroup className="space-y-4">
            {/* NAME FIELD */}
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="name"
                    className="flex items-center gap-2"
                  >
                    <User className="h-3.5 w-3.5 text-gray-500" />
                    Full Name
                  </FieldLabel>
                  <Input
                    id="name"
                    {...field}
                    placeholder="John Doe"
                    aria-invalid={fieldState.invalid}
                    className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:bg-white dark:focus:bg-gray-900 transition-colors"
                    disabled={isSubmitting}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* EMAIL FIELD */}
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="email"
                    className="flex items-center gap-2"
                  >
                    <Mail className="h-3.5 w-3.5 text-gray-500" />
                    Email Address
                  </FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    {...field}
                    placeholder="you@example.com"
                    aria-invalid={fieldState.invalid}
                    className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:bg-white dark:focus:bg-gray-900 transition-colors"
                    disabled={isSubmitting}
                  />
                  <FieldDescription className="text-xs">
                    We'll never share your email with anyone else.
                  </FieldDescription>
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
          form="profile-form"
          disabled={isSubmitting}
          className="bg-primary-600 hover:bg-primary-700 text-white px-6"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
