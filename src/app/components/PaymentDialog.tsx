import { useState } from "react";
import { Smartphone, CheckCircle2, Loader2, CreditCard } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { PayPalButtons } from "@paypal/react-paypal-js";

interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  amount: number;
  onSuccess: () => void;
}

export function PaymentDialog({ open, onOpenChange, amount, onSuccess }: PaymentDialogProps) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const handleMpesaPayment = () => {
    setLoading(true);
    setPaymentMethod("M-Pesa");
    // Simulate M-Pesa STK Push
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      // Generate mock M-Pesa code
      const code = `QR${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
      setConfirmationCode(code);
      
      // Auto close and reset after showing success
      setTimeout(() => {
        resetState();
        onSuccess();
        onOpenChange(false);
      }, 3000);
    }, 2000);
  };

  const resetState = () => {
    setSuccess(false);
    setPhoneNumber("");
    setConfirmationCode("");
    setPaymentMethod("");
    setLoading(false);
  };

  // Convert KSh to USD (approximate rate: 1 USD = 130 KSh)
  const amountInUSD = (amount / 130).toFixed(2);

  return (
    <Dialog open={open} onOpenChange={(open) => {
      if (!open) resetState();
      onOpenChange(open);
    }}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-green-600" />
            Choose Payment Method
          </DialogTitle>
          <DialogDescription>
            Complete your payment securely
          </DialogDescription>
        </DialogHeader>

        {!success ? (
          <Tabs defaultValue="mpesa" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="mpesa" className="flex items-center gap-2">
                <Smartphone className="h-4 w-4" />
                M-Pesa
              </TabsTrigger>
              <TabsTrigger value="paypal" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                PayPal
              </TabsTrigger>
            </TabsList>

            <TabsContent value="mpesa" className="space-y-4 mt-4">
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
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={handleMpesaPayment}
                disabled={!phoneNumber || loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Processing Payment...
                  </>
                ) : (
                  <>
                    <Smartphone className="h-4 w-4 mr-2" />
                    Pay with M-Pesa
                  </>
                )}
              </Button>
            </TabsContent>

            <TabsContent value="paypal" className="space-y-4 mt-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Amount to Pay:</span>
                  <div className="text-right">
                    <div className="text-2xl text-blue-600">
                      ${amountInUSD}
                    </div>
                    <div className="text-xs text-gray-500">
                      (≈ KSh {amount.toLocaleString()})
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg">
                <p className="text-xs text-blue-800">
                  💳 Pay securely using PayPal or Credit/Debit Card
                </p>
              </div>

              <div className="w-full">
                <PayPalButtons
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      intent: "CAPTURE",
                      purchase_units: [
                        {
                          amount: {
                            currency_code: "USD",
                            value: amountInUSD,
                          },
                          description: "Art254 Collection Purchase",
                        },
                      ],
                    });
                  }}
                  onApprove={async (data, actions) => {
                    if (actions.order) {
                      const details = await actions.order.capture();
                      setPaymentMethod("PayPal");
                      setConfirmationCode(details.id || "");
                      setSuccess(true);
                      
                      setTimeout(() => {
                        resetState();
                        onSuccess();
                        onOpenChange(false);
                      }, 3000);
                    }
                  }}
                  onError={(err) => {
                    console.error("PayPal Error:", err);
                    alert("Payment failed. Please try again.");
                  }}
                  style={{
                    layout: "vertical",
                    color: "blue",
                    shape: "rect",
                    label: "pay",
                  }}
                />
              </div>
            </TabsContent>
          </Tabs>
        ) : (
          <div className="py-8 text-center space-y-4">
            <CheckCircle2 className="h-16 w-16 text-green-600 mx-auto" />
            <div>
              <h3 className="text-xl mb-2">Payment Successful!</h3>
              <p className="text-gray-600">
                {paymentMethod} Confirmation Code:
              </p>
              <p className="text-lg text-green-600 mt-1 font-mono">
                {confirmationCode}
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
