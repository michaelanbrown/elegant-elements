require 'stripe'

class ChargesController < ApplicationController

  def create

    Stripe.api_key = 'sk_test_51NMeYtK92FCM7B9Ee0AlRZsplGSXOjRB8Oe32bo5p779yweLtzp9W8xRm84zD0B7uA4v3LtfBZyhQ7KBjKI7Lm6F006xcRE91U'

    begin

    @line_items = params[:items].map{|i| {
        price: i[:stripe_key],
        quantity: i[:quantity]
    }}

    session = Stripe::Checkout::Session.create({
      line_items: @line_items,
      mode: 'payment',
      success_url: "http://localhost:4000/success",
      cancel_url: "http://localhost:4000/cancel"
    })
    render json: {url: session.url, message: session}, status: :ok
    
    rescue Stripe::CardError => e
        render json: { message: 'oops' }, status: :not_acceptable
    end
  end
end