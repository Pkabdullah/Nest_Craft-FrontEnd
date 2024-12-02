import Image from "next/image";
import MainBanner from "@/components/Banners/MainBanner";
import Collections from "@/components/Collections";
import Promotion from "@/components/Promotion";
import TopCategories from "@/components/TopCategories";
import Testonomials from "@/components/Testonomials";
import AboutUs from "@/components/AboutUs";
import FAQs from "@/components/FAQs";
import BottomNavi from "@/components/ui/BottomNavi";
export default function Home() {
  return (
    <div className="bg-[#FFF5EE]">
      <MainBanner />
      <Collections />
      <Promotion />
      <TopCategories />
      <Testonomials />
      <AboutUs />
      <FAQs />
      <div className="sm:hidden">
        <BottomNavi/>
      </div>
    </div>
  );
}
