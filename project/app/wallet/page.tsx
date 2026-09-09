"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Wallet, ArrowLeft, ArrowDownToLine, ArrowUpFromLine, Shield,
  Clock, CheckCircle2, AlertCircle, Loader2, TrendingUp, TrendingDown,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { useAuth } from "@/components/auth-provider";

interface Transaction {
  id: string;
  type: "deposit" | "withdraw" | "escrow-in" | "escrow-out" | "payment";
  amount: number;
  description: string;
  date: string;
}

const initialTransactions: Transaction[] = [
  { id: "1", type: "payment", amount: 650, description: "Payment received - Logo design", date: "2026-09-03" },
  { id: "2", type: "escrow-in", amount: 120, description: "Funds held - Kitchen repair", date: "2026-09-02" },
  { id: "3", type: "deposit", amount: 500, description: "Bank deposit", date: "2026-08-28" },
  { id: "4", type: "withdraw", amount: 300, description: "Withdrawal to bank", date: "2026-08-25" },
  { id: "5", type: "payment", amount: 300, description: "Payment received - Marketing consult", date: "2026-08-20" },
  { id: "6", type: "escrow-out", amount: 650, description: "Escrow released - Logo design", date: "2026-09-03" },
];

export default function WalletPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [balance, setBalance] = useState(2450);
  const [escrow, setEscrow] = useState(770);
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [showDeposit, setShowDeposit] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [amount, setAmount] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) router.push("/signin");
  }, [user, loading, router]);

  const handleDeposit = () => {
    const amt = parseFloat(amount);
    if (!amt || amt <= 0) { setError("Enter a valid amount."); return; }
    setBalance(balance + amt);
    setTransactions([
      { id: crypto.randomUUID(), type: "deposit", amount: amt, description: "Bank deposit", date: new Date().toISOString().split("T")[0] },
      ...transactions,
    ]);
    setAmount(""); setError(null); setShowDeposit(false);
  };

  const handleWithdraw = () => {
    const amt = parseFloat(amount);
    if (!amt || amt <= 0) { setError("Enter a valid amount."); return; }
    if (amt > balance) { setError("Insufficient available balance."); return; }
    setBalance(balance - amt);
    setTransactions([
      { id: crypto.randomUUID(), type: "withdraw", amount: amt, description: "Withdrawal to bank", date: new Date().toISOString().split("T")[0] },
      ...transactions,
    ]);
    setAmount(""); setError(null); setShowWithdraw(false);
  };

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-secondary/20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const txIcon = (type: Transaction["type"]) => {
    if (type === "deposit") return <ArrowDownToLine className="h-4 w-4 text-success" />;
    if (type === "withdraw") return <ArrowUpFromLine className="h-4 w-4 text-destructive" />;
    if (type === "escrow-in" || type === "escrow-out") return <Shield className="h-4 w-4 text-primary" />;
    return <CheckCircle2 className="h-4 w-4 text-success" />;
  };

  const txSign = (type: Transaction["type"]) => {
    if (type === "withdraw") return "-";
    if (type === "escrow-in") return "-";
    return "+";
  };

  return (
    <div className="min-h-screen bg-secondary/20">
      <SiteHeader />

      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <Link href="/dashboard" className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />
          Back to dashboard
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <Wallet className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground">Wallet</h1>
              <p className="text-sm text-muted-foreground">Manage your balance, escrow, and transactions</p>
            </div>
          </div>
        </div>

        {/* Balance cards */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Card className="border-border/60">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">Available Balance</p>
              <p className="mt-1 text-3xl font-bold text-foreground">${balance.toLocaleString()}</p>
              <p className="mt-1 text-xs text-muted-foreground">Ready to withdraw or spend</p>
            </CardContent>
          </Card>
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                <p className="text-sm text-muted-foreground">In Escrow</p>
              </div>
              <p className="mt-1 text-3xl font-bold text-foreground">${escrow.toLocaleString()}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Locked until both parties confirm the job is done
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Escrow notice */}
        <Alert className="mb-6 border-primary/20 bg-primary/5">
          <Shield className="h-4 w-4 text-primary" />
          <AlertDescription className="text-foreground">
            Escrow funds cannot be withdrawn until both the client and provider confirm the job is complete. This protects both parties during the work.
          </AlertDescription>
        </Alert>

        {/* Action buttons */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Card className="group cursor-pointer border-border/60 transition-all hover:border-primary/30 hover:shadow-md" onClick={() => { setError(null); setShowDeposit(true); }}>
            <CardContent className="flex flex-col items-center gap-3 p-6 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-success/10">
                <ArrowDownToLine className="h-6 w-6 text-success" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Deposit</h3>
                <p className="text-sm text-muted-foreground">Add funds from your bank</p>
              </div>
            </CardContent>
          </Card>

          <Card className="group cursor-pointer border-border/60 transition-all hover:border-primary/30 hover:shadow-md" onClick={() => { setError(null); setShowWithdraw(true); }}>
            <CardContent className="flex flex-col items-center gap-3 p-6 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-destructive/10">
                <ArrowUpFromLine className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Withdraw</h3>
                <p className="text-sm text-muted-foreground">Send funds to your bank</p>
              </div>
            </CardContent>
          </Card>

          <Card className="group cursor-pointer border-border/60 transition-all hover:border-primary/30 hover:shadow-md" onClick={() => setShowHistory(true)}>
            <CardContent className="flex flex-col items-center gap-3 p-6 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Transactions</h3>
                <p className="text-sm text-muted-foreground">View your full history</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent transactions preview */}
        <Card className="border-border/60">
          <CardContent className="p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold text-foreground">Recent Transactions</h3>
              <button onClick={() => setShowHistory(true)} className="text-xs text-primary hover:underline">View all</button>
            </div>
            <div className="space-y-3">
              {transactions.slice(0, 5).map((tx) => (
                <div key={tx.id} className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary">
                    {txIcon(tx.type)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{tx.description}</p>
                    <p className="text-xs text-muted-foreground">{tx.date}</p>
                  </div>
                  <p className={`font-semibold ${tx.type === "withdraw" || tx.type === "escrow-in" ? "text-destructive" : "text-success"}`}>
                    {txSign(tx.type)}${tx.amount}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Deposit Dialog */}
      <Dialog open={showDeposit} onOpenChange={setShowDeposit}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Deposit Funds</DialogTitle>
          </DialogHeader>
          {error && <Alert variant="destructive"><AlertCircle className="h-4 w-4" /><AlertDescription>{error}</AlertDescription></Alert>}
          <div className="space-y-2">
            <Label htmlFor="deposit-amount">Amount ($)</Label>
            <Input id="deposit-amount" type="number" min="1" placeholder="Enter amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeposit(false)}>Cancel</Button>
            <Button onClick={handleDeposit}>Deposit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Withdraw Dialog */}
      <Dialog open={showWithdraw} onOpenChange={setShowWithdraw}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Withdraw Funds</DialogTitle>
          </DialogHeader>
          {error && <Alert variant="destructive"><AlertCircle className="h-4 w-4" /><AlertDescription>{error}</AlertDescription></Alert>}
          <div className="space-y-2">
            <Label htmlFor="withdraw-amount">Amount ($)</Label>
            <Input id="withdraw-amount" type="number" min="1" max={balance} placeholder="Enter amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
            <p className="text-xs text-muted-foreground">Available: ${balance.toLocaleString()}</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowWithdraw(false)}>Cancel</Button>
            <Button onClick={handleWithdraw}>Withdraw</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Transaction History Dialog */}
      <Dialog open={showHistory} onOpenChange={setShowHistory}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Transaction History</DialogTitle>
          </DialogHeader>
          <div className="max-h-[400px] space-y-3 overflow-y-auto">
            {transactions.map((tx) => (
              <div key={tx.id} className="flex items-center gap-3 border-b border-border/40 pb-3 last:border-0">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary">
                  {txIcon(tx.type)}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{tx.description}</p>
                  <p className="text-xs text-muted-foreground">{tx.date}</p>
                </div>
                <p className={`font-semibold ${tx.type === "withdraw" || tx.type === "escrow-in" ? "text-destructive" : "text-success"}`}>
                  {txSign(tx.type)}${tx.amount}
                </p>
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowHistory(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <SiteFooter />
    </div>
  );
}
