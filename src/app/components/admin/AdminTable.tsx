import { ReactNode, useState } from 'react';
import { Search, Filter, Eye, Edit, Trash2, XCircle } from 'lucide-react';

interface Column {
  key: string;
  label: string;
  render?: (value: any, row: any) => ReactNode;
}

interface AdminTableProps {
  title: string;
  description?: string;
  columns: Column[];
  data: any[];
  searchPlaceholder?: string;
  filterOptions?: { label: string; value: string }[];
  onView?: (row: any) => void;
  onEdit?: (row: any) => void;
  onDelete?: (row: any) => void;
  onDeactivate?: (row: any) => void;
  primaryAction?: {
    label: string;
    onClick: () => void;
  };
}

export function AdminTable({
  title,
  description,
  columns,
  data,
  searchPlaceholder = 'Search...',
  filterOptions,
  onView,
  onEdit,
  onDelete,
  onDeactivate,
  primaryAction,
}: AdminTableProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="font-['Playfair_Display'] text-3xl text-[#3B2F2F] mb-2">
            {title}
          </h1>
          {description && <p className="text-[#6B5F5F]">{description}</p>}
        </div>
        {primaryAction && (
          <button
            onClick={primaryAction.onClick}
            className="px-6 py-3 bg-[#EFA3B7] text-[#3B2F2F] rounded-lg hover:bg-[#C76B83] hover:text-white transition-colors"
          >
            {primaryAction.label}
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 border border-[#E8D8C8]">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Bar */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#6B5F5F]" />
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-[#E8D8C8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EFA3B7]"
              />
            </div>
          </div>

          {/* Filter Dropdown */}
          {filterOptions && (
            <div className="md:w-64">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#6B5F5F]" />
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-[#E8D8C8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EFA3B7] appearance-none bg-white"
                >
                  <option value="all">All</option>
                  {filterOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-[#E8D8C8] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#FFF8F0]">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className="px-6 py-4 text-left text-sm text-[#3B2F2F]"
                  >
                    {column.label}
                  </th>
                ))}
                {(onView || onEdit || onDelete || onDeactivate) && (
                  <th className="px-6 py-4 text-left text-sm text-[#3B2F2F]">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8D8C8]">
              {data.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length + 1}
                    className="px-6 py-12 text-center text-[#6B5F5F]"
                  >
                    No data available
                  </td>
                </tr>
              ) : (
                data.map((row, index) => (
                  <tr key={index} className="hover:bg-[#FFF8F0] transition-colors">
                    {columns.map((column) => (
                      <td key={column.key} className="px-6 py-4 text-sm text-[#3B2F2F]">
                        {column.render
                          ? column.render(row[column.key], row)
                          : row[column.key]}
                      </td>
                    ))}
                    {(onView || onEdit || onDelete || onDeactivate) && (
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          {onView && (
                            <button
                              onClick={() => onView(row)}
                              className="p-2 text-[#6B5F5F] hover:bg-[#F5EDE3] hover:text-[#C76B83] rounded transition-colors"
                              title="View"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                          )}
                          {onEdit && (
                            <button
                              onClick={() => onEdit(row)}
                              className="p-2 text-[#6B5F5F] hover:bg-[#F5EDE3] hover:text-[#EFA3B7] rounded transition-colors"
                              title="Edit"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                          )}
                          {onDelete && (
                            <button
                              onClick={() => onDelete(row)}
                              className="p-2 text-[#6B5F5F] hover:bg-[#F5EDE3] hover:text-[#C94C4C] rounded transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                          {onDeactivate && (
                            <button
                              onClick={() => onDeactivate(row)}
                              className="p-2 text-[#6B5F5F] hover:bg-[#F5EDE3] hover:text-[#E8A87C] rounded transition-colors"
                              title="Deactivate"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
