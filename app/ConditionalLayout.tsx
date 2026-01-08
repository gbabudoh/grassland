"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SizeAI from "@/components/modals/SizeAI";
import CheckoutAI from "@/components/modals/CheckoutAI";
import SearchModal from "@/components/layout/SearchModal";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

export default function ConditionalLayout({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");
  const isDashboardRoute = pathname?.startsWith("/dashboard");

  // Admin routes: no navbar, footer, or modals
  if (isAdminRoute) {
    return <SessionProvider session={session}>{children}</SessionProvider>;
  }

  // Dashboard routes: navbar and modals, but no footer
  if (isDashboardRoute) {
    return (
      <SessionProvider session={session}>
        <Navbar />
        <SizeAI />
        <CheckoutAI />
        <SearchModal />
        {children}
      </SessionProvider>
    );
  }

  // Frontend routes: include navbar, footer, and modals
  return (
    <SessionProvider session={session}>
      <Navbar />
      <SizeAI />
      <CheckoutAI />
      <SearchModal />
      {children}
      <Footer />
    </SessionProvider>
  );
}
