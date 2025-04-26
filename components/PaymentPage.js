/* components/PaymentPage.js --------------------------------------- */
"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { fetchuser, fetchpayments, initiate } from "@/actions/useractions";
import { notFound } from "next/navigation";

export default function PaymentPage({ username }) {
  /* ---------------------------------------------------------------- */
  const [paymentForm, setPaymentForm] = useState({
    name: "",
    message: "",
    amount: "",
  });
  const [currentUser, setCurrentUser] = useState(null);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const router = useRouter();

  /* ---------------------------------------------------------------- */
  /* fetch user + top-10 payments once                                 */
  useEffect(() => {
    (async () => {
      const u = await fetchuser(username);
      if (!u) return setLoading(false); // hit 404 block below

      const ps = await fetchpayments(username);
      setCurrentUser(u);
      setPayments(ps);
      setLoading(false);
    })();
  }, [username]);

  /* ---------------------------------------------------------------- */
  /* thanks toast after redirect                                       */
  useEffect(() => {
    if (searchParams.get("paymentdone") === "true") {
      toast("Thanks for your donation!", {
        position: "top-right",
        autoClose: 5000,
        theme: "light",
        transition: Bounce,
      });
    }
  }, [searchParams]);

  /* ---------------------------------------------------------------- */
  if (loading) return <p className="text-center mt-10">Loading…</p>;
  if (!currentUser) return notFound();

  /* ---------------------------------------------------------------- */
  const handleChange = (e) =>
    setPaymentForm({ ...paymentForm, [e.target.name]: e.target.value });

  const pay = async (amount) => {
    try {
      const { url } = await initiate(amount, username, paymentForm);
      window.location.href = url; // PayPay sandbox cashier
    } catch (err) {
      toast.error("Payment initiation failed");
      console.error(err);
    }
  };

  /* ---------------------------------------------------------------- */
  return (
    <>
      <ToastContainer />

      {/* cover image + avatar */}
      <div className="cover w-full bg-red-50 relative">
        <img
          src={currentUser.coverpic || "/placeholder-cover.jpg"}
          alt=""
          className="object-cover w-full h-48 md:h-[350px] shadow-blue-700 shadow-sm"
        />
        <div className="absolute -bottom-20 right-1/2 translate-x-1/2 border-2 border-white rounded-full overflow-hidden size-36">
          <img
            src={currentUser.profilepic || "/avatar.svg"}
            alt=""
            className="object-cover size-36"
            width={128}
            height={128}
          />
        </div>
      </div>

      {/* info + pay box */}
      <div className="info flex flex-col items-center gap-2 my-24 mb-32">
        <p className="font-bold text-lg">@{username}</p>
        <p className="text-slate-400">Lets help {username} get an ocha!</p>
        <p className="text-slate-400">
          {payments.length} Payments · ¥
          {payments.reduce((t, p) => t + p.amount, 0)} raised
        </p>

        <div className="payment flex flex-col md:flex-row gap-3 w-[80%] mt-11">
          {/* supporters list */}
          <div className="w-full md:w-1/2 bg-slate-900 rounded-lg text-white p-4 md:p-10">
            <h2 className="text-2xl font-bold mb-5">Top 10 Supporters</h2>
            <ul className="text-lg space-y-4">
              {payments.length === 0 && <li>No payments yet</li>}
              {payments.map((p, i) => (
                <li key={i} className="flex gap-2 items-center">
                  <img src="/avatar.svg" alt="" width={33} />
                  <span>
                    {p.name} donated{" "}
                    <span className="font-bold">¥{p.amount}</span> – “
                    {p.message}”
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* pay form */}
          <div className="w-full md:w-1/2 bg-slate-900 rounded-lg text-white p-4 md:p-10">
            <h2 className="text-2xl font-bold mb-5">Make a Payment</h2>

            <input
              name="name"
              value={paymentForm.name}
              onChange={handleChange}
              placeholder="Enter Name"
              className="bg-slate-800 p-3 rounded-lg w-full mb-2"
            />
            <input
              name="message"
              value={paymentForm.message}
              onChange={handleChange}
              placeholder="Enter Message"
              className="bg-slate-800 p-3 rounded-lg w-full mb-2"
            />
            <input
              name="amount"
              value={paymentForm.amount}
              onChange={handleChange}
              placeholder="Enter Amount (yen)"
              className="bg-slate-800 p-3 rounded-lg w-full mb-4"
            />

            <button
              onClick={() => pay(Number(paymentForm.amount))}
              disabled={
                paymentForm.name.length < 3 ||
                paymentForm.message.length < 4 ||
                !paymentForm.amount
              }
              className="bg-gradient-to-br from-purple-900 to-blue-900 px-5 py-2.5 rounded-lg w-full disabled:bg-slate-600"
            >
              Pay
            </button>

            {/* quick amounts */}
            <div className="flex gap-2 mt-5">
              {[10000, 20000, 30000].map((amt) => (
                <button
                  key={amt}
                  onClick={() => pay(amt)}
                  className="bg-slate-800 p-3 rounded-lg flex-1"
                >
                  Pay ¥{amt}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
