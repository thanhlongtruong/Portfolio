"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { EdgeStoreProvider } from "./edgestore";
import { LanguageProvider } from "../contexts/languege";
import { ReactLenis } from "lenis/react";
export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <EdgeStoreProvider>
          <LanguageProvider>
            <ReactLenis root>{children}</ReactLenis>
          </LanguageProvider>
        </EdgeStoreProvider>
      </QueryClientProvider>
    </>
  );
}
