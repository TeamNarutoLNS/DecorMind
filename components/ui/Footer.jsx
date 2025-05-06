import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-decor-light pt-12 pb-6">
      <div className="content-container px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="space-y-4 text-center sm:text-left">
            <a href="/" className="inline-block">
              <h2 className="text-2xl font-bold text-decor-primary font-serif tracking-tight">
                Decor<span className="text-decor-accent">Mind</span>
              </h2>
            </a>
            <p className="text-decor-secondary text-sm leading-relaxed">
              AI-powered interior design platform to create beautiful spaces tailored to your style and budget.
            </p>
            {/* Social Icons */}
            <div className="flex justify-center sm:justify-start space-x-4">
              <a href="#" className="text-decor-secondary hover:text-decor-accent transition">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-decor-secondary hover:text-decor-accent transition">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-decor-secondary hover:text-decor-accent transition">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h3 className="font-semibold text-decor-primary mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-sm hover:text-decor-accent transition">Home</a></li>
              <li><a href="/About" className="text-sm hover:text-decor-accent transition">About</a></li>
              <li><a href="/Contact" className="text-sm hover:text-decor-accent transition">Contact</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="text-center sm:text-left">
            <h3 className="font-semibold text-decor-primary mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="/terms" className="text-sm hover:text-decor-accent transition">Terms & Conditions</a></li>
              <li><a href="/privacy" className="text-sm hover:text-decor-accent transition">Privacy Policy</a></li>
              <li><a href="/cookies" className="text-sm hover:text-decor-accent transition">Cookie Policy</a></li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="text-center sm:text-left">
            <h3 className="font-semibold text-decor-primary mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex flex-col sm:flex-row items-center sm:items-start">
                <MapPin className="h-5 w-5 text-decor-accent mr-2 mt-0.5" />
                <span className="text-sm">123 Design Street, Creative City, 45678</span>
              </li>
              <li className="flex flex-col sm:flex-row items-center">
                <Phone className="h-5 w-5 text-decor-accent mr-2" />
                <a href="tel:+11234567890" className="text-sm hover:text-decor-accent transition">+1 (123) 456-7890</a>
              </li>
              <li className="flex flex-col sm:flex-row items-center">
                <Mail className="h-5 w-5 text-decor-accent mr-2" />
                <a href="mailto:info@decormind.com" className="text-sm hover:text-decor-accent transition">info@decormind.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-decor-gray-med mt-12 pt-4 text-center">
          <p className="text-sm text-decor-secondary">
            &copy; {new Date().getFullYear()} DecorMind. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
