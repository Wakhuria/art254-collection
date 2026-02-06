import { useState } from "react";
import { Smartphone, CheckCircle2, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";

interface MpesaPaymentProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  amount: number;
  onSuccess: () => void;
}

export function MpesaPayment({ open, onOpenChange, amount, onSuccess }: MpesaPaymentProps) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [mpesaCode, setMpesaCode] = useState("");

  const handlePayment = () => {
    setLoading(true);
    // Simulate M-Pesa STK Push
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      // Generate mock M-Pesa code
      const code = `QR${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
      setMpesaCode(code);
      
      // Auto close and reset after showing success
      setTimeout(() => {
        setSuccess(false);
        setPhoneNumber("");
        setMpesaCode("");
        onSuccess();
        onOpenChange(false);
      }, 3000);
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5 text-green-600" />
            M-Pesa Payment
          </DialogTitle>
          <DialogDescription>
            Complete your payment using M-Pesa
          </DialogDescription>
        </DialogHeader>

        {!success ? (
          <div className="space-y-4 py-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Amount to Pay:</span>
                <span className="text-2xl text-green-600">
                  KSh {amount.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">M-Pesa Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="0712345678"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                disabled={loading}
              />
              <p className="text-xs text-gray-500">
                Enter your Safaricom number to receive the STK push
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg">
              <p className="text-xs text-blue-800">
                📱 You will receive an M-Pesa prompt on your phone. 
                Enter your M-Pesa PIN to complete the payment.
              </p>
            </div>

            <Button
              className="w-full"
              onClick={handlePayment}
              disabled={!phoneNumber || loading}
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Processing Payment...
                </>
              ) : (
                "Pay with M-Pesa"
              )}
            </Button>
          </div>
        ) : (
          <div className="py-8 text-center space-y-4">
            <CheckCircle2 className="h-16 w-16 text-green-600 mx-auto" />
            <div>
              <h3 className="text-xl mb-2">Payment Successful!</h3>
              <p className="text-gray-600">
                M-Pesa Confirmation Code:
              </p>
              <p className="text-lg text-green-600 mt-1">
                {mpesaCode}
              </p>
            </div>
            <p className="text-sm text-gray-500">
              Thank you for your purchase!
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}