interface SectionProps {
  title: string;
  subtitle: string;
}

export default function SectionTitle({ title, subtitle }: SectionProps) {
  return (
    <>
      <div className="space-y-2">
        <p className="font-black md:text-3xl text-2xl font-figtree ">{title}</p>
      </div>
    </>
  );
}
