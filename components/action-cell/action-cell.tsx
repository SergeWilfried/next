import React from 'react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import CopyableMenuItem from '../copyable-menu-item/copy-menu';

interface Action {
  label: string;
  onClick?: (row: any) => void;
  separator?: boolean;
  isCopyable?: boolean;
  copyText?: string;
}

interface ActionsCellProps {
  row: any;
  actions: Action[];
}

const ActionsCell: React.FC<ActionsCellProps> = ({ row, actions }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="size-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        {actions.map((action, index) => (
          <React.Fragment key={index}>
            {action.isCopyable ? (
              <CopyableMenuItem text={action.copyText || ''} label={action.label} />
            ) : (
              <DropdownMenuItem onClick={() => action.onClick && action.onClick(row)}>
                {action.label}
              </DropdownMenuItem>
            )}
            {action.separator && <DropdownMenuSeparator />}
          </React.Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { ActionsCell };