

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

import { Camera } from "lucide-react";

// Validation
const profileSchema = z.object({
  name: z.string().min(3).max(50),
  email: z.string().email(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export function ProfileForm() {
  const { user, updateUser } = useAuth();

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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setPreviewImage(reader.result as string);
    reader.readAsDataURL(file);

    const formData = new FormData();
    formData.append("photo", file);

    const result = await updateUser(formData);
    console.log(result);

    if (!result.success) {
      setPreviewImage(user?.photo || null);
      toast.error(result.error || "Failed to update photo");
    } else {
      toast.success("Profile photo updated");
    }
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
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Profile Settings</CardTitle>
        <CardDescription>
          Update your personal information and photo
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Avatar Upload */}
        <div className="flex flex-col items-center gap-3">
          <div className="relative">
            <Avatar className="h-24 w-24">
              <AvatarImage src={previewImage || undefined} />
              <AvatarFallback>
                {user?.name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <label className="absolute bottom-0 right-0 p-1 bg-primary rounded-full cursor-pointer">
              <Camera className="h-4 w-4 text-white" />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          </div>
        </div>

        {/* Form */}
        <form
          id="profile-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <FieldGroup>
            {/* NAME */}
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="name">Full Name</FieldLabel>
                  <Input
                    id="name"
                    {...field}
                    placeholder="John Doe"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* EMAIL */}
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    {...field}
                    placeholder="you@example.com"
                    aria-invalid={fieldState.invalid}
                  />
                  <FieldDescription>
                    We’ll never share your email.
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

      <CardFooter className="flex justify-end">
        <Button type="submit" form="profile-form">
          Save Changes
        </Button>
      </CardFooter>
    </Card>
  );
}
