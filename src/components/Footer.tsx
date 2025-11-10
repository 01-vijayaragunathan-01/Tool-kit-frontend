import { Link } from "react-router-dom";
import { Sparkles, Github, Twitter, Linkedin, Mail, Heart, Instagram } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center glow-primary">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Tool Market
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your ultimate directory for discovering, rating, and sharing the
              best AI and productivity tools.
            </p>
            <div className="flex gap-3">
              {/* <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg glass-card flex items-center justify-center hover:bg-primary/10 smooth-transition"
              >
                <Twitter className="w-4 h-4" />
              </a> */}
              <a
                href="https://www.instagram.com/01_v_i_j_a_y_01/?next=%2F"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg glass-card flex items-center justify-center hover:bg-primary/10 smooth-transition"
              >
                <Instagram className="w-4 h-4" />
              </a>
              {/* <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg glass-card flex items-center justify-center hover:bg-primary/10 smooth-transition"
              >
                <Linkedin className="w-4 h-4" />
              </a> */}
              <a
                href="ragunathanvijay68@gmail.com"
                className="w-9 h-9 rounded-lg glass-card flex items-center justify-center hover:bg-primary/10 smooth-transition"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link to="/tools" className="hover:text-primary smooth-transition">
                  Browse Tools
                </Link>
              </li>
              <li>
                <Link to="/tools/create" className="hover:text-primary smooth-transition">
                  Add Tool
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-primary smooth-transition">
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-primary smooth-transition">
                  Top Rated
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link to="/" className="hover:text-primary smooth-transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-primary smooth-transition">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-primary smooth-transition">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-primary smooth-transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link to="/" className="hover:text-primary smooth-transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-primary smooth-transition">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-primary smooth-transition">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-primary smooth-transition">
                  Guidelines
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Tool Kit. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> by
            Vijayaragunathan
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;