import dynamic from "next/dynamic";

const CubLocationMapsContent = dynamic(
  () => import("@/components/organism/cub/location/CubLocationMapsContent"),
  { ssr: false }
);

export default function CubLocationMapsPage() {
  return (
    <>
      <CubLocationMapsContent />
    </>
  );
}
