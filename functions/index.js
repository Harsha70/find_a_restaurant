const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const { geocodeRequest } = require("./geocode");
const { placesRequest } = require("./places");
const { payRequest } = require("./pay");

const stripeClient = require("stripe")(
  "sk_test_51IXVBySCSLyNZg0SvNa10N170P4QOOWGQhfag9XwkA71eXrxZHKBg7xWMjMz4l6c0tgz9dfmox6vIOE9foBdk9Im00r2RIL8jd"
);
// require("stripe")(functions.config().stripe.key);

module.exports.geocode = onRequest((request, response) => {
  geocodeRequest(request, response);
});

module.exports.placesNearby = onRequest((request, response) => {
  placesRequest(request, response);
});

exports.pay = onRequest((request, response) => {
  payRequest(request, response, stripeClient);
});
