import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TriangleAlert } from "lucide-react";

export default function AlertInformationCreateProfileDaycare() {
  return (
    <>
      <Alert variant={"warning"}>
        <TriangleAlert className="h-4 w-4" />
        <AlertTitle>Information</AlertTitle>
        <AlertDescription>
          Please fill in the following data carefully because it will be used
          for your daycare profile.
        </AlertDescription>
      </Alert>
    </>
  );
}
