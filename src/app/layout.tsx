import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Žavesys — Build your collar",
  description: "Custom dog collar configurator. Choose your colour, charms, size and engraving.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
