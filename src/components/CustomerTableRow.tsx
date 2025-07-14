import type { Appointment } from "@/redux/slices/appointmentSlice";

export default function CustomerTableRow(props: Appointment) {
  const {
    customerId,
    customerName,
    imageUrlCustomer,
    appointmentDate,
    address,
    artistMakeupName,
    appointmentDetails,
    totalAmount,
    totalDiscount,
    totalAmountAfterDiscount,
    depositForApp,
    amountToPayForArtist,
    status,
    note
  } = props;

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get status color
  const getStatusColor = (status: string) => {
    const colors = {
      'Completed': 'bg-green-100 text-green-800',
      'Pending': 'bg-yellow-100 text-yellow-800',
      'Canceled': 'bg-red-100 text-red-800',
      'Confirmed': 'bg-blue-100 text-blue-800',
      'Rejected': 'bg-gray-100 text-gray-800',
      'WaitRefund': 'bg-orange-100 text-orange-800',
      'Refunded': 'bg-purple-100 text-purple-800'
    } as const;
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50">
      <td className="py-3 px-4">{customerId}</td>
      <td className="py-3 px-4">{customerName}</td>
      <td className="py-3 px-4">
        {imageUrlCustomer && (
          <img
            src={imageUrlCustomer}
            alt={customerName}
            className="w-10 h-10 rounded-full object-cover"
          />
        )}
      </td>
      <td className="py-3 px-4">{formatDate(appointmentDate)}</td>
      <td className="py-3 px-4">{address}</td>
      <td className="py-3 px-4">{artistMakeupName}</td>
      <td className="py-3 px-4">
        <div className="flex flex-col gap-1">
          {appointmentDetails.map((detail) => (
            <div key={detail.id} className="text-xs">
              <span className="font-medium">{detail.serviceOptionName}</span>
              <span className="text-gray-500"> (x{detail.quantity})</span>
              <div className="text-gray-500">
                {formatCurrency(detail.unitPrice)}
              </div>
            </div>
          ))}
        </div>
      </td>
      <td className="py-3 px-4">{formatCurrency(totalAmount)}</td>
      <td className="py-3 px-4">{formatCurrency(totalDiscount)}</td>
      <td className="py-3 px-4">{formatCurrency(totalAmountAfterDiscount)}</td>
      <td className="py-3 px-4">{formatCurrency(depositForApp)}</td>
      <td className="py-3 px-4">{formatCurrency(amountToPayForArtist)}</td>
      <td className="py-3 px-4">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
          {status}
        </span>
      </td>
      <td className="py-3 px-4">
        <span className="text-gray-500 text-xs">{note}</span>
      </td>
    </tr>
  );
} 