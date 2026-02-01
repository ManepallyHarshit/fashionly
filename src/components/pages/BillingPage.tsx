import { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, Download, CreditCard, Wallet, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AIAssistant from '@/components/AIAssistant';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Image } from '@/components/ui/image';
import { MemberProtectedRoute } from '@/components/ui/member-protected-route';

interface Transaction {
  id: string;
  type: 'purchase' | 'sale' | 'earning';
  description: string;
  amount: number;
  date: Date;
  status: 'completed' | 'pending';
}

function BillingContent() {
  const [activeTab, setActiveTab] = useState('overview');

  const transactions: Transaction[] = [
    {
      id: '1',
      type: 'sale',
      description: 'Design sold: CYBER NEON PATTERN',
      amount: 49.99,
      date: new Date('2026-01-30'),
      status: 'completed',
    },
    {
      id: '2',
      type: 'purchase',
      description: 'Purchased: GEOMETRIC GRID SYSTEM',
      amount: -39.99,
      date: new Date('2026-01-29'),
      status: 'completed',
    },
    {
      id: '3',
      type: 'earning',
      description: 'Royalty payment from design usage',
      amount: 15.50,
      date: new Date('2026-01-28'),
      status: 'completed',
    },
    {
      id: '4',
      type: 'sale',
      description: 'Design sold: GLITCH EFFECT OVERLAY',
      amount: 29.99,
      date: new Date('2026-01-27'),
      status: 'completed',
    },
    {
      id: '5',
      type: 'purchase',
      description: 'Purchased: Fashion Accessories Bundle',
      amount: -89.99,
      date: new Date('2026-01-26'),
      status: 'completed',
    },
  ];

  const totalEarnings = transactions
    .filter((t) => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);

  const totalSpent = Math.abs(
    transactions
      .filter((t) => t.amount < 0)
      .reduce((sum, t) => sum + t.amount, 0)
  );

  const netBalance = totalEarnings - totalSpent;

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      {/* Background Image - THE LEDGER */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-10">
        <Image
          src="https://static.wixstatic.com/media/b1e8b0_2422aed773ae4a7ea09ee4038ad58758~mv2.png?originWidth=1600&originHeight=896"
          alt="The Ledger: Macro shot of sleek dark-wood texture and architectural details - Transaction & Earnings Management"
          className="w-full h-full object-cover"
        />
      </div>
      
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
            BILLING & EARNINGS
          </h1>
          <p className="font-paragraph text-base text-foreground/70 max-w-2xl mx-auto">
            MANAGE YOUR PURCHASES, TRACK DESIGNER EARNINGS, AND MONITOR YOUR FINANCIAL ACTIVITY
          </p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <Card className="p-8 bg-white/[0.03] backdrop-blur-xl border-glass-border">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-primary/20 rounded flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <ArrowUpRight className="w-5 h-5 text-primary" />
            </div>
            <div className="font-heading text-4xl text-primary mb-2">
              ${totalEarnings.toFixed(2)}
            </div>
            <div className="font-paragraph text-xs text-foreground/50 uppercase">
              TOTAL EARNINGS
            </div>
          </Card>

          <Card className="p-8 bg-white/[0.03] backdrop-blur-xl border-glass-border">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-secondary/20 rounded flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-secondary" />
              </div>
              <ArrowDownRight className="w-5 h-5 text-secondary" />
            </div>
            <div className="font-heading text-4xl text-secondary mb-2">
              ${totalSpent.toFixed(2)}
            </div>
            <div className="font-paragraph text-xs text-foreground/50 uppercase">
              TOTAL SPENT
            </div>
          </Card>

          <Card className="p-8 bg-white/[0.03] backdrop-blur-xl border-glass-border">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-primary/20 rounded flex items-center justify-center">
                <Wallet className="w-6 h-6 text-primary" />
              </div>
              <DollarSign className="w-5 h-5 text-primary" />
            </div>
            <div className="font-heading text-4xl text-primary mb-2">
              ${netBalance.toFixed(2)}
            </div>
            <div className="font-paragraph text-xs text-foreground/50 uppercase">
              NET BALANCE
            </div>
          </Card>
        </motion.div>

        {/* Tabs Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="p-8 bg-white/[0.03] backdrop-blur-xl border-glass-border">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-8">
                <TabsTrigger value="overview">OVERVIEW</TabsTrigger>
                <TabsTrigger value="transactions">TRANSACTIONS</TabsTrigger>
                <TabsTrigger value="earnings">EARNINGS</TabsTrigger>
                <TabsTrigger value="payment">PAYMENT METHODS</TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <div className="space-y-6">
                  <div>
                    <h2 className="font-heading text-2xl uppercase mb-4 text-primary">
                      RECENT ACTIVITY
                    </h2>
                    <div className="space-y-3">
                      {transactions.slice(0, 5).map((transaction) => (
                        <div
                          key={transaction.id}
                          className="flex items-center justify-between p-4 bg-white/[0.03] border border-glass-border rounded"
                        >
                          <div className="flex items-center gap-4">
                            <div
                              className={`w-10 h-10 rounded flex items-center justify-center ${
                                transaction.amount > 0
                                  ? 'bg-primary/20'
                                  : 'bg-secondary/20'
                              }`}
                            >
                              {transaction.amount > 0 ? (
                                <ArrowUpRight className="w-5 h-5 text-primary" />
                              ) : (
                                <ArrowDownRight className="w-5 h-5 text-secondary" />
                              )}
                            </div>
                            <div>
                              <div className="font-paragraph text-sm">
                                {transaction.description}
                              </div>
                              <div className="font-paragraph text-xs text-foreground/50">
                                {transaction.date.toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                          <div
                            className={`font-heading text-xl ${
                              transaction.amount > 0 ? 'text-primary' : 'text-secondary'
                            }`}
                          >
                            {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="transactions">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-heading text-2xl uppercase text-primary">
                      ALL TRANSACTIONS
                    </h2>
                    <Button variant="outline" size="sm" className="border-glass-border">
                      <Download className="w-4 h-4 mr-2" />
                      EXPORT
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {transactions.map((transaction) => (
                      <div
                        key={transaction.id}
                        className="flex items-center justify-between p-4 bg-white/[0.03] border border-glass-border rounded hover:border-primary/50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-10 h-10 rounded flex items-center justify-center ${
                              transaction.amount > 0
                                ? 'bg-primary/20'
                                : 'bg-secondary/20'
                            }`}
                          >
                            {transaction.amount > 0 ? (
                              <ArrowUpRight className="w-5 h-5 text-primary" />
                            ) : (
                              <ArrowDownRight className="w-5 h-5 text-secondary" />
                            )}
                          </div>
                          <div>
                            <div className="font-paragraph text-sm">
                              {transaction.description}
                            </div>
                            <div className="font-paragraph text-xs text-foreground/50">
                              {transaction.date.toLocaleDateString()} • {transaction.status.toUpperCase()}
                            </div>
                          </div>
                        </div>
                        <div
                          className={`font-heading text-xl ${
                            transaction.amount > 0 ? 'text-primary' : 'text-secondary'
                          }`}
                        >
                          {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="earnings">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 bg-white/[0.03] border border-glass-border rounded">
                      <h3 className="font-heading text-sm uppercase mb-4 text-primary">
                        EARNINGS BREAKDOWN
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="font-paragraph text-xs text-foreground/70">
                            Design Sales
                          </span>
                          <span className="font-paragraph text-sm text-primary">
                            $79.98
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-paragraph text-xs text-foreground/70">
                            Royalties
                          </span>
                          <span className="font-paragraph text-sm text-primary">
                            $15.50
                          </span>
                        </div>
                        <div className="flex justify-between pt-3 border-t border-glass-border">
                          <span className="font-paragraph text-sm uppercase">
                            Total
                          </span>
                          <span className="font-heading text-lg text-primary">
                            ${totalEarnings.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 bg-white/[0.03] border border-glass-border rounded">
                      <h3 className="font-heading text-sm uppercase mb-4 text-secondary">
                        PAYOUT SCHEDULE
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="font-paragraph text-xs text-foreground/70">
                            Next Payout
                          </span>
                          <span className="font-paragraph text-sm">
                            Feb 15, 2026
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-paragraph text-xs text-foreground/70">
                            Available Balance
                          </span>
                          <span className="font-paragraph text-sm text-primary">
                            ${totalEarnings.toFixed(2)}
                          </span>
                        </div>
                        <Button className="w-full mt-4 bg-primary text-primary-foreground">
                          REQUEST PAYOUT
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="payment">
                <div className="space-y-6">
                  <div>
                    <h2 className="font-heading text-2xl uppercase mb-4 text-primary">
                      PAYMENT METHODS
                    </h2>
                    <div className="space-y-3">
                      <div className="p-4 bg-white/[0.03] border border-glass-border rounded flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-primary/20 rounded flex items-center justify-center">
                            <CreditCard className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <div className="font-paragraph text-sm">
                              •••• •••• •••• 4242
                            </div>
                            <div className="font-paragraph text-xs text-foreground/50">
                              Expires 12/2027
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="border-glass-border">
                          EDIT
                        </Button>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full mt-4 border-glass-border">
                      ADD PAYMENT METHOD
                    </Button>
                  </div>

                  <div className="p-6 bg-primary/10 border border-primary/30 rounded">
                    <h3 className="font-heading text-sm uppercase mb-2 text-primary">
                      SECURE PAYMENTS
                    </h3>
                    <p className="font-paragraph text-xs text-foreground/70">
                      All transactions are encrypted and processed securely through our payment partners.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </motion.div>
      </main>

      <Footer />
      <AIAssistant />
    </div>
  );
}

export default function BillingPage() {
  return (
    <MemberProtectedRoute messageToSignIn="Sign in to access Billing & Earnings">
      <BillingContent />
    </MemberProtectedRoute>
  );
}
