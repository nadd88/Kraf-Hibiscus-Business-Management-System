import { ReactNode } from 'react';
import { X } from 'lucide-react';

interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'number' | 'tel' | 'date' | 'textarea' | 'select';
  placeholder?: string;
  required?: boolean;
  options?: { label: string; value: string }[];
  rows?: number;
}

interface AdminFormProps {
  title: string;
  description?: string;
  fields: FormField[];
  formData: Record<string, any>;
  onChange: (name: string, value: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  submitLabel?: string;
  cancelLabel?: string;
  validationErrors?: Record<string, string>;
  customFields?: ReactNode;
}

export function AdminForm({
  title,
  description,
  fields,
  formData,
  onChange,
  onSubmit,
  onCancel,
  submitLabel = 'Save',
  cancelLabel = 'Cancel',
  validationErrors = {},
  customFields,
}: AdminFormProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    onChange(e.target.name, e.target.value);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-['Playfair_Display'] text-3xl text-[#3B2F2F] mb-2">
          {title}
        </h1>
        {description && <p className="text-[#6B5F5F]">{description}</p>}
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-xl p-8 border border-[#E8D8C8]">
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {fields.map((field) => (
              <div
                key={field.name}
                className={field.type === 'textarea' ? 'md:col-span-2' : ''}
              >
                <label className="block text-sm text-[#3B2F2F] mb-2">
                  {field.label}
                  {field.required && <span className="text-[#C94C4C] ml-1">*</span>}
                </label>

                {field.type === 'textarea' ? (
                  <textarea
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleChange}
                    required={field.required}
                    rows={field.rows || 4}
                    placeholder={field.placeholder}
                    className="w-full px-4 py-3 border border-[#E8D8C8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EFA3B7]"
                  />
                ) : field.type === 'select' ? (
                  <select
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleChange}
                    required={field.required}
                    className="w-full px-4 py-3 border border-[#E8D8C8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EFA3B7] appearance-none bg-white"
                  >
                    <option value="">Select {field.label}</option>
                    {field.options?.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleChange}
                    required={field.required}
                    placeholder={field.placeholder}
                    className="w-full px-4 py-3 border border-[#E8D8C8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EFA3B7]"
                  />
                )}

                {validationErrors[field.name] && (
                  <p className="mt-1 text-sm text-[#C94C4C] flex items-center gap-1">
                    <X className="w-4 h-4" />
                    {validationErrors[field.name]}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Custom Fields */}
          {customFields && <div className="md:col-span-2">{customFields}</div>}

          {/* Form Actions */}
          <div className="flex gap-4 pt-4 border-t border-[#E8D8C8]">
            <button
              type="submit"
              className="px-8 py-3 bg-[#EFA3B7] text-[#3B2F2F] rounded-lg hover:bg-[#C76B83] hover:text-white transition-colors"
            >
              {submitLabel}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="px-8 py-3 border-2 border-[#E8D8C8] text-[#6B5F5F] rounded-lg hover:bg-[#F5EDE3] transition-colors"
            >
              {cancelLabel}
            </button>
          </div>

          {/* Required Field Note */}
          <p className="text-sm text-[#6B5F5F] flex items-center gap-1">
            <span className="text-[#C94C4C]">*</span>
            Required fields
          </p>
        </form>
      </div>
    </div>
  );
}
