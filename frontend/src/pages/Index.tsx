import Layout from "@/components/Layout";
import HeroSlider from "@/components/home/HeroSlider";
import ServicesOverview from "@/components/home/ServicesOverview";
import ProductCategories from "@/components/home/ProductCategories";
import GallerySlider from "@/components/home/GallerySlider";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import AboutAcumen from "@/components/home/AboutAcumen";
import StatsSection from "@/components/home/StatsSection";
import Testimonials from "@/components/home/Testimonials";
import CTABanner from "@/components/home/CTABanner";
import ContactPreview from "@/components/home/ContactPreview";
import AppointmentSection from "@/components/home/AppointmentSection";
import CCTVGuide from "@/components/home/CCTVGuide";

const Index = () => (
  <Layout>
    <HeroSlider />
    <ServicesOverview />
    <ProductCategories />
    <CCTVGuide />
    <GallerySlider />
    <WhyChooseUs />
    <AboutAcumen />
    <Testimonials />
    <CTABanner />
    <AppointmentSection />
    <StatsSection />
    <ContactPreview />
  </Layout>
);

export default Index;
