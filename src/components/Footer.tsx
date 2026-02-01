import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, Mail, ArrowUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Footer() {
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-background border-t border-border-subtle">
      <div className="max-w-[100rem] mx-auto px-6 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="font-heading text-2xl md:text-3xl uppercase tracking-tight text-primary block mb-4 hover:text-primary-hover transition-colors duration-300">
              CYBER-ATELIER
            </Link>
            <p className="font-paragraph text-sm text-foreground/70 mb-6 max-w-sm leading-relaxed">
              A HIGH-PERFORMANCE FASHION INTERFACE WHERE DESIGN MEETS TECHNOLOGY. CREATE, TRADE, AND INNOVATE IN THE DIGITAL FASHION ECOSYSTEM.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  transition={{ duration: 0.2 }}
                  className="w-10 h-10 flex items-center justify-center bg-surface border border-border-subtle hover:border-primary hover:bg-surface-alt transition-colors duration-300 rounded"
                >
                  <social.icon className="w-5 h-5 text-foreground/70 hover:text-primary transition-colors duration-300" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div 
              key={section.title}
              onMouseEnter={() => setHoveredSection(section.title)}
              onMouseLeave={() => setHoveredSection(null)}
            >
              <h3 className="font-heading text-sm uppercase mb-4 text-primary">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="font-paragraph text-sm text-foreground/70 hover:text-primary transition-colors duration-300 relative group"
                    >
                      {link.label}
                      <span className="absolute bottom-0 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border-subtle">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-paragraph text-xs text-foreground/50">
              © 2026 CYBER-ATELIER. ALL RIGHTS RESERVED.
            </p>
            <div className="flex items-center gap-6">
              <p className="font-paragraph text-xs text-foreground/50 uppercase tracking-wider">
                POWERED BY WIX TECHNOLOGY
              </p>
              <motion.button
                onClick={scrollToTop}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-8 h-8 flex items-center justify-center bg-surface border border-border-subtle hover:border-primary hover:bg-surface-alt transition-colors duration-300 rounded"
                aria-label="Scroll to top"
              >
                <ArrowUp className="w-4 h-4 text-foreground/70 hover:text-primary transition-colors duration-300" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
