import { useParams } from 'react-router-dom'
import ComingSoon from '../../../../components/ui/ComingSoon.jsx'

// Dynamic route: /bookstore/:id
export default function BookDetailPage() {
  const { id } = useParams()
  return <ComingSoon title={`Book #${id}`} />
}
