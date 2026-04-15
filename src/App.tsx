import { Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { Navbar } from "./components/layouts/Navbar";
import Footer from "./components/layouts/Footer";
import { Toaster } from "./components/ui/sonner";
import { GlobalLoader } from "./components/common/GlobalLoader";

export default function App() {
  const { isLoading } = useAuth();

  if (isLoading) return <GlobalLoader/>;

  return (
    <>
      <div className="relative">
        <Navbar />
        <main className="min-h-screen">
          <Outlet />
        </main>
        <Footer />
        <Toaster/>
      </div>
    </>
  );
}
