interface CustomerTableRowProps {
  idCus: string
  nameCus: string
  avatarCus: string
  datetime: string
  nameAr: string
  service: string
  status: string
}

export default function CustomerTableRow({
  idCus,
  nameCus,
  avatarCus,
  datetime,
  nameAr,
  service,
  status,
}: CustomerTableRowProps) {
  return (
    
    <tr className="border-b hover:bg-gray-50">
      <td className="py-3 px-4">{idCus}</td>
      <td className="py-3 px-4 flex items-center gap-2">
        <img src={avatarCus} className="w-8 h-8 rounded-full" />
        {nameCus}
      </td>
      <td className="py-3 px-4">{datetime}</td>
      <td className="py-3 px-4">{nameAr}</td>
      <td className="py-3 px-4">{service}</td>
      <td className="py-3 px-4">
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
          (status === 'Completed' || status === 'Available')
            ? 'bg-green-100 text-green-700'
            : (status === 'In Progress' || status === 'Banned')
              ? 'bg-red-100 text-orange-700'
              : 'bg-gray-100 text-gray-700'
        }`}>
          {status}
        </span>
      </td>
    </tr>
  )
} 