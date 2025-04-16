// src/app/providers.tsx
"use client";

import { ReactNode, useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export function Providers({ children }: { children: ReactNode }) {
  const [client] = useState(() => new QueryClient());

  return (
    <ChakraProvider resetCSS={false}>
      <QueryClientProvider client={client}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ChakraProvider>
  );
}
