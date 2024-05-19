import React from 'react';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Data Fortress Inc.",
  description: "With Dashboard Entertainment: Data Fortress Inc.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
