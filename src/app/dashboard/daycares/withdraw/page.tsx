import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DaycareWithdrawWrapper from "@/components/organism/dashboard/daycares/DaycareWithdrawWrapper";

export default function DashboardWithdrawDaycarePage() {
  return (
    <>
      <DashboardTitle
        title="Penarikan Dana"
        body="Lakukan penarikan dana dari saldo daycare Anda dengan mudah dan aman."
      />
      <DaycareWithdrawWrapper />
    </>
  );
}
