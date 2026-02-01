import { Link } from 'react-router-dom';
import { useMember } from '@/integrations';
import { Menu, X, User } from 'lucide-react';
import { useState } from 'react';
import { MiniCart } from '@/wix-verticals/react-pages/react-router/routes/root';

export default function Header() {
  const { member, isAuthenticated, actions } = useMember();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'COLLECTION', href: '/store' },
    { label: 'CREATORS', href: '/designer-forum' },
    { label: 'STUDIO ZERO', href: '/design-studio' },
    { label: 'ARCHIVE', href: '/vault' },
    { label: 'ONBOARD', href: '/setup-wizard' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-xl border-b border-border-subtle">
      <div className="max-w-[100rem] mx-auto px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="font-heading text-2xl uppercase tracking-tight text-primary hover:text-primary-hover transition-colors">
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
                  className="hidden md:block font-paragraph text-xs uppercase text-foreground/70 hover:text-tech-accent transition-colors"
                >
                  SIGN OUT
                </button>
              </>
            ) : (
              <button
                onClick={actions.login}
                className="hidden md:block font-paragraph text-xs uppercase px-6 py-2 bg-primary hover:bg-primary-hover text-primary-foreground transition-all"
                style={{ clipPath: 'polygon(10% 0, 100% 0, 90% 100%, 0 100%)' }}
              >
                SIGN IN
              </button>
            )}

            <MiniCart
              cartIconClassName="text-primary hover:text-primary-hover transition-colors"
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
          <div className="lg:hidden mt-4 pt-4 border-t border-border-subtle">
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
                    className="font-paragraph text-sm uppercase tracking-wider text-foreground/70 hover:text-tech-accent transition-colors text-left"
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
                  className="font-paragraph text-sm uppercase tracking-wider text-primary hover:text-primary-hover transition-colors text-left"
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
