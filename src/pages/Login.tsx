import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import logoImage from "@/assets/logos__4_-removebg-preview.png";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const initialRole = (location.state as { role?: string })?.role || "admin";
  const [selectedRole, setSelectedRole] = useState(initialRole);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const demoCredentials = {
    admin: { email: "admin@hrms.com", password: "admin123" },
    hr: { email: "hr@hrms.com", password: "hr123" },
    employee: { email: "emp@hrms.com", password: "emp123" },
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    const credentials = demoCredentials[selectedRole as keyof typeof demoCredentials];
    
    if (email === credentials.email && password === credentials.password) {
      toast({
        title: "Login Successful",
        description: `Welcome back, ${selectedRole}!`,
      });
      
      navigate(`/dashboard/${selectedRole}`);
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid credentials. Please check the demo credentials below.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-accent p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <img
              src={logoImage}
              alt="HR Management System Logo"
              className="h-12 w-auto"
            />
          </div>
          <CardTitle className="text-2xl">HR Management System</CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedRole} onValueChange={setSelectedRole} className="mb-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="admin">Admin</TabsTrigger>
              <TabsTrigger value="hr">HR</TabsTrigger>
              <TabsTrigger value="employee">Employee</TabsTrigger>
            </TabsList>
          </Tabs>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>

          <div className="mt-6 p-4 bg-muted rounded-lg">
            <p className="text-xs font-semibold text-muted-foreground mb-2">Demo Credentials:</p>
            <div className="text-xs space-y-1 text-muted-foreground">
              <p><strong>Admin:</strong> admin@hrms.com / admin123</p>
              <p><strong>HR:</strong> hr@hrms.com / hr123</p>
              <p><strong>Employee:</strong> emp@hrms.com / emp123</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
