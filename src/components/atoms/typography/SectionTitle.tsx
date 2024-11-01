interface SectionProps {
  title: string;
  subtitle: string;
}

export default function SectionTitle({ title, subtitle }: SectionProps) {
  return (
    <>
      <div className="space-y-2 md:mb-12">
        <p className="font-semibold text-xl text-primary">{title}</p>
        <h1 className="font-paytone text-4xl">{subtitle}</h1>
      </div>
    </>
  );
}
