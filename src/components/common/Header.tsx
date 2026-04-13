import { useAuth } from "@/context/AuthContext";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import logo from "@/assets/logo-green.png";

export default function Header() {
  const { logout } = useAuth();

  return (
    <div className="m-10">
      <Link to="/" className="flex items-center">
        <img className="h-8 w-auto" src={logo} alt="Natours" />
      </Link>
      Header
      <Button onClick={logout}>Logout</Button>
    </div>
  );
}
