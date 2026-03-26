import { useEffect, useState } from "react";
import { GiOyster } from "react-icons/gi";
import Dashboard from "./pages/Dashboard";
import { Routes, Route, useLocation } from "react-router";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "./components/ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";
import { links } from "./components/app-sidebar";
import Header from "./components/Header";
import Orders from "./pages/Orders";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import OrderDetail from "./pages/OrderDetail";
import Inventory from "./pages/Inventory";
import Suppliers from "./pages/Suppliers";
import CMSWebsite from "./pages/CMSWebsite";
import Users from "./pages/Users";
import Reviews from "./pages/Reviews";
import Settings from "./pages/Settings";

function Preloader() {
  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      {/* Icon */}
      <div className="relative flex items-center justify-center mb-6">
        {/* Ripple rings */}
        <span
          className="absolute w-24 h-24 rounded-full"
          style={{
            border: "2px solid rgba(28,167,166,0.25)",
            animation: "ripple 1.8s ease-out infinite",
          }}
        />
        <span
          className="absolute w-16 h-16 rounded-full"
          style={{
            border: "2px solid rgba(28,167,166,0.4)",
            animation: "ripple 1.8s ease-out infinite 0.4s",
          }}
        />
        {/* Icon badge */}
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg relative z-10"
          style={{
            background: "#f0fafa",
            border: "2px solid #1ca7a6",
          }}
        >
          <GiOyster size={30} style={{ color: "#1ca7a6" }} />
        </div>
      </div>

      {/* Brand name */}
      <p className="salsify text-[32px] text-gray-800 tracking-wide leading-none mb-1">
        SeaFresh
      </p>
      <p
        className="text-[11px] tracking-[0.3em] uppercase font-semibold mb-8"
        style={{ color: "#1ca7a6" }}
      >
        Premium Seafood
      </p>

      {/* Progress bar */}
      <div
        className="w-48 h-1 rounded-full overflow-hidden"
        style={{ background: "#e8f5f5" }}
      >
        <div
          className="h-full rounded-full"
          style={{
            background: "#1ca7a6",
            animation: "loadbar 1.8s ease-in-out forwards",
          }}
        />
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes ripple {
          0%   { transform: scale(0.8); opacity: 1; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        @keyframes loadbar {
          0%   { width: 0%; }
          60%  { width: 75%; }
          100% { width: 100%; }
        }
        @keyframes fadeOut {
          0%   { opacity: 1; }
          100% { opacity: 0; pointer-events: none; }
        }
      `}</style>
    </div>
  );
}

function App() {
  const { pathname } = useLocation();
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Wait for full page load, then fade out
    const finish = () => {
      setFadeOut(true);
      setTimeout(() => setLoading(false), 500);
    };

    if (document.readyState === "complete") {
      // Already loaded — still show briefly for polish
      const t = setTimeout(finish, 1200);
      return () => clearTimeout(t);
    } else {
      window.addEventListener("load", finish, { once: true });
      // Safety net: hide after 4s regardless
      const fallback = setTimeout(finish, 4000);
      return () => {
        window.removeEventListener("load", finish);
        clearTimeout(fallback);
      };
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const currentPage = links.find((link) => link.url === pathname);

  return (
    <>
      {loading && (
        <div
          style={{
            transition: "opacity 0.5s ease",
            opacity: fadeOut ? 0 : 1,
            pointerEvents: fadeOut ? "none" : "auto",
          }}
        >
          <Preloader />
        </div>
      )}

      <main className="w-full"></main>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="flex-1 ">
         <Header/>
          <div className="p-3 md:p-5 max-w-full overflow-x-hidden">
            {/* <p className="block md:hidden text-[20px] font-[500] mb-1">{currentPage.pageTitle}</p> */}
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/order/:id" element={<OrderDetail/>} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/suppliers" element={<Suppliers />} />
              <Route path="/cms" element={<CMSWebsite />} />
              <Route path="/users" element={<Users />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}

export default App;
