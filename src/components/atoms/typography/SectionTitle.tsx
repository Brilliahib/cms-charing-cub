interface SectionProps {
  title: string;
  subtitle: string;
}

export default function SectionTitle({ title, subtitle }: SectionProps) {
  return (
    <>
      <div className="space-y-2 md:mb-12 mb-8">
        <p className="font-semibold text-primary">{title}</p>
        <h1 className="font-paytone md:text-4xl text-3xl">{subtitle}</h1>
      </div>
    </>
  );
}
