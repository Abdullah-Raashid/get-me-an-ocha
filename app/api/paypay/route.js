import { NextResponse } from "next/server";
import PAYPAY from "@paypayopa/paypayopa-sdk-node";
import connectDb from "@/db/connectDb";
import Payment from "@/models/payment";
import User from "@/models/User";

export const GET = async (req) => {
  const { searchParams } = new URL(req.url);
  const merchantPaymentId = searchParams.get("merchantPaymentId");
  if (!merchantPaymentId) {
    return NextResponse.json({ success: false, message: "Missing payment ID" });
  }

  await connectDb();
  // Retrieve stored Payment and user credentials
  const paymentRecord = await Payment.findOne({ oid: merchantPaymentId });
  const user = await User.findOne({ username: paymentRecord.to_user });

  // Configure PayPay
  PAYPAY.Configure({
    env: process.env.PAYPAY_ENV || "STAGING",
    clientId: user.paypayApiKey,
    clientSecret: user.paypayApiSecret,
  });

  // Fetch payment details
  const result = await PAYPAY.payment.get({ merchantPaymentId });

  if (
    result.data.status === "COMPLETED" ||
    result.data.status === "AUTHORIZED"
  ) {
    // Mark as done
    const updated = await Payment.findOneAndUpdate(
      { oid: merchantPaymentId },
      { done: true },
      { new: true }
    );
    // Redirect back with query flag
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_URL}/${updated.to_user}?paymentdone=true`
    );
  } else {
    return NextResponse.json({
      success: false,
      message: "Payment not completed",
    });
  }
};
