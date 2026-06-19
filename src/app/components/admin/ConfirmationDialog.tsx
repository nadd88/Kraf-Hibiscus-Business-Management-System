import { AlertTriangle, X } from 'lucide-react';

interface ConfirmationDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  type?: 'warning' | 'danger' | 'info';
}

export function ConfirmationDialog({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
  type = 'warning',
}: ConfirmationDialogProps) {
  if (!isOpen) return null;

  const getIconColor = () => {
    switch (type) {
      case 'danger':
        return 'bg-[#C94C4C]';
      case 'info':
        return 'bg-[#EFA3B7]';
      default:
        return 'bg-[#E8A87C]';
    }
  };

  const getConfirmButtonColor = () => {
    switch (type) {
      case 'danger':
        return 'bg-[#C94C4C] hover:bg-[#A03C3C]';
      case 'info':
        return 'bg-[#EFA3B7] hover:bg-[#C76B83]';
      default:
        return 'bg-[#E8A87C] hover:bg-[#D89A6C]';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full border border-[#E8D8C8] shadow-xl">
        {/* Close Button */}
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-[#6B5F5F] hover:text-[#C94C4C] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Warning Icon */}
        <div className="flex justify-center mb-6">
          <div className={`w-16 h-16 ${getIconColor()} rounded-full flex items-center justify-center`}>
            <AlertTriangle className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* Title */}
        <h2 className="font-['Playfair_Display'] text-2xl text-[#3B2F2F] text-center mb-4">
          {title}
        </h2>

        {/* Message */}
        <p className="text-[#6B5F5F] text-center mb-8">{message}</p>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-6 py-3 border-2 border-[#E8D8C8] text-[#6B5F5F] rounded-lg hover:bg-[#F5EDE3] transition-colors"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 px-6 py-3 text-white rounded-lg transition-colors ${getConfirmButtonColor()}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
