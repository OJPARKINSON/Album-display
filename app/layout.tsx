import { ReactNode } from "react";

import "../styles/index.css";

export const metadata = {
  title: "Album display",
  description: "Displaying albums based on what is currently playing",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="m-0 p-0">{children}</body>
    </html>
  );
}
