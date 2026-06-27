import { useEffect, useState } from "react";
import { useNav } from "../context";

export function MomoReturnPage() {
  const { navigate } = useNav();
  const [status, setStatus] = useState<string | null>(null);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);

  useEffect(() => {
    // Read URL params from MoMo redirect
    const params = new URLSearchParams(window.location.search);
    const resultCode = params.get("resultCode");
    const momoOrderId = params.get("orderId");
    
    if (resultCode === "0") {
      setStatus("success");
    } else {
      setStatus("failed");
    }

    if (momoOrderId) {
      // Extract original order ID by removing the timestamp suffix (e.g. LA-12345-1623423423 -> LA-12345)
      const lastDashIdx = momoOrderId.lastIndexOf("-");
      setOrderNumber(lastDashIdx > 0 ? momoOrderId.substring(0, lastDashIdx) : momoOrderId);
    }
    
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
            Thank you for your purchase. Your payment was processed successfully via MoMo.
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
            Unfortunately, your payment could not be processed or was cancelled. Please try again or choose another payment method.
            <br /><br />
            Order Number: <span className="font-semibold">{orderNumber}</span>
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
