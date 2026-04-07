"use client";

import { useState } from "react";
import axios from "axios";

export default function Billing() {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/billing/checkout");
      window.location.href = res.data.url; // redirect to Stripe Checkout
    } catch (err: any) {
      console.error(err.response?.data);
      alert("Checkout failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-2xl font-bold">Upgrade to Pro</h1>
      <button
        onClick={handleCheckout}
        disabled={loading}
        className="bg-purple-600 text-white p-3 rounded"
      >
        {loading ? "Redirecting..." : "Pay with Stripe"}
      </button>
    </div>
  );
}
