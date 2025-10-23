import { createContext, useContext, useState, ReactNode } from 'react';
import { Leave, LeaveRequestFormData, LeaveStatus } from '@/types/leave';

interface LeaveContextType {
  leaves: Leave[];
  applyForLeave: (leaveData: LeaveRequestFormData, employeeName: string) => void;
  updateLeaveStatus: (leaveId: string, status: LeaveStatus, processedBy: string, comments?: string) => void;
  getEmployeeLeaves: (employeeId: string) => Leave[];
  getAllLeaves: () => Leave[];
}

const LeaveContext = createContext<LeaveContextType | undefined>(undefined);

export function LeaveProvider({ children }: { children: ReactNode }) {
  const [leaves, setLeaves] = useState<Leave[]>([]);

  const applyForLeave = (leaveData: LeaveRequestFormData, employeeName: string) => {
    const newLeave: Leave = {
      id: `leave-${Date.now()}`,
      employeeId: 'current-user-id', // This should come from auth context
      employeeName,
      leaveType: leaveData.leaveType,
      startDate: leaveData.startDate,
      endDate: leaveData.endDate,
      reason: leaveData.reason,
      status: 'pending',
      appliedDate: new Date().toISOString(),
    };
    setLeaves(prev => [...prev, newLeave]);
  };

  const updateLeaveStatus = (leaveId: string, status: LeaveStatus, processedBy: string, comments?: string) => {
    setLeaves(prev =>
      prev.map(leave =>
        leave.id === leaveId
          ? {
              ...leave,
              status,
              processedBy,
              processedDate: new Date().toISOString(),
              comments: comments || leave.comments,
            }
          : leave
      )
    );
  };

  const getEmployeeLeaves = (employeeId: string) => {
    return leaves.filter(leave => leave.employeeId === employeeId);
  };

  const getAllLeaves = () => {
    return [...leaves];
  };

  return (
    <LeaveContext.Provider
      value={{
        leaves,
        applyForLeave,
        updateLeaveStatus,
        getEmployeeLeaves,
        getAllLeaves,
      }}
    >
      {children}
    </LeaveContext.Provider>
  );
}

export const useLeave = (): LeaveContextType => {
  const context = useContext(LeaveContext);
  if (context === undefined) {
    throw new Error('useLeave must be used within a LeaveProvider');
  }
  return context;
};
