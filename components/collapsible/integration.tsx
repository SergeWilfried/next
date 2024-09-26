'use client'

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Switch } from "@/components/ui/switch"

interface IntegrationCollapsibleProps {
  title: string
  description: string
  children: React.ReactNode
  switchId: string
}

export function IntegrationCollapsible({ title, description, children, switchId }: IntegrationCollapsibleProps) {
  return (
    <Collapsible>
      <div className="flex items-center justify-between">
        <div>
          <CardTitle className="text-lg">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        <div className="flex items-center space-x-2">
          <CollapsibleTrigger asChild>
            <Switch id={switchId} />
          </CollapsibleTrigger>
        </div>
      </div>
      <CollapsibleContent className="mt-4 space-y-4">
        {children}
      </CollapsibleContent>
    </Collapsible>
  )
}