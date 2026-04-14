import { Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { Navbar } from "./components/layouts/Navbar";
import Footer from "./components/layouts/Footer";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  const { isLoading } = useAuth();

  if (isLoading) return <p>Loading....</p>;

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
