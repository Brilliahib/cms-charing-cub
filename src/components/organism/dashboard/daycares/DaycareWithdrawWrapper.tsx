import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TriangleAlert } from "lucide-react";

export default function DaycareWithdrawWrapper() {
  return (
    <>
      <div className="py-6">
        <Alert variant={"warning"}>
          <TriangleAlert className="h-4 w-4" />
          <AlertTitle>Informasi</AlertTitle>
          <AlertDescription>
            Sedang dalam proses pengembangan, mohon bersabar ya!
          </AlertDescription>
        </Alert>
      </div>
    </>
  );
}
