import { useState, useEffect } from "react";
import { LayoutDashboard, Database, Users, Calendar, ClipboardList, FileText, Settings, LogOut, BarChart, Plus, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLeave } from "@/contexts/LeaveContext";

import Sidebar from "@/components/Sidebar";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardCard from "@/components/DashboardCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { LeaveList } from "@/components/leave/LeaveList";

interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  role: string;
  joinDate: string;
}

interface Leave {
  id: string;
  employeeName: string;
  type: string;
  startDate: string;
  endDate: string;
  status: string;
}

interface Circular {
  id: string;
  title: string;
  content: string;
  date: string;
  status: string;
}

const AdminDashboard = () => {
  const { toast } = useToast();
  const { getAllLeaves } = useLeave();
  const [leaves, setLeaves] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch leaves on component mount
  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const leavesData = await getAllLeaves();
        setLeaves(leavesData || []);
      } catch (error) {
        console.error('Error fetching leaves:', error);
        toast({
          title: "Error",
          description: "Failed to load leaves data",
          variant: "destructive",
        });
        setLeaves([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaves();
  }, [getAllLeaves, toast]);
  const [employees, setEmployees] = useState<Employee[]>([
    { id: "1", name: "Sarah Johnson", email: "sarah@hrms.com", department: "Engineering", role: "Senior Developer", joinDate: "2023-01-15" },
    { id: "2", name: "Michael Chen", email: "michael@hrms.com", department: "Marketing", role: "Marketing Manager", joinDate: "2023-03-20" },
    { id: "3", name: "Emma Wilson", email: "emma@hrms.com", department: "Sales", role: "Sales Executive", joinDate: "2023-05-10" },
  ]);

  const [circulars, setCirculars] = useState<Circular[]>([
    { id: "1", title: "New Holiday Announcement", content: "Company holiday on Jan 26", date: "2025-01-10", status: "Approved" },
    { id: "2", title: "Updated Leave Policy", content: "New leave policy effective Feb 1", date: "2025-01-08", status: "Approved" },
  ]);

  const [isEmployeeDialogOpen, setIsEmployeeDialogOpen] = useState(false);
  const [isCircularDialogOpen, setIsCircularDialogOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [editingCircular, setEditingCircular] = useState<Circular | null>(null);

  const navItems = [
    { title: "Dashboard", href: "/dashboard/admin", icon: LayoutDashboard },
    { title: "Data Master", href: "/dashboard/admin/data", icon: Database },
    { title: "Employees", href: "/dashboard/admin/employees", icon: Users },
    { title: "Leave", href: "/dashboard/admin/leave", icon: Calendar },
    { title: "Attendance", href: "/dashboard/admin/attendance", icon: ClipboardList },
    { title: "Circulars", href: "/dashboard/admin/circulars", icon: FileText },
    { title: "Reports", href: "/dashboard/admin/reports", icon: BarChart },
    { title: "Settings", href: "/dashboard/admin/settings", icon: Settings },
    { title: "Logout", href: "/login", icon: LogOut },
  ];

  const attendanceData = [
    { month: "Jan", present: 450 },
    { month: "Feb", present: 430 },
    { month: "Mar", present: 470 },
    { month: "Apr", present: 460 },
    { month: "May", present: 480 },
    { month: "Jun", present: 465 },
  ];

  const departmentData = [
    { name: "Engineering", value: 120 },
    { name: "Marketing", value: 45 },
    { name: "Sales", value: 80 },
    { name: "HR", value: 25 },
    { name: "Finance", value: 35 },
  ];

  const COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))", "hsl(var(--chart-5))"];

  const handleAddEmployee = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newEmployee: Employee = {
      id: Date.now().toString(),
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      department: formData.get("department") as string,
      role: formData.get("role") as string,
      joinDate: formData.get("joinDate") as string,
    };
    setEmployees([...employees, newEmployee]);
    setIsEmployeeDialogOpen(false);
    toast({ title: "Employee added successfully" });
  };

  const handleEditEmployee = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingEmployee) return;
    const formData = new FormData(e.currentTarget);
    const updatedEmployee: Employee = {
      ...editingEmployee,
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      department: formData.get("department") as string,
      role: formData.get("role") as string,
      joinDate: formData.get("joinDate") as string,
    };
    setEmployees(employees.map(emp => emp.id === editingEmployee.id ? updatedEmployee : emp));
    setEditingEmployee(null);
    setIsEmployeeDialogOpen(false);
    toast({ title: "Employee updated successfully" });
  };

  const handleDeleteEmployee = (id: string) => {
    setEmployees(employees.filter(emp => emp.id !== id));
    toast({ title: "Employee deleted successfully" });
  };

  const handleAddCircular = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newCircular: Circular = {
      id: Date.now().toString(),
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      date: new Date().toISOString().split('T')[0],
      status: "Approved",
    };
    setCirculars([...circulars, newCircular]);
    setIsCircularDialogOpen(false);
    toast({ title: "Circular created successfully" });
  };

  const handleDeleteCircular = (id: string) => {
    setCirculars(circulars.filter(circ => circ.id !== id));
    toast({ title: "Circular deleted successfully" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar items={navItems} />
      <DashboardHeader userName="John Admin" userRole="Admin" />
      
      <main className="lg:ml-64 pt-16 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-slide-up">
          <DashboardCard
            title="Total Employees"
            value={employees.length.toString()}
            icon={Users}
            description="Active employees"
            trend={{ value: "+12% from last month", isPositive: true }}
          />
          <DashboardCard
            title="Present Today"
            value="287"
            icon={ClipboardList}
            description="94% attendance"
            trend={{ value: "+2% from yesterday", isPositive: true }}
          />
          <DashboardCard
            title="Pending Leaves"
            value={leaves.filter(l => l.status === "Pending").length.toString()}
            icon={Calendar}
            description="Awaiting approval"
          />
          <DashboardCard
            title="Active Circulars"
            value={circulars.length.toString()}
            icon={FileText}
            description="Published circulars"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Attendance</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsBarChart data={attendanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="present" fill="hsl(var(--primary))" />
                </RechartsBarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Department Distribution</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={departmentData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(entry) => entry.name}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {departmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Employee Management</CardTitle>
            <Dialog open={isEmployeeDialogOpen} onOpenChange={setIsEmployeeDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="gap-2" onClick={() => setEditingEmployee(null)}>
                  <Plus className="h-4 w-4" />
                  Add Employee
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{editingEmployee ? "Edit Employee" : "Add New Employee"}</DialogTitle>
                </DialogHeader>
                <form onSubmit={editingEmployee ? handleEditEmployee : handleAddEmployee} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" defaultValue={editingEmployee?.name} required />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" defaultValue={editingEmployee?.email} required />
                  </div>
                  <div>
                    <Label htmlFor="department">Department</Label>
                    <Select name="department" defaultValue={editingEmployee?.department} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Engineering">Engineering</SelectItem>
                        <SelectItem value="Marketing">Marketing</SelectItem>
                        <SelectItem value="Sales">Sales</SelectItem>
                        <SelectItem value="HR">HR</SelectItem>
                        <SelectItem value="Finance">Finance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="role">Role</Label>
                    <Input id="role" name="role" defaultValue={editingEmployee?.role} required />
                  </div>
                  <div>
                    <Label htmlFor="joinDate">Join Date</Label>
                    <Input id="joinDate" name="joinDate" type="date" defaultValue={editingEmployee?.joinDate} required />
                  </div>
                  <Button type="submit" className="w-full">
                    {editingEmployee ? "Update" : "Add"} Employee
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {employees.map((employee) => (
                <div key={employee.id} className="flex items-center justify-between p-3 rounded-lg bg-accent/50">
                  <div>
                    <p className="font-medium text-sm">{employee.name}</p>
                    <p className="text-xs text-muted-foreground">{employee.department} - {employee.role}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => {
                        setEditingEmployee(employee);
                        setIsEmployeeDialogOpen(true);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleDeleteEmployee(employee.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Leave Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <LeaveList 
              leaves={getAllLeaves()}
              isHR={false}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Circular Management</CardTitle>
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
                <form onSubmit={handleAddCircular} className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" name="title" required />
                  </div>
                  <div>
                    <Label htmlFor="content">Content</Label>
                    <Input id="content" name="content" required />
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
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleDeleteCircular(circular.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminDashboard;
