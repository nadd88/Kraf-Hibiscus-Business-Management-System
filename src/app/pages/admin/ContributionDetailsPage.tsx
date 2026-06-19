import { useParams, Link } from 'react-router';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { mockContributions } from '../../data/staffData';
import { ArrowLeft } from 'lucide-react';

export function ContributionDetailsPage() {
  const { id } = useParams();

  const contribution = mockContributions.find((c) => c.id === id);

  if (!contribution) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <p className="text-[#6B5F5F]">Contribution record not found</p>
          <Link
            to="/admin/contribution"
            className="text-[#C76B83] hover:text-[#EFA3B7] mt-4 inline-block"
          >
            Back to Contribution Records
          </Link>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <Link
            to="/admin/contribution"
            className="inline-flex items-center text-[#6B5F5F] hover:text-[#C76B83] mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Contribution Records
          </Link>
          <h1 className="font-['Playfair_Display'] text-3xl text-[#3B2F2F] mb-2">
            Contribution Details
          </h1>
        </div>

        {/* Contribution Information Card */}
        <div className="bg-white rounded-xl p-8 border border-[#E8D8C8]">
          <h2 className="text-xl text-[#3B2F2F] mb-6">Contribution Information</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-[#6B5F5F] mb-1">Contribution ID</p>
              <p className="text-[#3B2F2F]">{contribution.id}</p>
            </div>

            <div>
              <p className="text-sm text-[#6B5F5F] mb-1">Staff Name</p>
              <p className="text-[#3B2F2F] text-lg">{contribution.staffName}</p>
            </div>

            <div>
              <p className="text-sm text-[#6B5F5F] mb-1">Staff ID</p>
              <p className="text-[#3B2F2F]">{contribution.staffId}</p>
            </div>

            <div>
              <p className="text-sm text-[#6B5F5F] mb-1">Task Title</p>
              <p className="text-[#3B2F2F]">{contribution.taskTitle}</p>
            </div>

            <div>
              <p className="text-sm text-[#6B5F5F] mb-1">Task ID</p>
              <p className="text-[#3B2F2F]">{contribution.taskId}</p>
            </div>

            <div>
              <p className="text-sm text-[#6B5F5F] mb-1">Completion Date</p>
              <p className="text-[#3B2F2F]">{contribution.completionDate}</p>
            </div>

            <div>
              <p className="text-sm text-[#6B5F5F] mb-1">Recorded By</p>
              <p className="text-[#3B2F2F]">{contribution.recordedBy}</p>
            </div>

            <div>
              <p className="text-sm text-[#6B5F5F] mb-1">Created Date</p>
              <p className="text-[#3B2F2F]">{contribution.createdDate}</p>
            </div>

            <div className="md:col-span-2">
              <p className="text-sm text-[#6B5F5F] mb-2">Contribution Details</p>
              <div className="bg-[#FFF8F0] rounded-lg p-4 border border-[#E8D8C8]">
                <p className="text-[#3B2F2F]">{contribution.contributionDetails}</p>
              </div>
            </div>

            {contribution.remarks && (
              <div className="md:col-span-2">
                <p className="text-sm text-[#6B5F5F] mb-2">Remarks</p>
                <div className="bg-[#FFF8F0] rounded-lg p-4 border border-[#E8D8C8]">
                  <p className="text-[#3B2F2F]">{contribution.remarks}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Back Button */}
        <div className="flex justify-end">
          <Link
            to="/admin/contribution"
            className="px-8 py-3 border-2 border-[#EFA3B7] text-[#3B2F2F] rounded-lg hover:bg-[#F5EDE3] transition-colors"
          >
            Back to Contribution Records
          </Link>
        </div>
      </div>
    </AdminLayout>
  );
}
