import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProfileForm } from "@/components/profile/ProfileForm";
import { ChangePasswordForm } from "@/components/profile/ChangePasswordForm";
import { DeleteAccount } from "@/components/profile/DeleteAccount";
import { User, Key, Trash2 } from "lucide-react";

export const Profile = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            My Profile
          </h1>
          <p className="text-gray-600">
            Manage your account settings and preferences
          </p>
        </div>

        {/* Tabs */}
        <Card>
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
            <CardDescription>
              Update your personal information and security settings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="profile" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="profile" className="gap-2">
                  <User className="h-4 w-4" />
                  Profile
                </TabsTrigger>
                <TabsTrigger value="password" className="gap-2">
                  <Key className="h-4 w-4" />
                  Password
                </TabsTrigger>
                <TabsTrigger value="danger" className="gap-2">
                  <Trash2 className="h-4 w-4" />
                  Danger
                </TabsTrigger>
              </TabsList>

              <TabsContent value="profile">
                <ProfileForm />
              </TabsContent>

              <TabsContent value="password">
                <ChangePasswordForm />
              </TabsContent>

              <TabsContent value="danger">
                <DeleteAccount />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
