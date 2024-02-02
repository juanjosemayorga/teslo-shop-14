"use server";

import { PayPalOrderStatusResponse } from "@/interfaces/paypal";

export const paypalCheckPayment = async (paypalTransactionId: string) => {
  const authToken = await getPayPalBearerToken();

  if (!authToken) {
    return {
      ok: false,
      message: "Error getting PayPal bearer token",
    };
  }

  const resp = await veryfyPayPalPayment(paypalTransactionId, authToken);

  if (!resp) {
    return {
      ok: false,
      message: "Error verifying PayPal payment",
    };
  }

  const { status, purchase_units } = resp;
  // const { amount } = purchase_units[0]; TODO:

  if (status !== "COMPLETED") {
    return {
      ok: false,
      message: "Payment not completed",
    };
  }

  // TODO: Make the update in the database

  console.log({ status, purchase_units });
};

const getPayPalBearerToken = async (): Promise<string | null> => {
  const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const PAYPAL_SECRET = process.env.PAYPAL_SECRET;
  const oauth2url = process.env.PAYPAL_OAUTH_URL ?? "";

  const base64Token = Buffer.from(
    `${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`,
    "utf-8"
  ).toString("base64");

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append("Authorization", `Basic ${base64Token}`);

  const urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "client_credentials");

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
  };

  try {
    const result = await fetch(oauth2url, requestOptions).then((response) =>
      response.json()
    );
    return result.access_token;
  } catch (error) {
    console.error("Error getting PayPal bearer token", error);
    return null;
  }
};

const veryfyPayPalPayment = async (
  paypalTransactionId: string,
  authToken: string
): Promise<PayPalOrderStatusResponse | null> => {
  const paypalOrderUrl = `${process.env.PAYPAL_ORDERS_URL}/${paypalTransactionId}`

  const myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    `Bearer ${authToken}`
  );

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  try {
    const result = await fetch(paypalOrderUrl, requestOptions).then((response) =>
      response.json()
    );

    return result;
  } catch (error) {
    console.error("Error verifying PayPal payment", error);
    return null;
  }
};