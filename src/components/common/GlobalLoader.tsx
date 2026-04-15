import { Compass } from "lucide-react";
import { useState, useEffect } from "react";

export const GlobalLoader = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 200);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 transition-opacity duration-500">
      <div className="flex flex-col items-center justify-center gap-6">
        {/* Logo Animation */}
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-primary-500/20 animate-ping" />
          <div className="absolute inset-0 rounded-full bg-primary-500/10 animate-pulse" />
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary-500 border-r-primary-500 animate-spin" />

          <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-2xl">
            <Compass className="w-12 h-12 md:w-16 md:h-16 text-white animate-pulse" />
          </div>
        </div>

        {/* Brand */}
        <div className="text-center">
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 dark:from-primary-400 dark:to-primary-600 bg-clip-text text-transparent">
            Natours
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Adventure Awaits
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-48 h-1 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden mt-4">
          <div className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full animate-progress" />
        </div>

        <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
          Preparing your adventure...
        </p>
      </div>
    </div>
  );
};
