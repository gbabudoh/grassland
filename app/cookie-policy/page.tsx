import { Cookie, MousePointer2, Settings, Info } from "lucide-react";

export const metadata = {
  title: "Cookie Policy | Grassland",
  description: "Learn how Grassland uses cookies to improve your performance experience.",
};

export default function CookiePolicy() {
  return (
    <div className="bg-gh-white min-h-screen py-24 px-6 md:px-12 lg:px-24 text-gh-charcoal">
      <div className="max-w-4xl mx-auto">
        <header className="mb-20 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gh-charcoal/5 mb-6">
            <Cookie className="w-8 h-8 text-gh-charcoal" />
          </div>
          <h1 className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter mb-4">
            Cookie Policy
          </h1>
          <p className="text-gh-charcoal/50 font-mono text-sm tracking-widest uppercase">
            Updated: April 21, 2026
          </p>
        </header>

        <div className="space-y-16 leading-relaxed">
          <section>
            <h2 className="flex items-center gap-3 text-2xl font-bold uppercase tracking-tight mb-6 font-outfit">
              <Info className="w-6 h-6" />
              1. What are cookies?
            </h2>
            <p>
              Cookies are small fragments of data stored on your device that allow us to &quot;remember&quot; your preferences, cart items, and session authentication across visits. They are essential for the core functionality of the Grassland Shop.
            </p>
          </section>

          <section>
            <h2 className="flex items-center gap-3 text-2xl font-bold uppercase tracking-tight mb-6 font-outfit">
              <Settings className="w-6 h-6" />
              2. Types of Cookies We Use
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="p-6 border border-gh-charcoal/10 rounded-2xl">
                  <h3 className="font-bold uppercase text-sm mb-3">Essential Cookies</h3>
                  <p className="text-sm opacity-70">Necessary for the platform to function. These include authentication cookies and session-based cart memory. Cannot be disabled.</p>
               </div>
               <div className="p-6 border border-gh-charcoal/10 rounded-2xl">
                  <h3 className="font-bold uppercase text-sm mb-3">Analytics Cookies</h3>
                  <p className="text-sm opacity-70">Help us understand how the GHF Community interacts with our innovation labs and product reveals.</p>
               </div>
               <div className="p-6 border border-gh-charcoal/10 rounded-2xl">
                  <h3 className="font-bold uppercase text-sm mb-3">Payment Cookies</h3>
                  <p className="text-sm opacity-70">Set by our payment provider (Stripe) to prevent fraud and ensure secure transactions.</p>
               </div>
            </div>
          </section>

          <section>
            <h2 className="flex items-center gap-3 text-2xl font-bold uppercase tracking-tight mb-6 font-outfit">
              <MousePointer2 className="w-6 h-6" />
              3. Managing Preferences
            </h2>
            <p>
              You can control and manage your cookie settings through your browser settings or via the Grassland Cookie Consent tool that appears on your first visit. Deleting essential cookies may result in the loss of cart contents or the need to re-authenticate.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
