import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, Mail } from 'lucide-react';

export default function Footer() {
  const footerSections = [
    {
      title: 'PLATFORM',
      links: [
        { label: 'Snap to Links', href: '/snap-to-links' },
        { label: 'Shop', href: '/store' },
        { label: 'Design Studio', href: '/design-studio' },
        { label: 'Designer Forum', href: '/designer-forum' },
      ],
    },
    {
      title: 'TOOLS',
      links: [
        { label: 'Design Editor', href: '/design-editor' },
        { label: 'Billing', href: '/billing' },
        { label: 'My Wallet', href: '/profile' },
      ],
    },
    {
      title: 'SUPPORT',
      links: [
        { label: 'Help Center', href: '#' },
        { label: 'Terms of Service', href: '#' },
        { label: 'Privacy Policy', href: '#' },
        { label: 'Contact Us', href: '#' },
      ],
    },
  ];

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Mail, href: '#', label: 'Email' },
  ];

  return (
    <footer className="w-full bg-background border-t border-glass-border">
      <div className="max-w-[100rem] mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="font-heading text-3xl uppercase tracking-tight text-primary block mb-4">
              CYBER-ATELIER
            </Link>
            <p className="font-paragraph text-sm text-foreground/70 mb-6 max-w-sm">
              A HIGH-PERFORMANCE FASHION INTERFACE WHERE DESIGN MEETS TECHNOLOGY. CREATE, TRADE, AND INNOVATE IN THE DIGITAL FASHION ECOSYSTEM.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 flex items-center justify-center bg-white/[0.03] border border-glass-border rounded hover:border-primary transition-colors"
                >
                  <social.icon className="w-5 h-5 text-foreground/70" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-heading text-sm uppercase mb-4 text-primary">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="font-paragraph text-sm text-foreground/70 hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-glass-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-paragraph text-xs text-foreground/50">
              © 2026 CYBER-ATELIER. ALL RIGHTS RESERVED.
            </p>
            <p className="font-paragraph text-xs text-foreground/50 uppercase tracking-wider">
              POWERED BY WIX TECHNOLOGY
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
