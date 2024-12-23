interface DashboardTitleProps {
  title: string;
}

export default function DashboardTitle({ title }: DashboardTitleProps) {
  return (
    <>
      <div className="space-y-3">
        <h1 className="font-black md:text-4xl text-3xl">{title}</h1>
      </div>
    </>
  );
}
