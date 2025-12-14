import FeaturesGrid from '@/components/FeaturesGrid';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import HowItWorks from '@/components/HowItWorks';
import Navbar from '@/components/ui/Navbar';
import WhySolana from '@/components/WhySolana';

function Home() {
    return (
        <div>
            <Navbar />
            <HeroSection />
            <FeaturesGrid />
            <HowItWorks />
            <WhySolana />
            <Footer />
        </div>
    );
}

export default Home;