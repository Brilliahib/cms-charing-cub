interface SectionProps {
  title: string;
  subtitle: string;
}

export default function SectionTitle({ title, subtitle }: SectionProps) {
  return (
    <>
      <div className="space-y-2">
        <p className="md:text-4xl text-2xl font-paytone">{title}</p>
      </div>
    </>
  );
}
