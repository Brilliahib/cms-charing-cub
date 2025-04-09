import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TriangleAlert } from "lucide-react";

export default function AlertInformationCreateProfileDaycare() {
  return (
    <>
      <Alert variant={"warning"}>
        <TriangleAlert className="h-4 w-4" />
        <AlertTitle>Perhatian</AlertTitle>
        <AlertDescription>
          Mohon isi data dengan benar karena data tersebut nanti akan digunakan
          untuk profil daycare Anda.
        </AlertDescription>
      </Alert>
    </>
  );
}
