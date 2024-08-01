const fs = require('fs');
const path = require('path');

const pages = [
    "Schools",
    "Parents",
    "Students",
    "Enrollments",
    "Applications",
    "Accounting",
    "Staff",
    "Donations"
];

const pageTemplate = `import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { constructMetadata } from "@/lib/utils";
import { DashboardHeader } from "@/components/dashboard/header";
import { EmptyPlaceholder } from "@/components/shared/empty-placeholder";
import { Button } from "@/components/ui/button";

export const metadata = constructMetadata({
  title: "{title} – School Management System",
  description: "Manage {lowercase} in the school system.",
});

export default async function {page}Page() {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") redirect("/login");

  return (
    <>
      <DashboardHeader
        heading="{title}"
        text="Manage {lowercase} in the school system."
      />
      <EmptyPlaceholder>
        <EmptyPlaceholder.Icon name="file" />
        <EmptyPlaceholder.Title>No {lowercase} listed</EmptyPlaceholder.Title>
        <EmptyPlaceholder.Description>
          You don't have any {lowercase} yet. Start by adding some.
        </EmptyPlaceholder.Description>
        <Button>Add {title}</Button>
      </EmptyPlaceholder>
    </>
  );
}
`;

const loadingTemplate = `import { Skeleton } from "@/components/ui/skeleton";
import { DashboardHeader } from "@/components/dashboard/header";

export default function {page}Loading() {
  return (
    <>
      <DashboardHeader
        heading="{title}"
        text="Manage {lowercase} in the school system."
      />
      <Skeleton className="size-full rounded-lg" />
    </>
  );
}
`;

// Ensure the directory exists
const baseDir = path.join('app', '(protected)', 'admin');
fs.mkdirSync(baseDir, { recursive: true });

pages.forEach(page => {
    const lowercase = page.toLowerCase();
    const dirPath = path.join(baseDir, lowercase);
    const pagePath = path.join(dirPath, 'page.tsx');
    const loadingPath = path.join(dirPath, 'loading.tsx');
    
    // Create the directory if it doesn't exist
    fs.mkdirSync(dirPath, { recursive: true });
    
    // Generate page.tsx
    const pageContent = pageTemplate
        .replace(/{page}/g, page)
        .replace(/{title}/g, page)
        .replace(/{lowercase}/g, lowercase);
    
    fs.writeFileSync(pagePath, pageContent);
    console.log(`Created ${pagePath}`);

    // Generate loading.tsx
    const loadingContent = loadingTemplate
        .replace(/{page}/g, page)
        .replace(/{title}/g, page)
        .replace(/{lowercase}/g, lowercase);
    
    fs.writeFileSync(loadingPath, loadingContent);
    console.log(`Created ${loadingPath}`);
});

console.log("All files have been generated!");
