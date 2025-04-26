/*  @/actions/useractions.js  */
"use server";

import PAYPAY from "@paypayopa/paypayopa-sdk-node";
import Payment from "@/models/payment"; // match filename
import User from "@/models/User";
import connectDb from "@/db/connectDb";

/* --------------------------------------------------------------- */
/* Base SDK configuration (project-wide sandbox keys)              */
/* --------------------------------------------------------------- */
PAYPAY.Configure({
  clientId: process.env.PAYPAY_API_KEY,
  clientSecret: process.env.PAYPAY_API_SECRET,
  env: process.env.PAYPAY_ENV || "STAGING", // STAGING == sandbox
});

/* --------------------------------------------------------------- */
/* 1. Create a PayPay QR / deeplink                                */
/* --------------------------------------------------------------- */
export const initiate = async (amount, toUsername, paymentForm) => {
  await connectDb();

  /*  pull user-specific keys if they exist  */
  const user = await User.findOne({ username: toUsername }).lean();
  PAYPAY.Configure({
    clientId: user?.paypayid || process.env.PAYPAY_API_KEY,
    clientSecret: user?.paypaysecret || process.env.PAYPAY_API_SECRET,
    env: process.env.PAYPAY_ENV || "STAGING",
    merchantId: user?.paypayMerchantId || process.env.PAYPAY_MERCHANT_ID,
  });

  const merchantPaymentId =
    "paypay_" + Date.now() + "_" + Math.random().toString(36).slice(2, 8);

  const payload = {
    merchantPaymentId,
    amount: { amount: Number(amount), currency: "JPY" }, // whole yen
    codeType: "ORDER_QR",
    orderDescription: paymentForm.message || "",
    redirectUrl: `${process.env.NEXT_PUBLIC_URL}/api/paypay/route`,
    redirectType: "WEB_LINK",
  };

  /*  old-style SDK: QRCodeCreate(payload, cb)  */
  const data = await new Promise((resolve, reject) => {
    PAYPAY.QRCodeCreate(payload, (resp) => {
      const code = resp?.BODY?.resultInfo?.code;
      if (code === "SUCCESS") resolve(resp.BODY.data); // { url, deeplink, … }
      else
        reject(
          new Error(
            `PayPay error ${code}: ${resp?.BODY?.resultInfo?.message || ""}`
          )
        );
    });
  });

  /*  store pending payment  */
  await Payment.create({
    oid: merchantPaymentId,
    amount, // already whole-yen
    to_user: toUsername,
    name: paymentForm.name,
    message: paymentForm.message,
    done: false,
  });

  return { url: data.url, deeplink: data.deeplink };
};

/* --------------------------------------------------------------- */
/* 2. fetchuser(username)                                          */
/* --------------------------------------------------------------- */
export const fetchuser = async (username) => {
  await connectDb();
  const u = await User.findOne({ username }).lean();
  return JSON.parse(JSON.stringify(u)); // remove Mongo proxies
};

/* --------------------------------------------------------------- */
/* 3. fetchpayments(username)                                      */
/* --------------------------------------------------------------- */
export const fetchpayments = async (username) => {
  await connectDb();
  return await Payment.find({ to_user: username, done: true })
    .sort({ amount: -1 })
    .limit(10)
    .lean();
};

/* --------------------------------------------------------------- */
/* 4. updateProfile(formData, oldUsername)                         */
/* --------------------------------------------------------------- */
export const updateProfile = async (formData, oldUsername) => {
  await connectDb();
  const input = Object.fromEntries(formData);

  if (oldUsername !== input.username) {
    const clash = await User.findOne({ username: input.username });
    if (clash) return { error: "Username already exists." };

    await User.updateOne({ email: input.email }, input);
    await Payment.updateMany(
      { to_user: oldUsername },
      { to_user: input.username }
    );
  } else {
    await User.updateOne({ email: input.email }, input);
  }
};
