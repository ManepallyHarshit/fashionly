import { motion } from 'framer-motion';
import { User, Mail, Calendar, Edit, Wallet, TrendingUp, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AIAssistant from '@/components/AIAssistant';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MemberProtectedRoute } from '@/components/ui/member-protected-route';
import { useMember } from '@/integrations';
import { Image } from '@/components/ui/image';
import { useUserProfileStore } from '@/stores/userProfileStore';

function ProfileContent() {
  const { member } = useMember();
  const { profile } = useUserProfileStore();

  const stats = [
    { label: 'DESIGNS CREATED', value: '12' },
    { label: 'DESIGNS PURCHASED', value: '8' },
    { label: 'TOTAL EARNINGS', value: '$245.47' },
    { label: 'FORUM RATING', value: '4.8' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="w-full max-w-[100rem] mx-auto px-8 py-16">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h1 className="font-heading text-6xl md:text-7xl uppercase mb-6">
            MY PROFILE
          </h1>
          <p className="font-paragraph text-base text-foreground/70 max-w-2xl mx-auto">
            MANAGE YOUR ACCOUNT, VIEW YOUR WALLET, AND TRACK YOUR CREATIVE JOURNEY
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <Card className="p-8 bg-white/[0.03] backdrop-blur-xl border-glass-border text-center">
              <div className="w-32 h-32 mx-auto mb-6 bg-primary/20 rounded-full flex items-center justify-center">
                {member?.profile?.photo?.url ? (
                  <Image src={member.profile.photo.url} alt="Profile" className="w-full h-full rounded-full object-cover" />
                ) : (
                  <User className="w-16 h-16 text-primary" />
                )}
              </div>

              <h2 className="font-heading text-2xl uppercase mb-2">
                {member?.profile?.nickname || member?.contact?.firstName || 'USER'}
              </h2>
              
              {member?.profile?.title && (
                <p className="font-paragraph text-sm text-foreground/70 mb-6">
                  {member.profile.title}
                </p>
              )}

              <div className="space-y-3 mb-6">
                {member?.loginEmail && (
                  <div className="flex items-center gap-3 text-left">
                    <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="font-paragraph text-xs text-foreground/70">
                      {member.loginEmail}
                    </span>
                  </div>
                )}
                
                {member?._createdDate && (
                  <div className="flex items-center gap-3 text-left">
                    <Calendar className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="font-paragraph text-xs text-foreground/70">
                      JOINED {new Date(member._createdDate).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>

              <Button className="w-full bg-primary text-primary-foreground">
                <Edit className="w-4 h-4 mr-2" />
                EDIT PROFILE
              </Button>
            </Card>

            {/* Profile Setup Status */}
            {!profile.setupCompleted && (
              <Card className="p-6 bg-secondary/10 backdrop-blur-xl border border-secondary/30 mt-6">
                <div className="flex items-start gap-3 mb-4">
                  <Settings className="w-5 h-5 text-secondary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-sm uppercase text-secondary mb-1">
                      COMPLETE YOUR PROFILE
                    </h3>
                    <p className="font-paragraph text-xs text-foreground/70 mb-3">
                      Set up your identity, physique, skin tone, and style preferences
                    </p>
                    <Link to="/setup-wizard">
                      <Button size="sm" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                        START SETUP
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            )}

            {/* Profile Data Display */}
            {profile.setupCompleted && (
              <Card className="p-6 bg-white/[0.03] backdrop-blur-xl border-glass-border mt-6">
                <h3 className="font-heading text-lg uppercase mb-4 text-primary">
                  PROFILE DATA
                </h3>
                <div className="space-y-3 text-xs font-paragraph">
                  {profile.height && (
                    <div className="flex justify-between">
                      <span className="text-foreground/70">Height:</span>
                      <span className="text-primary">{profile.height} cm</span>
                    </div>
                  )}
                  {profile.weight && (
                    <div className="flex justify-between">
                      <span className="text-foreground/70">Weight:</span>
                      <span className="text-primary">{profile.weight} kg</span>
                    </div>
                  )}
                  {profile.build && (
                    <div className="flex justify-between">
                      <span className="text-foreground/70">Build:</span>
                      <span className="text-primary uppercase">{profile.build}</span>
                    </div>
                  )}
                  {profile.skinTone && (
                    <div className="flex justify-between">
                      <span className="text-foreground/70">Skin Tone:</span>
                      <span className="text-primary uppercase">{profile.skinTone}</span>
                    </div>
                  )}
                  {profile.stylePersona && (
                    <div className="flex justify-between">
                      <span className="text-foreground/70">Style:</span>
                      <span className="text-primary uppercase">{profile.stylePersona}</span>
                    </div>
                  )}
                </div>
              </Card>
            )}

            {/* Quick Stats */}
            <Card className="p-6 bg-white/[0.03] backdrop-blur-xl border-glass-border mt-6">
              <h3 className="font-heading text-lg uppercase mb-4 text-primary">
                QUICK STATS
              </h3>
              <div className="space-y-3">
                {stats.map((stat) => (
                  <div key={stat.label} className="flex justify-between items-center">
                    <span className="font-paragraph text-xs text-foreground/70">
                      {stat.label}
                    </span>
                    <span className="font-heading text-lg text-primary">
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Wallet */}
            <Card className="p-8 bg-white/[0.03] backdrop-blur-xl border-glass-border">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Wallet className="w-6 h-6 text-primary" />
                  <h2 className="font-heading text-2xl uppercase">MY WALLET</h2>
                </div>
                <Button variant="outline" className="border-glass-border">
                  VIEW ALL
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: 'CYBER NEON PATTERN', designer: 'TECH_VISIONARY' },
                  { name: 'GEOMETRIC GRID', designer: 'GRID_MASTER' },
                  { name: 'GLITCH EFFECT', designer: 'DIGITAL_ARTIST' },
                  { name: 'HOLOGRAPHIC TEXTURE', designer: 'FUTURE_DESIGNER' },
                ].map((design) => (
                  <div
                    key={design.name}
                    className="p-4 bg-white/[0.03] border border-glass-border rounded hover:border-primary/50 transition-colors"
                  >
                    <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded mb-3" />
                    <h3 className="font-heading text-sm uppercase mb-1">
                      {design.name}
                    </h3>
                    <p className="font-paragraph text-xs text-foreground/50">
                      BY {design.designer}
                    </p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Recent Activity */}
            <Card className="p-8 bg-white/[0.03] backdrop-blur-xl border-glass-border">
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp className="w-6 h-6 text-secondary" />
                <h2 className="font-heading text-2xl uppercase">RECENT ACTIVITY</h2>
              </div>

              <div className="space-y-3">
                {[
                  {
                    action: 'Sold design',
                    item: 'CYBER NEON PATTERN',
                    date: '2 days ago',
                    type: 'sale',
                  },
                  {
                    action: 'Purchased',
                    item: 'GEOMETRIC GRID SYSTEM',
                    date: '3 days ago',
                    type: 'purchase',
                  },
                  {
                    action: 'Created design',
                    item: 'NEW HOLOGRAPHIC EFFECT',
                    date: '5 days ago',
                    type: 'create',
                  },
                  {
                    action: 'Earned royalty',
                    item: 'GLITCH EFFECT OVERLAY',
                    date: '1 week ago',
                    type: 'earning',
                  },
                ].map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-white/[0.03] border border-glass-border rounded"
                  >
                    <div>
                      <div className="font-paragraph text-sm">
                        {activity.action}: <span className="text-primary">{activity.item}</span>
                      </div>
                      <div className="font-paragraph text-xs text-foreground/50">
                        {activity.date}
                      </div>
                    </div>
                    <div
                      className={`px-3 py-1 rounded text-xs font-paragraph uppercase ${
                        activity.type === 'sale' || activity.type === 'earning'
                          ? 'bg-primary/20 text-primary'
                          : activity.type === 'purchase'
                          ? 'bg-secondary/20 text-secondary'
                          : 'bg-foreground/20 text-foreground'
                      }`}
                    >
                      {activity.type}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Account Settings */}
            <Card className="p-8 bg-white/[0.03] backdrop-blur-xl border-glass-border">
              <h2 className="font-heading text-2xl uppercase mb-6">
                ACCOUNT SETTINGS
              </h2>

              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-start border-glass-border">
                  NOTIFICATION PREFERENCES
                </Button>
                <Button variant="outline" className="w-full justify-start border-glass-border">
                  PRIVACY SETTINGS
                </Button>
                <Button variant="outline" className="w-full justify-start border-glass-border">
                  PAYMENT METHODS
                </Button>
                <Button variant="outline" className="w-full justify-start border-glass-border">
                  SECURITY & PASSWORD
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </main>

      <Footer />
      <AIAssistant />
    </div>
  );
}

export default function ProfilePage() {
  return (
    <MemberProtectedRoute>
      <ProfileContent />
    </MemberProtectedRoute>
  );
}
