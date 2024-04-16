// The code below is used to checkout the items added by the user in the cart importing stripe from client
import createStripe from "stripe-client";

const live = "iubg";
const local = "http://127.0.0.1:5001/mealstogo-6a5e0/us-central1";
const host = process.env.NODE_ENV !== "development" ? live : local;
console.log("checkout server: " + host);

const stripe = createStripe(
  "pk_test_51IXVBySCSLyNZg0SUfhbuHDtlEI9WVDBq0MWH1CzIb1VnS7HubfUngT8TirFx8pINuJ7hBXLm15jWC9BWAmnZAdn00FnGMMCMu"
);

export const cardTokenRequest = (card) => stripe.createToken({ card });

export const payRequest = (token, amount, name) => {
  console.log("checkout service payrequest------>", token, amount, name, host);
  return (
    fetch(`${host}/pay`, {
      body: JSON.stringify({ token, name, amount }),
      method: "POST",
    })
      // .then((res) => console.log("res------>", res.status))
      .then((response) => {
        if (response.status > 200) {
          return Promise.reject("something went wrong with payment");
        }
        // console.log("res------>", response);
        return response;
      })
      .catch((err) => console.log("error------>", err))
  );
};
