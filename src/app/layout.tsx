import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "@/providers/QueryProvider";
import { Toaster } from "react-hot-toast";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export const metadata: Metadata = {
  title: "KIFGO | INTERN TRAINING",
  description: "This is a simple blog app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className={`font-sans antialiased`}>
        <QueryProvider>
          {" "}
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "#333",
                color: "#fff",
              },
            }}
          />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryProvider>
      </body>
    </html>
  );
}
