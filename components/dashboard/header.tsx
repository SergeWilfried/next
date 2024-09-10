import { BreadcrumbResponsive } from "../breadcumb";

interface DashboardHeaderProps {
  heading: string;
  items?: { href: string; label: string }[];
  children?: React.ReactNode;
  text?: string;
}



export function DashboardHeader({
  heading,
  items,
  text,
  children,
}: DashboardHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="grid gap-1">
        <h1 className="font-heading text-2xl font-semibold">{heading}</h1>
        {items && <BreadcrumbResponsive items={items} />}
        {text && <p className="text-sm text-muted-foreground">{text}</p>}
      </div>
      {children}
    </div>
  );
}
