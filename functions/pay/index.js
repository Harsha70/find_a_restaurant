module.exports.payRequest = (request, response, stripeClient) => {
  const body = JSON.parse(request.body);
  const { token, amount } = body;
  stripeClient.paymentIntents
    .create({
      amount,
      currency: "INR",
      payment_method_types: ["card"],
      payment_method_data: {
        type: "card",
        card: {
          token,
        },
      },
      confirm: true,
    })
    .then((paymentIntents) => {
      response.json(paymentIntents);
    })
    .catch((error) => {
      console.log("error------>", error);
      response.status(400);
      response.send(error);
    });
  // response.send("success");
};
