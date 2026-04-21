import { Gavel, Scale, ShoppingBag, AlertTriangle } from "lucide-react";

export const metadata = {
  title: "Terms of Service | Grassland",
  description: "Platform usage and sales terms for Grassland.",
};

export default function TermsOfService() {
  return (
    <div className="bg-gh-white min-h-screen py-24 px-6 md:px-12 lg:px-24 text-gh-charcoal">
      <div className="max-w-4xl mx-auto">
        <header className="mb-20 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gh-charcoal/5 mb-6">
            <Gavel className="w-8 h-8 text-gh-charcoal" />
          </div>
          <h1 className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter mb-4">
            Terms of Service
          </h1>
          <p className="text-gh-charcoal/50 font-mono text-sm tracking-widest uppercase">
            Effective Date: April 21, 2026
          </p>
        </header>

        <div className="space-y-16 leading-relaxed">
          <section>
            <h2 className="flex items-center gap-3 text-2xl font-bold uppercase tracking-tight mb-6 font-outfit">
              <Scale className="w-6 h-6" />
              1. Agreement to Terms
            </h2>
            <p>
              By accessing or using the Grassland platform, you agree to be bound by these Terms of Service. If you do not agree to all of these terms, you are prohibited from using the platform.
            </p>
          </section>

          <section>
            <h2 className="flex items-center gap-3 text-2xl font-bold uppercase tracking-tight mb-6 font-outfit">
              <ShoppingBag className="w-6 h-6" />
              2. Sales & Pre-Orders
            </h2>
            <p className="mb-4">
              Grassland offers both ready-to-ship products and pre-order &quot;Innovation Lab&quot; releases.
            </p>
            <ul className="list-disc pl-6 space-y-4">
              <li><strong>Pre-Orders:</strong> Charges for pre-orders are captured as a deposit or full payment as specified at checkout. Shipping dates for pre-orders are estimates and subject to change.</li>
              <li><strong>Pricing:</strong> All prices are in USD. We reserve the right to change prices at any time without prior notice.</li>
              <li><strong>Authenticity:</strong> All G1 Performance Matrix products come with a unique Neural Signature and a digital certificate of authenticity.</li>
            </ul>
          </section>

          <section>
            <h2 className="flex items-center gap-3 text-2xl font-bold uppercase tracking-tight mb-6 font-outfit">
              <AlertTriangle className="w-6 h-6" />
              3. Intellectual Property
            </h2>
            <p>
              The content on the platform, including but not limited to 3D models, site design, text, graphics, and code, is the property of Grassland Global S.A. and is protected by copyright and other intellectual property laws.
            </p>
          </section>

          <section className="pt-12 border-t border-gh-charcoal/10 text-gh-charcoal/60 text-sm">
            <p>
              Grassland reserves the right to terminate access to the platform for any user who violates these terms. These terms are governed by the laws of the jurisdiction in which Grassland Global S.A. is registered.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
