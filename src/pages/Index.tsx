import { useNavigate } from "react-router-dom";
import { ShieldCheck, UserCog, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import RoleCard from "@/components/RoleCard";
import heroImage from "@/assets/hero-bg.jpg";
import logoImage from "@/assets/logos__4_-removebg-preview.png";

const Index = () => {
  const navigate = useNavigate();

  const handleRoleClick = (role: string) => {
    navigate("/login", { state: { role } });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section 
        className="relative pt-20 min-h-[700px] flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(30, 136, 229, 0.85), rgba(21, 101, 192, 0.85)), url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center py-12 animate-fade-in">
          <div className="flex justify-center mb-4">
            <img
              src={logoImage}
              alt="Durkkas Innovations Pvt. Ltd Logo"
              className="h-52 w-auto mb-2"
            />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-3 whitespace-nowrap animate-pulse animate-fade-in transform hover:scale-105 transition-transform duration-300">
            Welcome to Durkkas Innovations Pvt. Ltd
          </h1>
          <p className="text-2xl md:text-3xl font-semibold text-white/80 mb-4 animate-fade-in delay-200">
            HR Management System
          </p>
          <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto animate-fade-in delay-500">
            Automate Attendance, Leaves, and Communication Effortlessly
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto mt-14">
            <RoleCard
              title="Admin"
              icon={ShieldCheck}
              description="Manage all system operations and approvals"
              onClick={() => handleRoleClick("admin")}
            />
            <RoleCard
              title="HR"
              icon={UserCog}
              description="Handle employee management and circulars"
              onClick={() => handleRoleClick("hr")}
            />
            <RoleCard
              title="Employee"
              icon={Users}
              description="Access your attendance, leaves, and updates"
              onClick={() => handleRoleClick("employee")}
            />
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section id="about" className="py-20 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">About Our System</h2>
            <p className="text-lg text-muted-foreground">
              Our comprehensive HR Management System streamlines your organization's human resource operations. 
              From attendance tracking to leave management and internal communications, we provide an all-in-one 
              solution designed for modern enterprises.
            </p>
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section id="contact" className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">Contact Us</h2>
            <p className="text-lg text-muted-foreground mb-4">
              Need help or have questions? We're here to assist you.
            </p>
            <p className="text-primary font-medium">
              Email: support@hrms.com
            </p>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-card border-t border-border py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 HR Management System. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
