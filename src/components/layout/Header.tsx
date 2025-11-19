import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import skyboxLogo from "@/assets/skybox-logo-new.png";
import { CartDrawer } from "@/components/cart/CartDrawer";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/events", label: "Events" },
    { to: "/sports", label: "Sports" },
    { to: "/videos", label: "Videos" },
    { to: "/menu", label: "Menu" },
    { to: "/blog", label: "Blog" },
    { to: "/gallery", label: "Gallery" },
    { to: "/contact", label: "Contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center space-x-2">
          <img src={skyboxLogo} alt="Skybox Medellín" className="h-12 w-auto" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive(link.to) ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/reserve">
            <Button className="bg-accent hover:bg-accent/90">Reserve Table</Button>
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <CartDrawer />
          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background animate-fade-in-up">
          <nav className="container flex flex-col gap-4 p-4">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsMenuOpen(false)}
                className={`text-lg font-medium transition-colors hover:text-primary ${
                  isActive(link.to) ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/reserve" onClick={() => setIsMenuOpen(false)}>
              <Button className="w-full bg-accent hover:bg-accent/90">Reserve Table</Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
