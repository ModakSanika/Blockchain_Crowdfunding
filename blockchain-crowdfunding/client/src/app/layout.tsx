import "../styles/globals.css";
import { Inter } from "next/font/google";
import { Metadata } from "next";
import { ReactNode } from "react";
import { useError } from "../context/ErrorContext";
import { Web3Provider } from "../context/Web3Context";
import { ErrorProvider } from "../context/ErrorContext";
import Navigation from "./components/Navigation";

export const metadata: Metadata = {
  title: "Crowdfunding Platform",
  description: "Fund your dreams with blockchain technology",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navigation />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ErrorProvider>
      <Web3Provider>
        {children}
      </Web3Provider>
    </ErrorProvider>
  );
}