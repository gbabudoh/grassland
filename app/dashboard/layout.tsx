import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import DashboardSidebar from "@/components/dashboard/Sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-[#FBFBFB] text-gh-charcoal">
       {/* Subtle Background Gradient */}
       <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-[-20%] right-[-10%] w-[1000px] h-[1000px] bg-gh-silver/5 rounded-full blur-[150px]" />
       </div>

       <DashboardSidebar />
       
       <main className="pl-72 pr-8 relative z-10 p-12 text-gh-charcoal">
          {children}
       </main>
    </div>
  );
}
