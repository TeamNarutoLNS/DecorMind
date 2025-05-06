import { 
  PencilRuler, 
  Sparkles, 
  Palette, 
  CreditCard, 
  LayoutGrid, 
  Image as ImageIcon
} from "lucide-react";

const features = [
  { icon: <Sparkles className="h-6 w-6 text-decor-accent" />, title: "AI-Powered Design", description: "Advanced AI algorithms generate stunning designs tailored to you." },
  { icon: <Palette className="h-6 w-6 text-decor-accent" />, title: "Smart Color Schemes", description: "Personalized color palettes based on style and furniture." },
  { icon: <PencilRuler className="h-6 w-6 text-decor-accent" />, title: "Custom Layouts", description: "Optimized layouts for aesthetics and functionality." },
  { icon: <CreditCard className="h-6 w-6 text-decor-accent" />, title: "Budget Management", description: "AI-suggested items that fit within your budget." },
  { icon: <LayoutGrid className="h-6 w-6 text-decor-accent" />, title: "Amazon Integration", description: "Browse and include Amazon products with real-time pricing." },
  { icon: <ImageIcon className="h-6 w-6 text-decor-accent" />, title: "Realistic Renders", description: "View high-quality, realistic renderings before purchasing." }
];

const FeaturesSection = () => {
  return (
    <section className="py-16 px-4 md:px-10 bg-gradient-to-r from-[#f9f9f9] to-[#eaeaea]">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-decor-primary mb-4">
            Revolutionize Your Interior Design Experience
          </h2>
          <p className="text-decor-secondary text-base sm:text-lg">
            Our AI-powered platform offers comprehensive tools to make interior design accessible, affordable, and enjoyable.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="relative group bg-white/20 rounded-xl p-6 backdrop-blur-lg shadow-md transition-transform duration-300 hover:scale-105 hover:bg-white/30"
            >
              {/* Floating Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#e4cda5] to-[#d4a373] opacity-30 rounded-xl blur-md"></div>

              {/* Feature Icon */}
              <div className="relative z-10 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white shadow-md flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>

              {/* Feature Title */}
              <h3 className="text-lg sm:text-xl font-semibold text-decor-primary mb-2 relative z-10">
                {feature.title}
              </h3>

              {/* Feature Description */}
              <p className="text-sm sm:text-base text-decor-secondary relative z-10">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
