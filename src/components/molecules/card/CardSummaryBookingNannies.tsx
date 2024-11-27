import { Card, CardContent } from "@/components/ui/card";

export default function CardSummaryBookingNannies() {
  return (
    <>
      <div className="grid md:grid-cols-3 grid-cols-1 md:gap-6 gap-4">
        <Card className="border shadow-sm">
          <CardContent className="p-4">
            <div className="space-y-4">
              <div>
                <p className="font-semibold">Total Booking</p>
              </div>
              <div>
                <h1 className="font-semibold text-4xl">30</h1>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border shadow-sm">
          <CardContent className="p-4">
            <div className="space-y-4">
              <div>
                <p className="font-semibold">Not Approved</p>
              </div>
              <div>
                <h1 className="font-semibold text-4xl">10</h1>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border shadow-sm">
          <CardContent className="p-4">
            <div className="space-y-4">
              <div>
                <p className="font-semibold">Approved</p>
              </div>
              <div>
                <h1 className="font-semibold text-4xl">20</h1>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
