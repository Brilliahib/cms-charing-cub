import { Card, CardContent } from "@/components/ui/card";
import { formatPrice } from "@/utils/price";
import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";

export default function DaycareDashboardContent() {
  return (
    <>
      <div className="py-8 space-y-8">
        <div className="grid md:grid-cols-3 grid-cols-1 gap-4 md:gap-6">
          <Card className="shadow-lg border relative overflow-hidden">
            <CardContent className="p-4 md:p-6">
              <div className="space-y-2">
                <span className="text-muted-foreground">Total</span>
                <h1 className="font-bold text-2xl">{formatPrice(1000000)}</h1>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-lg border relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-green-500 blur-xl opacity-50 rounded-full"></div>
            <div className="absolute top-2 right-2">
              <ArrowDownCircle className="text-green-500 w-9 h-9" />
            </div>

            <CardContent className="p-4 md:p-6">
              <div className="space-y-2">
                <span className="text-muted-foreground">Income</span>
                <h1 className="font-bold text-2xl">{formatPrice(1000000)}</h1>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-lg border relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-red-500 blur-xl opacity-50 rounded-full"></div>
            <div className="absolute top-2 right-2">
              <ArrowUpCircle className="text-red-500 w-9 h-9" />
            </div>

            <CardContent className="p-4 md:p-6">
              <div className="space-y-2">
                <span className="text-muted-foreground">Expense</span>
                <h1 className="font-bold text-2xl">{formatPrice(1000000)}</h1>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
