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
import { User, Key, Trash2, Shield, Sparkles } from "lucide-react";

export const Profile = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 text-sm font-medium mb-4">
            <Shield className="h-3 w-3" />
            <span>Account Management</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent mb-3">
            My Profile
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your account settings and preferences
          </p>
        </div>

        {/* Main Card */}
        <Card className="border-0 shadow-xl overflow-hidden bg-white dark:bg-gray-900">
          <div className="relative">
            {/* Decorative Header Bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700" />

            <CardHeader className="pb-4 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-primary-100 dark:bg-primary-900/50">
                  <Sparkles className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                    Account Settings
                  </CardTitle>
                  <CardDescription className="text-gray-500 dark:text-gray-400 mt-0.5">
                    Update your personal information and security settings
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6 md:p-8">
              <Tabs defaultValue="profile" className="space-y-8">
                <TabsList className="grid w-full grid-cols-3 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
                  <TabsTrigger
                    value="profile"
                    className="gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-950 data-[state=active]:shadow-sm rounded-lg transition-all"
                  >
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline">Profile</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="password"
                    className="gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-950 data-[state=active]:shadow-sm rounded-lg transition-all"
                  >
                    <Key className="h-4 w-4" />
                    <span className="hidden sm:inline">Password</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="danger"
                    className="gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-950 data-[state=active]:shadow-sm rounded-lg transition-all"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="hidden sm:inline">Danger</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="profile" className="mt-0 animate-fade-in">
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6">
                    <ProfileForm />
                  </div>
                </TabsContent>

                <TabsContent value="password" className="mt-0 animate-fade-in">
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6">
                    <ChangePasswordForm />
                  </div>
                </TabsContent>

                <TabsContent value="danger" className="mt-0 animate-fade-in">
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6">
                    <DeleteAccount />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </div>
        </Card>

        {/* Security Notice */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-500 flex items-center justify-center gap-1">
            <Shield className="h-3 w-3" />
            Your account is protected with industry-standard security
          </p>
        </div>
      </div>
    </div>
  );
};
