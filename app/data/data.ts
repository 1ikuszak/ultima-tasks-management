// Define the structure of a color theme
export type ColorThemeVariant = {
  primary: string
  secondary: string
  bg: string
}

// Enum for color keys
export enum ColorKey {
  default = 'default',
  blue = 'blue',
  green = 'green',
  rose = 'rose',
  orange = 'orange',
  // Add other keys as needed
}

// Type for the mapping between ColorKey and Tailwind class names
export type ColorMap = {
  [key in ColorKey]?: ColorThemeVariant
}

// Color mapping
export const colorMap: ColorMap = {
  blue: {
    primary: 'theme-blue-primary',
    secondary: 'theme-blue-secondary',
    bg: 'theme-blue-bg',
  },
  green: {
    primary: 'theme-green-primary',
    secondary: 'theme-green-secondary',
    bg: 'theme-green-bg',
  },
  rose: {
    primary: 'theme-rose-primary',
    secondary: 'theme-rose-secondary',
    bg: 'theme-rose-bg',
  },
  default: {
    primary: 'theme-default-primary',
    secondary: 'theme-default-secondary',
    bg: 'theme-default-bg',
  },
  orange: {
    primary: 'theme-orange-primary',
    secondary: 'theme-orange-secondary',
    bg: 'theme-orange-bg',
  },
}

import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  StopwatchIcon,
} from '@radix-ui/react-icons'

import {
  CheckCircle2,
  XOctagon,
  CircleDashed,
  Shield,
  Loader2,
  CalendarCheck2,
  Lock,
} from 'lucide-react'

export const statuses = [
  {
    value: 'todo',
    label: 'Todo',
    icon: CircleDashed,
    variant: 'outline',
  },
  {
    value: 'in_progress',
    label: 'In Progress',
    icon: Loader2,
    variant: 'purple',
  },
  {
    value: 'done',
    label: 'Done',
    icon: CheckCircle2,
    variant: 'green',
  },
  {
    value: 'blocking',
    label: 'Blocking',
    icon: Shield,
    variant: 'rose',
  },
  {
    value: 'blocked',
    label: 'Blocked',
    icon: Lock,
    variant: 'orange',
  },
  {
    value: 'closed',
    label: 'Closed',
    icon: CalendarCheck2,
    variant: 'blue',
  },
]

export const priorities = [
  {
    label: 'Low',
    value: 'low',
    icon: ArrowDownIcon,
  },
  {
    label: 'Medium',
    value: 'medium',
    icon: ArrowRightIcon,
  },
  {
    label: 'High',
    value: 'high',
    icon: ArrowUpIcon,
  },
]

export const project_members = [
  {
    label: 'All',
    value: 'all',
    avatar: 'https://github.com/shadcn.png',
  },
  {
    label: 'Jan',
    value: 'jan',
    avatar: 'https://github.com/shadc.png',
  },
  {
    label: 'Marta',
    value: 'marta',
    avatar: 'https://github.com/shad.png',
  },
  {
    label: 'Maja',
    value: 'maja',
    avatar: 'https://github.com/sss.png',
  },
  {
    label: 'Mariusz',
    value: 'mariusz',
    avatar: 'https://github.com/mellow.png',
  },
  {
    label: 'Marek',
    value: 'marek',
    avatar: 'https://github.com/marshmallow.png',
  },
  {
    label: 'Łukasz',
    value: 'łukasz',
    avatar: 'https://github.com/sss.png',
  },
]
