import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { mockTasks, mockContributions } from '../../data/staffData';
import { ArrowLeft, UserPlus, RefreshCw, CheckCircle } from 'lucide-react';

export function TaskDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const task = mockTasks.find((t) => t.id === id);
  const contribution = mockContributions.find((c) => c.taskId === id);

  if (!task) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <p className="text-[#6B5F5F]">Task not found</p>
          <Link to="/admin/tasks" className="text-[#C76B83] hover:text-[#EFA3B7] mt-4 inline-block">
            Back to Task List
          </Link>
        </div>
      </AdminLayout>
    );
  }

  const getStatusColor = (status: string) => {
    const colorMap: Record<string, string> = {
      'Pending': 'bg-[#C8C8C8] text-white',
      'Assigned': 'bg-[#EFA3B7] text-white',
      'In Progress': 'bg-[#E8A87C] text-white',
      'Completed': 'bg-[#8FBF9F] text-white',
      'Cancelled': 'bg-[#C94C4C] text-white',
    };
    return colorMap[status] || 'bg-[#6B5F5F] text-white';
  };

  const getPriorityColor = (priority: string) => {
    const colorMap: Record<string, string> = {
      'Low': 'text-[#8FBF9F]',
      'Medium': 'text-[#E8A87C]',
      'High': 'text-[#C94C4C]',
    };
    return colorMap[priority] || 'text-[#6B5F5F]';
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <Link
              to="/admin/tasks"
              className="inline-flex items-center text-[#6B5F5F] hover:text-[#C76B83] mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Task List
            </Link>
            <h1 className="font-['Playfair_Display'] text-3xl text-[#3B2F2F] mb-2">
              Task Details
            </h1>
          </div>
          <div className="flex gap-3">
            {task.status !== 'Completed' && task.status !== 'Cancelled' && (
              <>
                {!task.assignedStaff ? (
                  <button
                    onClick={() => navigate(`/admin/tasks/${id}/assign`)}
                    className="px-6 py-3 bg-[#EFA3B7] text-[#3B2F2F] rounded-lg hover:bg-[#C76B83] hover:text-white transition-colors flex items-center gap-2"
                  >
                    <UserPlus className="w-4 h-4" />
                    Assign Task
                  </button>
                ) : (
                  <button
                    onClick={() => navigate(`/admin/tasks/${id}/progress`)}
                    className="px-6 py-3 bg-[#E8A87C] text-white rounded-lg hover:bg-[#D89A6C] transition-colors flex items-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Update Progress
                  </button>
                )}
                {task.status === 'In Progress' && (
                  <button
                    onClick={() => navigate('/admin/tasks')}
                    className="px-6 py-3 bg-[#8FBF9F] text-white rounded-lg hover:bg-[#7AA98A] transition-colors flex items-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Confirm Completion
                  </button>
                )}
              </>
            )}
          </div>
        </div>

        {/* Task Information Card */}
        <div className="bg-white rounded-xl p-8 border border-[#E8D8C8]">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-xl text-[#3B2F2F]">Task Information</h2>
            <div className="flex gap-2">
              <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(task.status)}`}>
                {task.status}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs border-2 border-current ${getPriorityColor(task.priority)}`}>
                {task.priority} Priority
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <p className="text-sm text-[#6B5F5F] mb-1">Task Title</p>
              <p className="text-[#3B2F2F] text-lg">{task.title}</p>
            </div>

            <div className="md:col-span-2">
              <p className="text-sm text-[#6B5F5F] mb-1">Task Description</p>
              <p className="text-[#3B2F2F]">{task.description || '-'}</p>
            </div>

            <div>
              <p className="text-sm text-[#6B5F5F] mb-1">Task ID</p>
              <p className="text-[#3B2F2F]">{task.id}</p>
            </div>

            <div>
              <p className="text-sm text-[#6B5F5F] mb-1">Assigned Staff</p>
              <p className="text-[#3B2F2F]">{task.assignedStaff || 'Not assigned yet'}</p>
            </div>

            <div>
              <p className="text-sm text-[#6B5F5F] mb-1">Due Date</p>
              <p className="text-[#3B2F2F]">{task.dueDate}</p>
            </div>

            <div>
              <p className="text-sm text-[#6B5F5F] mb-1">Created Date</p>
              <p className="text-[#3B2F2F]">{task.createdDate}</p>
            </div>

            {task.assignedDate && (
              <div>
                <p className="text-sm text-[#6B5F5F] mb-1">Assigned Date</p>
                <p className="text-[#3B2F2F]">{task.assignedDate}</p>
              </div>
            )}

            <div>
              <p className="text-sm text-[#6B5F5F] mb-1">Last Updated</p>
              <p className="text-[#3B2F2F]">{task.updatedDate}</p>
            </div>

            {task.completionDate && (
              <div>
                <p className="text-sm text-[#6B5F5F] mb-1">Completion Date</p>
                <p className="text-[#3B2F2F]">{task.completionDate}</p>
              </div>
            )}

            {task.progress && (
              <div className="md:col-span-2">
                <p className="text-sm text-[#6B5F5F] mb-1">Progress Remarks</p>
                <p className="text-[#3B2F2F]">{task.progress}</p>
              </div>
            )}

            {task.remarks && (
              <div className="md:col-span-2">
                <p className="text-sm text-[#6B5F5F] mb-1">Remarks</p>
                <p className="text-[#3B2F2F]">{task.remarks}</p>
              </div>
            )}
          </div>
        </div>

        {/* Contribution Record */}
        {contribution && (
          <div className="bg-white rounded-xl p-8 border border-[#E8D8C8]">
            <h2 className="text-xl text-[#3B2F2F] mb-6">Contribution Record</h2>
            <div className="bg-[#FFF8F0] rounded-lg p-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-[#6B5F5F] mb-1">Contribution ID</p>
                  <p className="text-[#3B2F2F]">{contribution.id}</p>
                </div>
                <div>
                  <p className="text-sm text-[#6B5F5F] mb-1">Recorded By</p>
                  <p className="text-[#3B2F2F]">{contribution.recordedBy}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm text-[#6B5F5F] mb-1">Contribution Details</p>
                  <p className="text-[#3B2F2F]">{contribution.contributionDetails}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
