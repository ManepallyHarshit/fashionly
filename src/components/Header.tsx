import { Link } from 'react-router-dom';
import { useMember } from '@/integrations';
import { Menu, X, User, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { MiniCart } from '@/wix-verticals/react-pages/react-router/routes/root';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const { member, isAuthenticated, actions } = useMember();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'COLLECTION', href: '/store' },
    { label: 'CREATORS', href: '/designer-forum' },
    { label: 'STUDIO ZERO', href: '/design-studio' },
    { label: 'ARCHIVE', href: '/vault' },
    { label: 'ONBOARD', href: '/setup-wizard' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-xl border-b border-border-subtle">
      <div className="max-w-[100rem] mx-auto px-6 md:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="font-heading text-xl md:text-2xl uppercase tracking-tight text-primary hover:text-primary-hover transition-colors duration-300">
            CYBER-ATELIER
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="font-paragraph text-xs uppercase tracking-wider text-foreground/70 hover:text-primary transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3 md:gap-4">
            {isAuthenticated ? (
              <>
                {/* Profile Dropdown */}
                <div className="hidden md:block relative">
                  <button
                    onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                    className="flex items-center gap-2 font-paragraph text-xs uppercase text-foreground/70 hover:text-primary transition-colors duration-300 px-3 py-2 rounded hover:bg-white/5"
                  >
                    <User className="w-4 h-4" />
                    <span>{member?.profile?.nickname || 'PROFILE'}</span>
                    <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${profileMenuOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  <AnimatePresence>
                    {profileMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-48 bg-surface border border-border-subtle rounded overflow-hidden"
                      >
                        <Link
                          to="/profile"
                          onClick={() => setProfileMenuOpen(false)}
                          className="block px-4 py-3 font-paragraph text-xs uppercase text-foreground/70 hover:text-primary hover:bg-white/5 transition-colors duration-300"
                        >
                          View Profile
                        </Link>
                        <button
                          onClick={() => {
                            actions.logout();
                            setProfileMenuOpen(false);
                          }}
                          className="w-full text-left px-4 py-3 font-paragraph text-xs uppercase text-foreground/70 hover:text-tech-accent hover:bg-white/5 transition-colors duration-300"
                        >
                          Sign Out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <button
                onClick={actions.login}
                className="hidden md:block font-paragraph text-xs uppercase px-6 py-2 bg-primary hover:bg-primary-hover text-primary-foreground transition-all duration-300 rounded-sm"
                style={{ clipPath: 'polygon(10% 0, 100% 0, 90% 100%, 0 100%)' }}
              >
                SIGN IN
              </button>
            )}

            <MiniCart
              cartIconClassName="text-primary hover:text-primary-hover transition-colors duration-300"
            />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-foreground hover:text-primary transition-colors duration-300 p-2"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden mt-4 pt-4 border-t border-border-subtle overflow-hidden"
            >
              <nav className="flex flex-col gap-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-paragraph text-sm uppercase tracking-wider text-foreground/70 hover:text-primary transition-colors duration-300 px-3 py-2 rounded hover:bg-white/5"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="border-t border-border-subtle my-2 pt-2">
                  {isAuthenticated ? (
                    <>
                      <Link
                        to="/profile"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block font-paragraph text-sm uppercase tracking-wider text-foreground/70 hover:text-primary transition-colors duration-300 px-3 py-2 rounded hover:bg-white/5"
                      >
                        Profile
                      </Link>
                      <button
                        onClick={() => {
                          actions.logout();
                          setMobileMenuOpen(false);
                        }}
                        className="w-full text-left font-paragraph text-sm uppercase tracking-wider text-foreground/70 hover:text-tech-accent transition-colors duration-300 px-3 py-2 rounded hover:bg-white/5"
                      >
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => {
                        actions.login();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full text-left font-paragraph text-sm uppercase tracking-wider text-primary hover:text-primary-hover transition-colors duration-300 px-3 py-2 rounded hover:bg-white/5"
                    >
                      Sign In
                    </button>
                  )}
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
