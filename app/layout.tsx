import { ReactNode } from "react";

export const metadata = {
  title: "Album display",
  description: "Displaying albums based on what is currently playing",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
