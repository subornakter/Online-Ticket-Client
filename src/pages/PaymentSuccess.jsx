import axios from "axios";
import React, { useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router";
import { IoBagCheckOutline } from "react-icons/io5";
import toast from "react-hot-toast";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const called = useRef(false); // এটি নিশ্চিত করবে রিকোয়েস্ট একবারই যাবে

  useEffect(() => {
    if (sessionId && !called.current) {
      called.current = true; // প্রথমবার কল হওয়ার পর true হয়ে যাবে

      const updatePayment = async () => {
        try {
          await axios.post(`${import.meta.env.VITE_API_URL}/payment-success`, {
            sessionId,
          });
          toast.success("Payment confirmed and recorded!");
        } catch (err) {
          console.error("Payment confirmation failed:", err);
        }
      };

      updatePayment();
    }
  }, [sessionId]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
      <div className="bg-base-100 dark:bg-slate-900 p-10 rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-slate-800 text-center max-w-lg w-full">
        <div className="flex items-center justify-center w-24 h-24 mx-auto mb-6 bg-green-100 rounded-full dark:bg-green-900/30">
          <IoBagCheckOutline className="w-12 h-12 text-green-600" />
        </div>

        <h1 className="mb-3 text-3xl font-black tracking-tight text-gray-800 uppercase dark:text-gray-100">
          Payment Successful!
        </h1>
        <p className="mb-8 font-medium text-gray-500 dark:text-gray-400">
          Thank you for choosing{" "}
          <span className="font-bold text-emerald-600">TicketBari</span>. Your
          transaction has been verified and your ticket is confirmed.
        </p>

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            to="/dashboard/bookings"
            className="px-8 py-3 text-xs font-black tracking-widest text-white uppercase transition-all shadow-lg bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl shadow-emerald-200 active:scale-95"
          >
            My Bookings
          </Link>
          <Link
            to="dashboard/transactions"
            className="px-8 py-3 text-xs font-black tracking-widest text-gray-700 uppercase transition-all bg-gray-100 dark:bg-slate-800 dark:text-gray-300 rounded-2xl hover:bg-gray-200"
          >
            View Receipt
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
