import { BreadcrumbResponsive } from "../breadcumb";

interface DashboardHeaderProps {
  heading: string;
  items?: { href: string; label: string }[];
  children?: React.ReactNode;
}



export function DashboardHeader({
  heading,
  items,
  children,
}: DashboardHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="grid gap-1">
        <h1 className="font-heading text-2xl font-semibold">{heading}</h1>
        {items && <BreadcrumbResponsive items={items} />}
      </div>
      {children}
    </div>
  );
}
