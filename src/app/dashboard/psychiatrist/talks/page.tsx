import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardPsychiatristWrapper from "@/components/organism/dashboard/psychiatrist/DashboardPsychiatristWrapper";

export default function DashboardPsychiatristTalkPage() {
  return (
    <section>
      <DashboardTitle
        title="Daftar Pertanyaan"
        body="Menampilkan daftar pertanyaan dari Cub Talk"
      />
      <DashboardPsychiatristWrapper />
    </section>
  );
}
