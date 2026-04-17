import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Compass,
  LayoutDashboard,
  LogOut,
  MapPin,
  Menu,
  Shield,
  Star,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Logo from "../common/Logo";
import { ThemeToggle } from "../common/ThemeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const adminLinks = [
  { to: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/admin/tours", icon: MapPin, label: "Manage Tours" },
  { to: "/admin/users", icon: Users, label: "Manage Users" },
  { to: "/admin/bookings", icon: Calendar, label: "All Bookings" },
  { to: "/admin/reviews", icon: Star, label: "All Reviews" },
];

export const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle responsive sidebar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  if (user?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
        <div className="text-center p-8">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
            <Shield className="h-10 w-10 text-red-600 dark:text-red-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Access Denied
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            You don't have permission to access this page.
          </p>
          <Button onClick={() => navigate("/")} className="mt-6">
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
      {/* Mobile Header */}
      <div className="lg:hidden sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between px-4 py-3">
          <Logo />
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 pt-8">
                <div className="h-full flex flex-col">
                  {/* Mobile Sidebar Content */}
                  <div className="flex-1 px-3 py-6 space-y-1">
                    {adminLinks.map((link) => (
                      <NavLink
                        key={link.to}
                        to={link.to}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={({ isActive }) =>
                          cn(
                            "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                            isActive
                              ? "bg-primary-50 dark:bg-primary-900/50 text-primary-700 dark:text-primary-400 shadow-sm"
                              : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800",
                          )
                        }
                      >
                        <link.icon className="h-4 w-4" />
                        <span>{link.label}</span>
                      </NavLink>
                    ))}
                  </div>

                  {/* Mobile Footer */}
                  <div className="p-4 border-t border-gray-100 dark:border-gray-800">
                    <div className="flex items-center gap-3 mb-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={user?.photo} alt={user?.name} />
                        <AvatarFallback className="bg-gradient-to-br from-primary-500 to-primary-700 text-white text-xs font-bold">
                          {user?.name?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {user?.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/30"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4 mr-3" />
                      Logout
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside
          className={cn(
            "hidden lg:block fixed left-0 top-0 h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all duration-300 z-40",
            isSidebarOpen ? "w-64" : "w-20",
          )}
        >
          {/* Desktop Sidebar Content */}
          <div className="flex flex-col h-full">
            {/* Logo Section */}
            <div className="p-6 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center justify-between">
                {isSidebarOpen ? (
                  <Logo />
                ) : (
                  <div>
                    <Compass className="h-5 w-5 text-primary-600 dark:text-primary-500" />
                  </div>
                )}
                {!isSidebarOpen ? (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsSidebarOpen(true)}
                    className="hidden lg:flex"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsSidebarOpen(false)}
                    className="hidden lg:flex"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                )}
              </div>
              {isSidebarOpen && (
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Admin Panel
                  </p>
                  <ThemeToggle />
                </div>
              )}
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-6 space-y-1">
              {adminLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                      isActive
                        ? "bg-primary-50 dark:bg-primary-900/50 text-primary-700 dark:text-primary-400 shadow-sm"
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800",
                      !isSidebarOpen && "justify-center",
                    )
                  }
                >
                  <link.icon className="h-4 w-4" />
                  {isSidebarOpen && <span>{link.label}</span>}
                </NavLink>
              ))}
            </nav>

            {/* Footer Section */}
            <div className="p-4 border-t border-gray-100 dark:border-gray-800 space-y-3">
              {isSidebarOpen && (
                <div className="flex items-center gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={user?.photo} alt={user?.name} />
                    <AvatarFallback className="bg-gradient-to-br from-primary-500 to-primary-700 text-white text-xs font-bold">
                      {user?.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {user?.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {user?.email}
                    </p>
                  </div>
                </div>
              )}

              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/30",
                  !isSidebarOpen && "justify-center",
                )}
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
                {isSidebarOpen && <span className="ml-3">Logout</span>}
              </Button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main
          className={cn(
            "flex-1 transition-all duration-300 overflow-hidden",
            "lg:ml-64",
            !isSidebarOpen && "lg:ml-20",
          )}
        >
          <div className="p-6 md:p-8 ">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
