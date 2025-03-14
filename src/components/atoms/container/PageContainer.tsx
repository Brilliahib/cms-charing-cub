import { PropsWithChildren } from "react";

export default function PageContainer({ children }: PropsWithChildren) {
  return <div className="pad-x mt-8">{children}</div>;
}
