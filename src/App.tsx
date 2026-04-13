import { Outlet } from "react-router-dom";
import Footer from "./components/common/Footer";
import Header from "./components/common/Header";
import { useAuth } from "./context/AuthContext";

export default function App() {
  const { isLoading } = useAuth();

  if (isLoading) return <p>Loading....</p>;

  return (
    <>
      <div className="relative">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}
