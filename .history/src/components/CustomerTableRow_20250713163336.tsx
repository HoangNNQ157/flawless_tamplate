import type { AppointmentDetail } from "@/redux/slices/appointmentSlice";

interface CustomerTableRowProps {
  id: string;
  customerId: string;
  customerName: string;
  imageUrlCustomer?: string | null;
  appointmentDate: string;
  artistMakeupId: string;
  artistMakeupName: string;
  status: string;
  appointmentDetails: AppointmentDetail[];
}

export default function CustomerTableRow({
  id,
  customerId,
  customerName,
  imageUrlCustomer,
  appointmentDate,
  artistMakeupName,
  status,
  appointmentDetails,
}: CustomerTableRowProps) {
  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="py-3 px-4">{customerId}</td>
      <td className="py-3 px-4 flex items-center gap-2">
        {imageUrlCustomer && (
          <img src={imageUrlCustomer} className="w-8 h-8 rounded-full" alt={customerName} />
        )}
        {customerName}
      </td>
      <td className="py-3 px-4">{new Date(appointmentDate).toLocaleString()}</td>
      <td className="py-3 px-4">{artistMakeupName}</td>
      <td className="py-3 px-4">
        {appointmentDetails.map(detail => detail.serviceOptionName).join(", ")}
      </td>
      <td className="py-3 px-4">
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${(status === 'Completed' || status === 'Available')
            ? 'bg-green-100 text-green-700'
            : (status === 'In Progress' || status === 'Banned')
              ? 'bg-red-100 text-orange-700'
              : 'bg-gray-100 text-gray-700'
          }`}>
          {status}
        </span>
      </td>
    </tr>
  );
} 