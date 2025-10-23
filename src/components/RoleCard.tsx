import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface RoleCardProps {
  title: string;
  icon: LucideIcon;
  description: string;
  onClick: () => void;
}

const RoleCard = ({ title, icon: Icon, description, onClick }: RoleCardProps) => {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-2 animate-slide-up bg-card border-border">
      <CardContent className="p-6 text-center">
        <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
          <Icon className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-xl font-semibold mb-2 text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <Button 
          onClick={onClick}
          className="w-full"
          variant="default"
        >
          Login as {title}
        </Button>
      </CardContent>
    </Card>
  );
};

export default RoleCard;
