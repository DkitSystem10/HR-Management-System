import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logoImage from "@/assets/logos__4_-removebg-preview.png";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          <Link to="/" className="flex items-center gap-4 text-xl font-semibold text-primary">
            <img
              src={logoImage}
              alt="HR Management System Logo"
              className="h-14 w-auto"
            />
            <span className="text-lg md:text-xl">HR Management System</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/#about" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              About
            </Link>
            <Link to="/#contact" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Contact
            </Link>
            <Link to="/login">
              <Button variant="default" size="sm">
                Login
              </Button>
            </Link>
          </div>
          
          <Link to="/login" className="md:hidden">
            <Button variant="default" size="sm">
              Login
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
