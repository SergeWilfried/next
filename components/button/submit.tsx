import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import React from "react"

interface SubmitButtonProps {
  isLoading?: boolean
  loadingText?: string
  type?: "submit" | "button"
  onClick?: () => void
  children: React.ReactNode
}

export default function SubmitButton({
  isLoading = false,
  loadingText = "Submitting...",
  type = "submit",
  onClick,
  children,
}: SubmitButtonProps) {
  return (
    <Button type={type} disabled={isLoading} onClick={onClick}>
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {loadingText}
        </>
      ) : (
        children
      )}
    </Button>
  )
}