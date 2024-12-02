"use client"; 
import NavBar from "@/components/NavBar";
import Footer1 from "@/components/Footer1";
import { usePathname } from "next/navigation";

export default function Layout({ children }) {
  const pathname = usePathname();

  const noLayoutRoutes = ["/signin","/signup"];
  const isNoLayout = noLayoutRoutes.includes(pathname);
  return (
    <div>
        {!isNoLayout && <NavBar />}
          <main>{children}</main>
          {!isNoLayout && <Footer1 />}
          
    </div>
  );
}