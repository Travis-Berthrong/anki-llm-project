import { AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function BackendError({ onRetry }) {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-destructive">
          <AlertTriangle className="h-6 w-6" />
          <span>Oh No!</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-center text-muted-foreground">
          An unexpected error has occurred. Rest assured, when the person responsible for this error is found, they will be mocked mercilessly.
        </p>
      </CardContent>
      <CardFooter className="flex justify-center">
        {onRetry ? (
          <Button onClick={onRetry} variant="outline">
            Try Again
          </Button>
        ) : (
          <p className="text-sm text-muted-foreground">Please try again later.</p>
        )}
      </CardFooter>
    </Card>
  )
}