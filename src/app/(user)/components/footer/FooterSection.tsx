"use client";

interface FooterSectionProps {
  title: string;
  links: { label: string; href: string }[];
}

const FooterSection = ({ title, links }: FooterSectionProps) => {
  return (
    <div>
      <h3 className="font-semibold text-xl mb-4">{title}</h3>
      <ul className="space-y-4 mt-8 text-sm">
        {links.map((link, idx) => (
          <li key={idx}>
            <a href={link.href} className="hover:underline">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterSection;
