"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Wallet, ArrowLeft, ArrowDownToLine, ArrowUpFromLine, Shield,
  Clock, CheckCircle2, AlertCircle, Loader2, Plus, Minus,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
];

export default function WalletPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [balance, setBalance] = useState(2450);
  const [escrow, setEscrow] = useState(770);
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [showDeposit, setShowDeposit] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [amount, setAmount] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) router.push("/signin");
  }, [user, loading, router]);

  const handleDeposit = () => {
    const amt = parseFloat(amount);
    if (!amt || amt <= 0) {
      setError("Enter a valid amount.");
      return;
    }
    setBalance(balance + amt);
    setTransactions([
      {
        id: crypto.randomUUID(),
        type: "deposit",
        amount: amt,
        description: "Bank deposit",
        date: new Date().toISOString().split("T")[0],
      },
      ...transactions,
    ]);
    setAmount("");
    setError(null);
    setShowDeposit(false);
  };

  const handleWithdraw = () => {
    const amt = parseFloat(amount);
    if (!amt || amt <= 0) {
      setError("Enter a valid amount.");
      return;
    }
    if (amt > balance) {
      setError("Insufficient available balance.");
      return;
    }
    setBalance(balance - amt);
    setTransactions([
      {
        id: crypto.randomUUID(),
        type: "withdraw",
        amount: amt,
        description: "Withdrawal to bank",
        date: new Date().toISOString().split("T")[0],
      },
      ...transactions,
    ]);
    setAmount("");
    setError(null);
    setShowWithdraw(false);
  };

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader />

      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        {/* Back */}
        <Link
          href="/dashboard"
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to dashboard
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Wallet</h1>
          <p className="mt-1 text-sm text-gray-500">Manage your money and escrow</p>
        </div>

        {/* Main Balance Card - Grey style */}
        <Card className="mb-6 overflow-hidden border-0 shadow-sm">
          <CardContent className="bg-white p-6">
            <p className="text-sm font-medium text-gray-500">Total Available</p>
            <p className="mt-1 text-4xl font-semibold tracking-tight text-gray-900">
              ${balance.toLocaleString()}
            </p>
            <p className="mt-1 text-sm text-gray-400">Ready to use or withdraw</p>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <Button
                className="h-11 bg-gray-900 text-white hover:bg-gray-800"
                onClick={() => {
                  setError(null);
                  setShowDeposit(true);
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Money
              </Button>
              <Button
                variant="outline"
                className="h-11 border-gray-200"
                onClick={() => {
                  setError(null);
                  setShowWithdraw(true);
                }}
              >
                <Minus className="mr-2 h-4 w-4" />
                Withdraw
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Escrow Card */}
        <Card className="mb-6 border-0 shadow-sm">
          <CardContent className="flex items-center justify-between p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                <Shield className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">In Escrow</p>
                <p className="text-xs text-gray-500">Protected until job is confirmed</p>
              </div>
            </div>
            <p className="text-lg font-semibold text-gray-900">${escrow.toLocaleString()}</p>
          </CardContent>
        </Card>

        {/* Escrow Info */}
        <div className="mb-8 rounded-xl bg-gray-100 px-4 py-3 text-sm text-gray-600">
          <div className="flex items-start gap-2">
            <Shield className="mt-0.5 h-4 w-4 shrink-0 text-gray-500" />
            <p>
              Money in escrow is held safely and only released when both you and the other party confirm the job is complete.
            </p>
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-semibold text-gray-900">Recent Activity</h2>
          </div>

          <Card className="border-0 shadow-sm">
            <CardContent className="divide-y divide-gray-100 p-0">
              {transactions.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100">
                      {tx.type === "deposit" || tx.type === "payment" ? (
                        <ArrowDownToLine className="h-4 w-4 text-gray-600" />
                      ) : tx.type === "withdraw" ? (
                        <ArrowUpFromLine className="h-4 w-4 text-gray-600" />
                      ) : (
                        <Shield className="h-4 w-4 text-gray-600" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{tx.description}</p>
                      <p className="text-xs text-gray-500">{tx.date}</p>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    {tx.type === "withdraw" || tx.type === "escrow-in" ? "-" : "+"}${tx.amount}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Deposit Dialog */}
      <Dialog open={showDeposit} onOpenChange={setShowDeposit}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Money</DialogTitle>
          </DialogHeader>
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="space-y-2">
            <Label htmlFor="deposit-amount">Amount (USD)</Label>
            <Input
              id="deposit-amount"
              type="number"
              min="1"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="h-12 text-lg"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeposit(false)}>
              Cancel
            </Button>
            <Button className="bg-gray-900 hover:bg-gray-800" onClick={handleDeposit}>
              Add Money
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Withdraw Dialog */}
      <Dialog open={showWithdraw} onOpenChange={setShowWithdraw}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Withdraw Money</DialogTitle>
          </DialogHeader>
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="space-y-2">
            <Label htmlFor="withdraw-amount">Amount (USD)</Label>
            <Input
              id="withdraw-amount"
              type="number"
              min="1"
              max={balance}
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="h-12 text-lg"
            />
            <p className="text-xs text-gray-500">
              Available: ${balance.toLocaleString()}
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowWithdraw(false)}>
              Cancel
            </Button>
            <Button className="bg-gray-900 hover:bg-gray-800" onClick={handleWithdraw}>
              Withdraw
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <SiteFooter />
    </div>
  );
}
