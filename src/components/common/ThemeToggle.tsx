

import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/theme-provider";

export function ToggleTheme() {
  const { theme, setTheme } = useTheme();

  const isDark = theme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="relative"
    >
      {/* Sun */}
      <Sun className="h-[1.2rem] w-[1.2rem] transition-all dark:scale-0 dark:-rotate-90" />

      {/* Moon */}
      <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />

      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}