import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { usersAPI } from "@/api/users";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Trash2, AlertCircle, Shield, Loader2 } from "lucide-react";

export const DeleteAccount = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDeleteAccount = async () => {
    setIsLoading(true);
    setError("");

    try {
      await usersAPI.deleteMe();
      await logout();
      navigate("/");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to delete account");
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      {/* Warning Card */}
      <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/30 dark:to-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-5">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/50 flex items-center justify-center">
              <Trash2 className="h-5 w-5 text-red-600 dark:text-red-400" />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-red-800 dark:text-red-300 text-lg">
              Delete Account
            </h3>
            <p className="text-sm text-red-700 dark:text-red-400 mt-1 leading-relaxed">
              Once you delete your account, there is no going back. This action is permanent and irreversible.
            </p>
            <div className="mt-3 flex items-center gap-2 text-xs text-red-600 dark:text-red-400">
              <Shield className="h-3 w-3" />
              <span>All your data will be permanently removed</span>
            </div>
          </div>
        </div>
      </div>

      {/* Consequences List */}
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-red-500" />
          What will be deleted:
        </h4>
        <ul className="space-y-1.5 text-sm text-gray-600 dark:text-gray-400">
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
            Your personal information and profile
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
            All your tour bookings and history
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
            All your reviews and ratings
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
            Any saved preferences and settings
          </li>
        </ul>
      </div>

      {/* Error Message */}
      {error && (
        <Alert variant="destructive" className="rounded-xl border-red-200 dark:border-red-800">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-sm">{error}</AlertDescription>
        </Alert>
      )}

      {/* Delete Button */}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button 
            variant="destructive" 
            className="w-full bg-red-600 hover:bg-red-700 text-white shadow-md hover:shadow-lg transition-all duration-300 gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Delete My Account
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="rounded-2xl border-red-200 dark:border-red-800">
          <AlertDialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/50 flex items-center justify-center">
                <Trash2 className="h-5 w-5 text-red-600 dark:text-red-400" />
              </div>
              <AlertDialogTitle className="text-xl font-bold text-gray-900 dark:text-white">
                Are you absolutely sure?
              </AlertDialogTitle>
            </div>
            <AlertDialogDescription className="text-gray-600 dark:text-gray-400">
              This action cannot be undone. This will permanently delete your
              account and remove all your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="bg-red-50 dark:bg-red-950/30 rounded-lg p-3 my-2">
            <p className="text-xs text-red-700 dark:text-red-400 text-center">
              ⚠️ This action is irreversible. Please make sure you want to continue.
            </p>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteAccount}
              disabled={isLoading}
              className="bg-red-600 hover:bg-red-700 rounded-xl gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="h-4 w-4" />
                  Yes, delete my account
                </>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Help Text */}
      <p className="text-xs text-center text-gray-500 dark:text-gray-500 mt-2">
        Need help? Contact our support team before deleting your account
      </p>
    </div>
  );
};