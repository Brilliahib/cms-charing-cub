import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TriangleAlert } from "lucide-react";

export default function AlertInformationBookingDaycare() {
  return (
    <>
      <Alert variant={"warning"}>
        <TriangleAlert className="h-4 w-4" />
        <AlertTitle>Information</AlertTitle>
        <AlertDescription>
          The total price will be available after selecting the daycare pricing
          option.
        </AlertDescription>
      </Alert>
    </>
  );
}
