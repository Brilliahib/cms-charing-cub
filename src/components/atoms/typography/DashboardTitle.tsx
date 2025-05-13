interface DashboardTitleProps {
  title: string;
  body?: string;
}

export default function DashboardTitle({ title, body }: DashboardTitleProps) {
  return (
    <div className={body ? "space-y-3" : ""}>
      <h1 className="font-paytone md:text-4xl text-3xl">{title}</h1>
      {body && (
        <p className="text-muted-foreground mt-2 text-md leading-relaxed">
          {body}.
        </p>
      )}
    </div>
  );
}
