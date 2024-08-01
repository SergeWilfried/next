import { School, Users, DollarSign, PiggyBank, UserPlus } from "lucide-react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface InfoCardProps {
  title: string;
  value: string;
  type: 'students' | 'teachers' | 'accounting' | 'donations' | 'enrollments';
  change?: string;
}

const iconMap = {
  students: Users,
  teachers: School,
  accounting: DollarSign,
  donations: PiggyBank,
  enrollments: UserPlus,
}


export default function InfoCard({ title, value, type, change }: InfoCardProps) {
  const Icon = iconMap[type]

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="size-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && <p className="text-xs text-muted-foreground">{change}</p>}
      </CardContent>
    </Card>
  )
}
