import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TriangleAlert } from "lucide-react";

export default function AlertComingSoon() {
  return (
    <>
      <Alert variant={"warning"}>
        <TriangleAlert className="h-4 w-4" />
        <AlertTitle>Information</AlertTitle>
        <AlertDescription>
          We are currently developing this feature, please wait until it is
          finished.
        </AlertDescription>
      </Alert>
    </>
  );
}
