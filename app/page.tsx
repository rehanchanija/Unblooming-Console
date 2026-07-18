import AnnouncementBar from "@/components/Navbar/AnnouncementBar";
import Navbar from "@/components/Navbar/Navbar";
import Hero from "@/components/Hero/Hero";
import Features from "@/components/Features/Features";
import ProductViewer from "@/components/ProductViewer/ProductViewer";
import Categories from "@/components/Categories/Categories";
import Performance from "@/components/Performance/Performance";
import Gallery from "@/components/Gallery/Gallery";
import Specifications from "@/components/Specifications/Specifications";
import Accessories from "@/components/Accessories/Accessories";
import Reviews from "@/components/Reviews/Reviews";
import Pricing from "@/components/Pricing/Pricing";
import FAQ from "@/components/FAQ/FAQ";
import Newsletter from "@/components/Newsletter/Newsletter";
import Footer from "@/components/Footer/Footer";
import ScrollProgress from "@/components/UI/ScrollProgress";

export default function Home() {
  return (
    <main className="relative">
      <ScrollProgress />
      <AnnouncementBar />
      <Navbar />
      <Hero />
      <Features />
      <ProductViewer />
      <Categories />
      <Performance />
      <Gallery />
      <Specifications />
      <Accessories />
      <Reviews />
      <Pricing />
      <FAQ />
      <Newsletter />
      <Footer />
    </main>
  );
}
