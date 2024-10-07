import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

interface SubmitButtonProps {
  isLoading?: boolean
  loadingText?: string
  onClick?: () => void
  children: React.ReactNode
}

export default function SubmitButton({
  isLoading = false,
  loadingText = "Submitting...",
  onClick,
  children,
}: SubmitButtonProps) {
  return (
    <Button type="submit" disabled={isLoading} onClick={onClick}>
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