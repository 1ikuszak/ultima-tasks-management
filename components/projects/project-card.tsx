import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Icons } from '../Icons'
import { Overview } from '../overview'
import { KpiChart } from './kpi-chart'
import { TeamTasksOverview } from './team-tasks-overview'

export function ProjectCard() {
  return (
    <Card className="h-[calc(100vh-160px)] max-h-[900px]">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Current Milestone</CardTitle>
          <CardDescription>Project Tittle</CardDescription>
        </div>
        <>
          <Button size={'sm'}>Tasks</Button>
        </>
      </CardHeader>
      <CardContent className="h-[calc(100vh-260px)] max-h-[800px]">
        <div className="grid grid-rows-7 grid-cols-5 gap-2 h-full">
          <div className="row-span-2 col-span-5 ">
            <KpiChart />
          </div>
          <div className="row-span-4 col-span-5">
            <TeamTasksOverview />
          </div>
          <div className="row-span-1 col-span-5">
            <Overview />
          </div>
        </div>
      </CardContent>
      {/* <div className="w-full bg-emerald-200 col-span-1 grid place-items-center">
        <ol className="relative space-y-10 border-red-800 border-s">
          <li className="flex items-center">
            <span className="flex-shrink-0 absolute flex items-center justify-center w-6 h-6 rounded-full -start-3 text-magenta-400 bg-magenta-100 ring-1 ring-magenta-400">
              <Icons.calendar className="w-4 h-4" />
            </span>
          </li>
          <li className="flex items-center">
            <span className="flex-shrink-0 absolute flex items-center justify-center w-6 h-6 rounded-full -start-3 text-magenta-400 bg-magenta-100 ring-1 ring-magenta-400">
              <Icons.calendar className="w-4 h-4" />
            </span>
          </li>
          <li className="flex items-center">
            <span className="flex-shrink-0 absolute flex items-center justify-center w-6 h-6 rounded-full -start-3 text-magenta-400 bg-magenta-100 ring-1 ring-magenta-400">
              <Icons.calendar className="w-4 h-4" />
            </span>
          </li>
          <li className="flex items-center">
            <span className="flex-shrink-0 absolute flex items-center justify-center w-6 h-6 rounded-full -start-3 text-magenta-400 bg-magenta-100 ring-1 ring-magenta-400">
              <Icons.calendar className="w-4 h-4" />
            </span>
          </li>
          <li className="flex items-center">
            <span className="flex-shrink-0 absolute flex items-center justify-center w-6 h-6 rounded-full -start-3 text-magenta-400 bg-magenta-100 ring-1 ring-magenta-400">
              <Icons.calendar className="w-4 h-4" />
            </span>
          </li>
        </ol>
      </div> */}
      {/* <CardFooter>
        <p>Card Footer</p>
      </CardFooter> */}
    </Card>
  )
}
