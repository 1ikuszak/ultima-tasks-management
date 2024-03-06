import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

type Task = {
  member: string
  title: string
  status: 'finished' | 'in progress'
}

const tasks: Task[] = [
  {
    member: 'John Doe',
    title: 'Design the new PCB layout',
    status: 'in progress',
  },
  {
    member: 'Jane Smith',
    title: 'Update firmware',
    status: 'finished',
  },
  {
    member: 'Alex Johnson',
    title: 'Conduct quality assurance',
    status: 'in progress',
  },
  {
    member: 'Emily Davis',
    title: 'Prepare the technical documentation',
    status: 'finished',
  },
  {
    member: 'Michael Brown',
    title: 'Research potential suppliers',
    status: 'in progress',
  },
  {
    member: 'Linda Wilson',
    title: 'Optimize the energy consumption',
    status: 'finished',
  },
]

export function TeamTasksOverview() {
  return (
    <Table className="text-xs">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Member</TableHead>
          <TableHead>Tasks</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.map((task) => (
          <TableRow key={task.member}>
            <TableCell className="font-medium">{task.member}</TableCell>
            <TableCell>{task.title}</TableCell>
            <TableCell className="text-right">{task.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
