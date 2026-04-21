import { ShieldCheck, Lock, Eye, FileText } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | Grassland",
  description: "How we protect your data and privacy at Grassland.",
};

export default function PrivacyPolicy() {
  return (
    <div className="bg-gh-white min-h-screen py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <header className="mb-20 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gh-charcoal/5 mb-6">
            <ShieldCheck className="w-8 h-8 text-gh-charcoal" />
          </div>
          <h1 className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter text-gh-charcoal mb-4">
            Privacy Policy
          </h1>
          <p className="text-gh-charcoal/50 font-mono text-sm tracking-widest uppercase">
            Last Updated: April 21, 2026
          </p>
        </header>

        <div className="space-y-16 text-gh-charcoal/80 leading-relaxed">
          <section>
            <h2 className="flex items-center gap-3 text-2xl font-bold uppercase tracking-tight text-gh-charcoal mb-6 font-outfit">
              <Eye className="w-6 h-6" />
              1. Information Collection
            </h2>
            <p className="mb-4">
              At Grassland, we collect information to provide better services to all our users. The type of information we collect depends on how you use our platform.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Account Information:</strong> Name, email, and password when you register.</li>
              <li><strong>Transaction Data:</strong> Payment details processed securely via Stripe.</li>
              <li><strong>Performance Metrics:</strong> Anonymous data from our innovation lab tools if you participate in GHF testing.</li>
            </ul>
          </section>

          <section>
            <h2 className="flex items-center gap-3 text-2xl font-bold uppercase tracking-tight text-gh-charcoal mb-6 font-outfit">
              <Lock className="w-6 h-6" />
              2. Data Security
            </h2>
            <p className="mb-4">
              We employ advanced encryption and security protocols to safeguard your personal information. Our systems are built on next-gen architecture designed to prevent unauthorized access and data breaches.
            </p>
            <div className="p-6 bg-gh-charcoal text-white rounded-2xl flex items-start gap-4">
               <FileText className="w-6 h-6 mt-1 flex-shrink-0" />
               <p className="text-sm font-medium opacity-80">
                 We do not store your full credit card details. All financial transactions are handled through Stripe&apos;s secure, PCI-compliant infrastructure.
               </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold uppercase tracking-tight text-gh-charcoal mb-6 font-outfit">
              3. Analytics & Cookies
            </h2>
            <p>
              We use cookies to enhance your experience, maintain your session, and understand how you interact with our &quot;Fame Network&quot; and Shop. You can manage your preferences through our Cookie Consent tool.
            </p>
          </section>

          <section className="pt-12 border-t border-gh-charcoal/10">
            <h2 className="text-2xl font-bold uppercase tracking-tight text-gh-charcoal mb-6 font-outfit">
              4. Contact Us
            </h2>
            <p className="mb-8">
              If you have questions about our privacy practices, please contact our data protection team:
            </p>
            <a href="mailto:privacy@grassland.com" className="inline-block px-8 py-4 bg-gh-charcoal text-white rounded-full font-bold hover:scale-105 transition-all shadow-lg shadow-gh-charcoal/20">
              privacy@grassland.com
            </a>
          </section>
        </div>
      </div>
    </div>
  );
}
