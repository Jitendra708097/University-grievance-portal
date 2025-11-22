import { twMerge } from 'tailwind-merge';

export default function StatusBadge({ status }) {
  const getColors = () => {
    switch (status) {
      case 'Pending': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'In Progress': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Resolved': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Rejected': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <span className={twMerge("px-2.5 py-0.5 rounded-full text-xs font-semibold border", getColors())}>
      {status}
    </span>
  );
}