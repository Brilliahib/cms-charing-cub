import { Card, CardContent } from "@/components/ui/card";

export default function CardCountBookingSuccess() {
  return (
    <Card className="border">
      <CardContent className="p-4 md:p-6">
        <div className="space-y-2">
          <span className="text-muted-foreground">Booking Dibayar</span>
          <h1 className="font-bold text-2xl">3</h1>
        </div>
      </CardContent>
    </Card>
  );
}
