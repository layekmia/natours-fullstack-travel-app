import {
  Calendar,
  LayoutDashboard,
  LogOut,
  MapPin,
  Star,
  Users,
} from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import Logo from "../common/Logo";

const adminLinks = [
  { to: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/admin/tours", icon: MapPin, label: "Manage Tours" },
  { to: "/admin/users", icon: Users, label: "Manage Users" },
  { to: "/admin/bookings", icon: Calendar, label: "All Bookings" },
  { to: "/admin/reviews", icon: Star, label: "All Reviews" },
];

export const AdminLayout = () => {
  const { user, logout } = useAuth();

  if (user?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-gray-600">
            You don't have permission to access this page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 h-screen bg-white border-r sticky top-0 bottom-0">
          <div className="p-6">
            <Logo />
            <p className="text-muted-foreground mt-1">Manage your Platform! </p>
          </div>

          <nav className="mt-6">
            {adminLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/admin"}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary-50 text-primary-600 border-r-2 border-primary-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                  )
                }
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="absolute bottom-0 w-64 p-4 border-t">
            <Button
              variant="ghost"
              className="w-full justify-start text-red-600"
              onClick={logout}
            >
              <LogOut className="h-4 w-4 mr-3" />
              Logout
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-y-au">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
