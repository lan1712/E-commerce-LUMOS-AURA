import { useEffect, useState } from "react";
import { useNav } from "../context";

export function VNPayReturnPage() {
  const { navigate } = useNav();
  const [status, setStatus] = useState<string | null>(null);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);

  useEffect(() => {
    // Read URL params
    const params = new URLSearchParams(window.location.search);
    setStatus(params.get("status"));
    setOrderNumber(params.get("orderNumber"));
    
    // Clear the URL path without reloading so navigation continues to work cleanly
    window.history.replaceState({}, "", "/");
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      {status === "success" && (
        <>
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-4xl mb-6">
            ✓
          </div>
          <h1 className="text-3xl font-serif text-[#4a3f35] mb-4">Payment Successful!</h1>
          <p className="text-gray-600 max-w-md mb-8">
            Thank you for your purchase. Your payment was processed successfully via VNPay.
            <br /><br />
            Order Number: <span className="font-semibold">{orderNumber}</span>
          </p>
        </>
      )}

      {status === "failed" && (
        <>
          <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-4xl mb-6">
            ✕
          </div>
          <h1 className="text-3xl font-serif text-[#4a3f35] mb-4">Payment Failed</h1>
          <p className="text-gray-600 max-w-md mb-8">
            Unfortunately, your payment could not be processed. Please try again or choose another payment method.
            <br /><br />
            Order Number: <span className="font-semibold">{orderNumber}</span>
          </p>
        </>
      )}

      {status === "invalid" && (
        <>
          <div className="w-20 h-20 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-4xl mb-6">
            !
          </div>
          <h1 className="text-3xl font-serif text-[#4a3f35] mb-4">Invalid Payment Signature</h1>
          <p className="text-gray-600 max-w-md mb-8">
            We couldn't verify the payment response. If your account was charged, please contact support.
          </p>
        </>
      )}

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => navigate("orders")}
          className="px-8 py-3 bg-[#4a3f35] text-[#f4f0ec] rounded-full hover:bg-[#3a3129] transition-colors"
        >
          View My Orders
        </button>
        <button
          onClick={() => navigate("shop")}
          className="px-8 py-3 border border-[#4a3f35] text-[#4a3f35] rounded-full hover:bg-[#4a3f35] hover:text-[#f4f0ec] transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}
