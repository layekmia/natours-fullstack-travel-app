import { Compass } from "lucide-react";

interface LoaderProps {
  size?: "sm" | "md" | "lg";
  text?: string;
  fullScreen?: boolean;
}

interface LoaderContentProps {
  size: "sm" | "md" | "lg";
  text: string;
}

const LoaderContent = ({ size, text }: LoaderContentProps) => {
  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-16 h-16",
    lg: "w-24 h-24",
  };

  const iconSizes = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-primary-500/20 animate-ping" />
        <div className="absolute inset-0 rounded-full bg-primary-500/10 animate-pulse" />
        <div
          className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-2xl`}
        >
          <Compass
            className={`${iconSizes[size]} text-white animate-spin-slow`}
          />
        </div>
      </div>
      {text && (
        <p className="text-gray-600 dark:text-gray-400 text-sm font-medium animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
};

export const Loader = ({
  size = "md",
  text = "Loading...",
  fullScreen = false,
}: LoaderProps) => {
  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/95 dark:bg-gray-950/95 backdrop-blur-sm">
        <LoaderContent size={size} text={text} />
      </div>
    );
  }

  return <LoaderContent size={size} text={text} />;
};
