import { useState } from "react";
import { LayoutDashboard, Calendar, ClipboardList, FileText, Settings, LogOut, User, Mail, Phone, MapPin, BarChart } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardCard from "@/components/DashboardCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface LeaveRequest {
  id: string;
  type: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: string;
  appliedDate: string;
}

interface Circular {
  id: string;
  title: string;
  content: string;
  date: string;
}

const EmployeeDashboard = () => {
  const { toast } = useToast();
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([
    { id: "1", type: "Vacation", startDate: "2025-02-10", endDate: "2025-02-14", reason: "Family vacation", status: "Pending", appliedDate: "2025-01-15" },
    { id: "2", type: "Sick Leave", startDate: "2025-01-05", endDate: "2025-01-06", reason: "Medical checkup", status: "Approved", appliedDate: "2025-01-03" },
    { id: "3", type: "Personal", startDate: "2024-12-28", endDate: "2024-12-28", reason: "Personal work", status: "Approved", appliedDate: "2024-12-20" },
  ]);

  const [circulars, setCirculars] = useState<Circular[]>([
    { id: "1", title: "Holiday Announcement - 2025", content: "Company holiday on Jan 26", date: "Jan 10, 2025" },
    { id: "2", title: "Updated Leave Policy", content: "New leave policy effective from Feb 1", date: "Jan 8, 2025" },
    { id: "3", title: "Team Building Event", content: "Annual team building on Feb 15", date: "Jan 5, 2025" },
  ]);

  const [isLeaveDialogOpen, setIsLeaveDialogOpen] = useState(false);
  const [selectedCircular, setSelectedCircular] = useState<Circular | null>(null);
  const [isCircularDialogOpen, setIsCircularDialogOpen] = useState(false);

  const navItems = [
    { title: "Dashboard", href: "/dashboard/employee", icon: LayoutDashboard },
    { title: "My Attendance", href: "/dashboard/employee/attendance", icon: ClipboardList },
    { title: "My Leaves", href: "/dashboard/employee/leave", icon: Calendar },
    { title: "Circulars", href: "/dashboard/employee/circulars", icon: FileText },
    { title: "Reports", href: "/dashboard/employee/reports", icon: BarChart },
    { title: "Settings", href: "/dashboard/employee/settings", icon: Settings },
    { title: "Logout", href: "/login", icon: LogOut },
  ];

  const handleApplyLeave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newLeave: LeaveRequest = {
      id: Date.now().toString(),
      type: formData.get("type") as string,
      startDate: formData.get("startDate") as string,
      endDate: formData.get("endDate") as string,
      reason: formData.get("reason") as string,
      status: "Pending",
      appliedDate: new Date().toISOString().split('T')[0],
    };
    setLeaveRequests([newLeave, ...leaveRequests]);
    setIsLeaveDialogOpen(false);
    toast({ title: "Leave request submitted", description: "Your request has been sent for approval" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar items={navItems} />
      <DashboardHeader userName="Alex Employee" userRole="Software Engineer" />
      
      <main className="lg:ml-64 pt-16 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-slide-up">
          <DashboardCard
            title="Leaves Remaining"
            value="12"
            icon={Calendar}
            description="Out of 18 total days"
          />
          <DashboardCard
            title="Attendance This Month"
            value="95%"
            icon={ClipboardList}
            description="19 out of 20 days"
            trend={{ value: "+3% from last month", isPositive: true }}
          />
          <DashboardCard
            title="Circulars Received"
            value={circulars.length.toString()}
            icon={FileText}
            description="3 unread"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Attendance Calendar</CardTitle>
              <Button size="sm" variant="outline">View Full Calendar</Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2">
                {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
                  <div key={i} className="text-center text-sm font-medium text-muted-foreground p-2">
                    {day}
                  </div>
                ))}
                {Array.from({ length: 31 }, (_, i) => {
                  const isPresent = Math.random() > 0.1;
                  return (
                    <div
                      key={i}
                      className={`aspect-square flex items-center justify-center text-sm rounded-lg ${
                        isPresent 
                          ? "bg-green-100 text-green-700" 
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {i + 1}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>My Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center text-center">
                <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <User className="h-10 w-10 text-primary" />
                </div>
                <h3 className="font-semibold">Alex Employee</h3>
                <p className="text-sm text-muted-foreground">Software Engineer</p>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Department:</span>
                  <span className="font-medium">Engineering</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Employee ID:</span>
                  <span className="font-medium">EMP-2024-001</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Email:</span>
                  <span className="font-medium text-xs">emp@hrms.com</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Leave Requests</CardTitle>
              <Dialog open={isLeaveDialogOpen} onOpenChange={setIsLeaveDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm">Apply for Leave</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Apply for Leave</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleApplyLeave} className="space-y-4">
                    <div>
                      <Label htmlFor="type">Leave Type</Label>
                      <Select name="type" required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select leave type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Sick Leave">Sick Leave</SelectItem>
                          <SelectItem value="Vacation">Vacation</SelectItem>
                          <SelectItem value="Personal">Personal</SelectItem>
                          <SelectItem value="Emergency">Emergency</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="startDate">Start Date</Label>
                      <Input id="startDate" name="startDate" type="date" required />
                    </div>
                    <div>
                      <Label htmlFor="endDate">End Date</Label>
                      <Input id="endDate" name="endDate" type="date" required />
                    </div>
                    <div>
                      <Label htmlFor="reason">Reason</Label>
                      <Textarea id="reason" name="reason" placeholder="Enter reason for leave" required />
                    </div>
                    <Button type="submit" className="w-full">Submit Leave Request</Button>
                  </form>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {leaveRequests.map((leave) => (
                  <div key={leave.id} className="flex items-center justify-between p-3 rounded-lg bg-accent/50">
                    <div>
                      <p className="font-medium text-sm">{leave.type}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(leave.startDate).toLocaleDateString()} - {new Date(leave.endDate).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge variant={leave.status === "Approved" ? "default" : leave.status === "Rejected" ? "destructive" : "secondary"}>
                      {leave.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Circulars</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {circulars.map((circular, index) => (
                  <div
                    key={circular.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-accent/50 cursor-pointer hover:bg-accent/70 transition-colors"
                    onClick={() => {
                      setSelectedCircular(circular);
                      setIsCircularDialogOpen(true);
                    }}
                  >
                    <div className="flex-1">
                      <p className="font-medium text-sm">{circular.title}</p>
                      <p className="text-xs text-muted-foreground">{circular.date}</p>
                    </div>
                    {index < 2 && (
                      <Badge variant="destructive" className="ml-2">New</Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Dialog open={isCircularDialogOpen} onOpenChange={setIsCircularDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedCircular?.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">{selectedCircular?.date}</p>
            <p className="text-sm">{selectedCircular?.content}</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmployeeDashboard;
