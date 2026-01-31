import { Link } from 'react-router-dom';
import { useMember } from '@/integrations';
import { Menu, X, User } from 'lucide-react';
import { useState } from 'react';
import { MiniCart } from '@/wix-verticals/react-pages/react-router/routes/root';

export default function Header() {
  const { member, isAuthenticated, actions } = useMember();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'SNAP TO LINKS', href: '/snap-to-links' },
    { label: 'SHOP', href: '/store' },
    { label: 'DESIGN STUDIO', href: '/design-studio' },
    { label: 'DESIGNER FORUM', href: '/designer-forum' },
    { label: 'EDITOR', href: '/design-editor' },
    { label: 'BILLING', href: '/billing' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-xl border-b border-glass-border">
      <div className="max-w-[100rem] mx-auto px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="font-heading text-2xl uppercase tracking-tight text-primary hover:text-primary/80 transition-colors">
            CYBER-ATELIER
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="font-paragraph text-xs uppercase tracking-wider text-foreground/70 hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Link
                  to="/profile"
                  className="hidden md:flex items-center gap-2 font-paragraph text-xs uppercase text-foreground/70 hover:text-primary transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span>{member?.profile?.nickname || 'PROFILE'}</span>
                </Link>
                <button
                  onClick={actions.logout}
                  className="hidden md:block font-paragraph text-xs uppercase text-foreground/70 hover:text-secondary transition-colors"
                >
                  SIGN OUT
                </button>
              </>
            ) : (
              <button
                onClick={actions.login}
                className="hidden md:block font-paragraph text-xs uppercase px-6 py-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
                style={{ clipPath: 'polygon(10% 0, 100% 0, 90% 100%, 0 100%)' }}
              >
                SIGN IN
              </button>
            )}

            <MiniCart
              cartIconClassName="text-primary hover:text-primary/80 transition-colors"
            />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-foreground"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pt-4 border-t border-glass-border">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-paragraph text-sm uppercase tracking-wider text-foreground/70 hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              {isAuthenticated ? (
                <>
                  <Link
                    to="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-paragraph text-sm uppercase tracking-wider text-foreground/70 hover:text-primary transition-colors"
                  >
                    PROFILE
                  </Link>
                  <button
                    onClick={() => {
                      actions.logout();
                      setMobileMenuOpen(false);
                    }}
                    className="font-paragraph text-sm uppercase tracking-wider text-foreground/70 hover:text-secondary transition-colors text-left"
                  >
                    SIGN OUT
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    actions.login();
                    setMobileMenuOpen(false);
                  }}
                  className="font-paragraph text-sm uppercase tracking-wider text-primary hover:text-primary/80 transition-colors text-left"
                >
                  SIGN IN
                </button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
