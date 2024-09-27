export interface TodoInterface {
  id: string
  title: string
  description: string
  status: 'PENDING' | 'COMPLETED' | 'NOT_STARTED'
  startDate: Date
  expectedFinishDate: Date
  priority: 'LOW' | 'MEDIUM' | 'HIGH'
}
