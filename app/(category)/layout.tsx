import React from "react";
import { FormProvider } from "../FormContext";

export default function CategoryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <FormProvider>
      <main className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {children}
      </main>
    </FormProvider>
  );
}
