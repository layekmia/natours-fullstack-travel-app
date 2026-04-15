import Logo from "@/components/common/Logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/context/AuthContext";
import {
  Calendar,
  Compass,
  Home,
  LogOut,
  Menu,
  Settings,
  Star,
  User
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToggleTheme } from "../common/ThemeToggle";

export const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/");
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "Tours", href: "/tours", icon: Compass },
  ];

  const authenticatedLinks = [
    { name: "My Bookings", href: "/my-bookings", icon: Calendar },
    { name: "My Reviews", href: "/my-reviews", icon: Star },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <Logo />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="text-sm font-medium text-gray-700 transition-colors hover:text-primary-600"
            >
              {link.name}
            </Link>
          ))}

          {isAuthenticated &&
            authenticatedLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-sm font-medium text-gray-700 transition-colors hover:text-primary-600"
              >
                {link.name}
              </Link>
            ))}
        </div>

        <ToggleTheme/>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex md:items-center md:space-x-4">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.photo} alt={user?.name} />
                    <AvatarFallback className="bg-primary-100 text-primary-700">
                      {user?.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user?.name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/settings")}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/auth/login")}
              >
                Log in
              </Button>
              <Button size="sm" onClick={() => navigate("/auth/signup")}>
                Sign up
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="w-[300px] sm:w-[400px] p-6">
            <div className="flex flex-col h-full">
              {/* Logo */}
              <div className="mb-6">
                <Logo />
              </div>

              {/* Navigation */}
              <div className="flex flex-col gap-4 flex-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="flex items-center gap-2 text-base font-medium text-gray-700 hover:text-primary-600"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <link.icon className="h-4 w-4" />
                    <span>{link.name}</span>
                  </Link>
                ))}

                {isAuthenticated &&
                  authenticatedLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.href}
                      className="flex items-center gap-2 text-base font-medium text-gray-700 hover:text-primary-600"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <link.icon className="h-4 w-4" />
                      <span>{link.name}</span>
                    </Link>
                  ))}
              </div>

              {/* Bottom Section */}
              <div className="mt-auto pt-6 border-t">
                {isAuthenticated ? (
                  <>
                    <div className="flex items-center gap-3 mb-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user?.photo} />
                        <AvatarFallback>
                          {user?.name?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{user?.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {user?.email}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <Button
                        variant="ghost"
                        className="justify-start"
                        onClick={() => {
                          navigate("/profile");
                          setMobileMenuOpen(false);
                        }}
                      >
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Button>

                      <Button
                        variant="ghost"
                        className="justify-start text-red-600 hover:bg-red-50"
                        onClick={handleLogout}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Log out
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Button
                      onClick={() => navigate("/login")}
                      variant="outline"
                    >
                      Log in
                    </Button>

                    <Button onClick={() => navigate("/signup")}>Sign up</Button>
                  </div>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};
