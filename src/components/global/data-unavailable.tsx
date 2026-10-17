import { cn } from "@/lib"

interface DataUnavailableProps {
  message?: string
  className?: string
}

// Shown wherever content comes from the database and it can't be loaded
// (for example when MONGODB_URI is not configured yet).
export default function DataUnavailable({
  message = "Data currently not available. Please check back soon.",
  className,
}: DataUnavailableProps) {
  return (
    <div role="status" className={cn("w-full py-20 text-center text-gray-400", className)}>
      {message}
    </div>
  )
}
