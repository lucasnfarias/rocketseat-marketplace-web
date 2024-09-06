export interface StatusChipProps {
  status: 'available' | 'sold' | 'cancelled' | null
}

const statusColor = {
  available: 'bg-blue-dark',
  sold: 'bg-success',
  cancelled: 'bg-danger',
}

const statusTitle = {
  available: 'Anunciado',
  sold: 'Vendido',
  cancelled: 'Cancelado',
}

export function StatusChip({ status }: StatusChipProps) {
  function getStatusColor(status: StatusChipProps['status']) {
    return status ? statusColor[status] : 'bg-gray-300'
  }

  function getStatusTitle(status: StatusChipProps['status']) {
    return status ? statusTitle[status] : 'Indefinido'
  }

  return (
    <span
      className={`text-label-sm text-white uppercase px-2 py-1 rounded-full ${getStatusColor(status)}`}
    >
      {getStatusTitle(status)}
    </span>
  )
}
