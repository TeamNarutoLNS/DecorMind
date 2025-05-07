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
      <section className="py-12 sm:py-16 px-4 md:px-10 bg-gradient-to-r from-[#f9f9f9] to-[#eaeaea]"> {/* Reduced base py */}
          <div className="max-w-7xl mx-auto">
              {/* Section Title */}
              <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12"> {/* Reduced base mb */}
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-decor-primary mb-3 sm:mb-4"> {/* Reduced base text size and mb */}
                      Revolutionize Your Interior Design Experience
                  </h2>
                  <p className="text-decor-secondary text-sm sm:text-lg"> {/* Reduced base text size */}
                      Our AI-powered platform offers comprehensive tools to make interior design accessible, affordable, and enjoyable.
                  </p>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8"> {/* Reduced base gap */}
                  {features.map((feature, index) => (
                      <div
                          key={index}
                          className="relative group bg-white/20 rounded-xl p-4 sm:p-6 backdrop-blur-lg shadow-md transition-transform duration-300 hover:scale-105 hover:bg-white/30" 
                      >
                          {/* Floating Glow Effect */}
                          <div className="absolute -inset-1 bg-gradient-to-r from-[#e4cda5] to-[#d4a373] opacity-30 rounded-xl blur-md"></div>

                          {/* Feature Icon */}
                          <div className="relative z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-md flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform"> {/* Reduced base w, h, mb */}
                              {feature.icon}
                          </div>

                          {/* Feature Title */}
                          <h3 className="text-lg font-semibold text-decor-primary mb-1 sm:mb-2 relative z-10"> {/* Reduced base mb */}
                              {feature.title}
                          </h3>

                          {/* Feature Description */}
                          <p className="text-xs sm:text-sm text-decor-secondary relative z-10"> {/* Reduced base text size */}
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