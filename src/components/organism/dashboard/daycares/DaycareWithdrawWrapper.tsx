import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TriangleAlert } from "lucide-react";

export default function DaycareWithdrawWrapper() {
  return (
    <>
      <div className="py-6">
        <Alert variant={"warning"}>
          <TriangleAlert className="h-4 w-4" />
          <AlertTitle>Information</AlertTitle>
          <AlertDescription>
            We are currently developing this feature and it will be used for
            balance withdrawals.
          </AlertDescription>
        </Alert>
      </div>
    </>
  );
}
