import { Compass } from "lucide-react";
import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to="/" className="flex items-center space-x-2">
      <Compass className="h-8 w-8 text-primary-600 dark:text-primary-500" />
      <span className="text-xl font-bold text-gray-900 dark:text-white">
        Natours
      </span>
    </Link>
  );
}
