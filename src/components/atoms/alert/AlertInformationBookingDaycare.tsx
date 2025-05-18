import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TriangleAlert } from "lucide-react";

export default function AlertInformationBookingDaycare() {
  return (
    <>
      <Alert variant={"warning"}>
        <TriangleAlert className="h-4 w-4" />
        <AlertTitle>Informasi</AlertTitle>
        <AlertDescription>
          Harga total akan muncul setelah Anda memilih pilihan harga dari
          daycare.
        </AlertDescription>
      </Alert>
    </>
  );
}
