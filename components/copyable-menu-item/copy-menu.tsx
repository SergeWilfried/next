import React from 'react';
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";

interface CopyableMenuItemProps {
  text: string;
  label: string;
}

const CopyableMenuItem: React.FC<CopyableMenuItemProps> = ({ text, label }) => {
  const { toast } = useToast();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: `${label} copied to clipboard`,
    });
  };

  return (
    <DropdownMenuItem onClick={handleCopy}>
      Copy {label}
    </DropdownMenuItem>
  );
};

export default CopyableMenuItem;