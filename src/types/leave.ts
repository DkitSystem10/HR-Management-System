export type LeaveStatus = 'pending' | 'approved' | 'rejected';

export interface Leave {
  id: string;
  employeeId: string;
  employeeName: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: LeaveStatus;
  appliedDate: string;
  processedBy?: string;
  processedDate?: string;
  comments?: string;
}

export interface LeaveRequestFormData {
  leaveType: string;
  startDate: string;
  endDate: string;
  reason: string;
}

export const leaveTypes = [
  'Sick Leave',
  'Vacation',
  'Personal',
  'Maternity/Paternity',
  'Bereavement',
  'Other'
] as const;
