"use client";

import SocialIcons from "./SocialIcons";
import FooterSection from "./FooterSection";

const Footer = () => {
  return (
    <footer className="bg-[#0B31BD] text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* Brand & Social */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Schäfer Tutoring</h2>
            <SocialIcons />
          </div>

          {/* Rechtliches */}
          <FooterSection
            title="Rechtliches"
            links={[
              { label: "Datenschutz", href: "#" },
              { label: "AGB Schüler", href: "#" },
              { label: "AGB Lehrer", href: "#" },
              { label: "Widerrufsbelehrung", href: "#" },
              { label: "Impressum", href: "#" },
              { label: "Cookie-Richtlinie", href: "#" },
            ]}
          />

          {/* Unternehmen */}
          <FooterSection
            title="Unternehmen"
            links={[
              { label: "Über uns", href: "#" },
              { label: "Blog", href: "#" },
              { label: "Karriere", href: "#" },
              { label: "Kontakt", href: "#" },
            ]}
          />

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Newsletter</h3>
            <div className="space-y-3 mt-8">
              <input
                type="email"
                placeholder="E-Mail eingeben"
                className="w-full px-4 py-2 rounded-lg bg-[#9CA8DB] text-white placeholder:text-white focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button className="w-2/3 bg-white text-black font-semibold py-2 px-6 rounded-lg hover:bg-gray-100 transition">
                Anmelden
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-12 pt-8 border-t border-white/20 text-center">
          <p className="text-sm text-white/80">
            © 2025 Schäfer Tutoring. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
