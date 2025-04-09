import SectionTitle from "@/components/atoms/typography/SectionTitle";
import FormCreateNewTalk from "@/components/molecules/form/FormCreateNewTalk";

export default function CubTalkCreateContent() {
  return (
    <div className="pad-x-xl mt-8 space-y-8">
      <SectionTitle title="Mulai Bertanya" subtitle="Tanyakan disini" />
      <FormCreateNewTalk />
    </div>
  );
}
