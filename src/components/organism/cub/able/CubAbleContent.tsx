import { Button } from "@/components/ui/button";

export default function CubAbleContent() {
  return (
    <>
      <div className="mx-auto px-4 max-w-[1400px]">
        <div className="grid md:grid-cols-2 grid-cols-1 md:gap-8 gap-6 md:min-h-[80vh] flex items-center">
          <div className="space-y-4">
            <div className="space-y-3">
              <span className="font-bold">
                Day Care for Children with Disabilities
              </span>
              <h1 className="font-bold md:text-7xl text-4xl bg-gradient-to-r from-primary via-[#79919A] to-[#EED584] bg-clip-text text-transparent">
                Inclusive, loving childcare
              </h1>
              <p>
                Provide your child with the compassionate and specialized care
                they deserve at our daycare center, where every child's unique
                needs are met with love and attention.
              </p>
            </div>
            <div>
              <Button className="rounded-full px-8">Find Daycares</Button>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
}
