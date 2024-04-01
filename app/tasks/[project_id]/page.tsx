import { promises as fs } from 'fs'
import path from 'path'
import { z } from 'zod'

import { columns } from '@/components/data-table/columns'
import { DataTable } from '@/components/data-table/data-table'
import { TaskSchema } from '@/schemas'
import MaxWidthWrapper from '@/components/max-width-wrapper'

async function getTasks() {
  const data = await fs.readFile(
    path.join(process.cwd(), 'app/data/tasks.json')
  )

  const tasks = JSON.parse(data.toString())

  return z.array(TaskSchema).parse(tasks)
}

export default async function TaskPage() {
  const tasks = await getTasks()

  return (
    <MaxWidthWrapper>
      <div className="my-4">
        <DataTable data={tasks} columns={columns} />
      </div>
    </MaxWidthWrapper>
  )
}
