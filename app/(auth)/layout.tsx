export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#F1F1F1] relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-gh-charcoal/5 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-gh-charcoal/5 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {children}
      </div>
    </div>
  );
}
