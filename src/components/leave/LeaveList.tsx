import { format } from 'date-fns';
import { CalendarIcon, CheckCircle2, XCircle, Clock } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Leave, LeaveStatus } from '@/types/leave';

interface LeaveListProps {
  leaves: Leave[];
  onStatusChange?: (leaveId: string, status: LeaveStatus, comments?: string) => void;
  isHR?: boolean;
}

export function LeaveList({ leaves, onStatusChange, isHR = false }: LeaveListProps) {
  const getStatusBadge = (status: LeaveStatus) => {
    const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';
    
    switch (status) {
      case 'approved':
        return (
          <span className={`${baseClasses} bg-green-100 text-green-800`}>
            <CheckCircle2 className="h-3 w-3 mr-1" /> Approved
          </span>
        );
      case 'rejected':
        return (
          <span className={`${baseClasses} bg-red-100 text-red-800`}>
            <XCircle className="h-3 w-3 mr-1" /> Rejected
          </span>
        );
      default:
        return (
          <span className={`${baseClasses} bg-yellow-100 text-yellow-800`}>
            <Clock className="h-3 w-3 mr-1" /> Pending
          </span>
        );
    }
  };

  if (leaves.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No leave requests found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {leaves.map((leave) => (
        <Card key={leave.id} className="overflow-hidden">
          <CardHeader className="p-4 pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg">{leave.employeeName}</CardTitle>
                <p className="text-sm text-muted-foreground">{leave.leaveType}</p>
              </div>
              {getStatusBadge(leave.status)}
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center">
                <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>
                  {format(new Date(leave.startDate), 'MMM d, yyyy')} - {format(new Date(leave.endDate), 'MMM d, yyyy')}
                </span>
              </div>
              <div>
                <p className="font-medium">Reason</p>
                <p className="text-muted-foreground">{leave.reason}</p>
              </div>
              {leave.comments && (
                <div>
                  <p className="font-medium">Comments</p>
                  <p className="text-muted-foreground">{leave.comments}</p>
                </div>
              )}
            </div>

            {isHR && leave.status === 'pending' && onStatusChange && (
              <div className="flex justify-end space-x-2 mt-4 pt-4 border-t">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const comments = prompt('Add comments (optional):');
                        onStatusChange(leave.id, 'rejected', comments || undefined);
                      }}
                    >
                      Reject
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Reject this leave request</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="sm"
                      onClick={() => {
                        const comments = prompt('Add comments (optional):');
                        onStatusChange(leave.id, 'approved', comments || undefined);
                      }}
                    >
                      Approve
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Approve this leave request</TooltipContent>
                </Tooltip>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
