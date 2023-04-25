import { createContext, useState } from "react";
import * as React from "react";
export const SContext = createContext<any>("");
type Props = {
  children: React.ReactNode;
};

export default function SProvider(Props: Props) {
  const [filter, setfilter] = useState<string>("");
  return (
    <SContext.Provider value={{ filter, setfilter }}>
      {Props.children}
    </SContext.Provider>
  );
}
