import { useState } from "react";
import { LayoutDashboard, Users, Calendar, ClipboardList, FileText, Settings, LogOut, BarChart, Plus } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardCard from "@/components/DashboardCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface Circular {
  id: string;
  title: string;
  content: string;
  date: string;
  status: string;
}

const HRDashboard = () => {
  const { toast } = useToast();
  const [circulars, setCirculars] = useState<Circular[]>([
    { id: "1", title: "New Holiday Announcement", content: "Company holiday on Jan 26", date: "Jan 10, 2025", status: "Pending" },
    { id: "2", title: "Updated Leave Policy", content: "New leave policy details", date: "Jan 8, 2025", status: "Approved" },
    { id: "3", title: "Team Building Event", content: "Annual team building event", date: "Jan 12, 2025", status: "Pending" },
  ]);
  const [isCircularDialogOpen, setIsCircularDialogOpen] = useState(false);
  const navItems = [
    { title: "Dashboard", href: "/dashboard/hr", icon: LayoutDashboard },
    { title: "Employees", href: "/dashboard/hr/employees", icon: Users },
    { title: "Leave", href: "/dashboard/hr/leave", icon: Calendar },
    { title: "Attendance", href: "/dashboard/hr/attendance", icon: ClipboardList },
    { title: "Circulars", href: "/dashboard/hr/circulars", icon: FileText },
    { title: "Reports", href: "/dashboard/hr/reports", icon: BarChart },
    { title: "Settings", href: "/dashboard/hr/settings", icon: Settings },
    { title: "Logout", href: "/login", icon: LogOut },
  ];

  const weeklyAttendance = [
    { day: "Mon", attendance: 95 },
    { day: "Tue", attendance: 92 },
    { day: "Wed", attendance: 97 },
    { day: "Thu", attendance: 94 },
    { day: "Fri", attendance: 90 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Sidebar items={navItems} />
      <DashboardHeader userName="Emily HR" userRole="HR Manager" />
      
      <main className="lg:ml-64 pt-16 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-slide-up">
          <DashboardCard
            title="Total Employees"
            value="305"
            icon={Users}
            description="Active employees"
          />
          <DashboardCard
            title="Pending Leave Approvals"
            value="12"
            icon={Calendar}
            description="Awaiting your review"
          />
          <DashboardCard
            title="Today's Attendance"
            value="287"
            icon={ClipboardList}
            description="94% present"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Attendance Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsBarChart data={weeklyAttendance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="attendance" fill="hsl(var(--primary))" />
                </RechartsBarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pending Leave Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: "Sarah Johnson", type: "Sick Leave", days: "2 days", date: "Jan 15-16" },
                  { name: "Michael Chen", type: "Vacation", days: "5 days", date: "Jan 20-24" },
                  { name: "Emma Wilson", type: "Personal", days: "1 day", date: "Jan 18" },
                ].map((leave, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-accent/50">
                    <div>
                      <p className="font-medium text-sm">{leave.name}</p>
                      <p className="text-xs text-muted-foreground">{leave.type} - {leave.days}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{leave.date}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Circulars Sent for Approval</CardTitle>
            <Dialog open={isCircularDialogOpen} onOpenChange={setIsCircularDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Create Circular
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Circular</DialogTitle>
                </DialogHeader>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const newCircular: Circular = {
                    id: Date.now().toString(),
                    title: formData.get("title") as string,
                    content: formData.get("content") as string,
                    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                    status: "Pending",
                  };
                  setCirculars([...circulars, newCircular]);
                  setIsCircularDialogOpen(false);
                  toast({ title: "Circular created successfully", description: "Sent for admin approval" });
                }} className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" name="title" placeholder="Enter circular title" required />
                  </div>
                  <div>
                    <Label htmlFor="content">Content</Label>
                    <Textarea id="content" name="content" placeholder="Enter circular content" required />
                  </div>
                  <Button type="submit" className="w-full">Create Circular</Button>
                </form>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {circulars.map((circular) => (
                <div key={circular.id} className="flex items-center justify-between p-3 rounded-lg bg-accent/50">
                  <div>
                    <p className="font-medium text-sm">{circular.title}</p>
                    <p className="text-xs text-muted-foreground">{circular.date}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    circular.status === "Approved" 
                      ? "bg-green-100 text-green-700" 
                      : "bg-yellow-100 text-yellow-700"
                  }`}>
                    {circular.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>

      <Dialog open={isCircularDialogOpen} onOpenChange={setIsCircularDialogOpen}>
        <DialogTrigger asChild>
          <Button 
            className="fixed bottom-6 right-6 rounded-full h-14 w-14 shadow-lg"
            size="icon"
          >
            <Plus className="h-6 w-6" />
          </Button>
        </DialogTrigger>
      </Dialog>
    </div>
  );
};

export default HRDashboard;
