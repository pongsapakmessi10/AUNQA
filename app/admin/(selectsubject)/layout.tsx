import React from "react";
import { FormProvider } from "../../FormContext";

export default function SelectSubjectLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <FormProvider>
      <div className="py-8 md:py-12 px-4 sm:px-6 lg:px-8 mx-auto">
        {children}
      </div>
    </FormProvider>
  );
}
