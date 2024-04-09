import stripe

# Set your secret API key
stripe.api_key = 'your_secret_api_key'

def charge_credit_card(amount, currency, card_token):
    try:
        # Create a charge
        charge = stripe.Charge.create(
            amount=amount,
            currency=currency,
            source=card_token,  # obtained with Stripe.js or Checkout
            description='Charge for product or service'
        )
        # Payment was successful
        return charge
    except stripe.error.CardError as e:
        # Payment failed due to card error
        return e
    except stripe.error.RateLimitError as e:
        # Too many requests made to the API too quickly
        return e
    except stripe.error.InvalidRequestError as e:
        # Invalid parameters were supplied to Stripe's API
        return e
    except stripe.error.AuthenticationError as e:
        # Authentication with Stripe's API failed
        # (maybe you changed API keys recently)
        return e
    except stripe.error.APIConnectionError as e:
        # Network communication with Stripe failed
        return e
    except stripe.error.StripeError as e:
        # Some other Stripe error occurred
        return e
    except Exception as e:
        # Something else happened, completely unrelated to Stripe
        return e

# Example usage:
amount = 1000  # Amount in cents
currency = 'usd'
card_token = 'tok_visa'  # Replace with an actual token obtained from Stripe.js or Checkout

response = charge_credit_card(amount, currency, card_token)

if isinstance(response, stripe.Charge):
    print("Payment successful:", response.id)
else:
    print("Payment failed:", response)

