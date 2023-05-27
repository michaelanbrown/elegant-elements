class ApplicationController < ActionController::API
  before_action :authenticate_customer

  include ActionController::Cookies

  def current_customer
    @current_customer ||= Customer.find_by(id: session[:customer_id])
  end

  private

  def authenticate_customer
    render json: { errors: "Not authorized" }, status: :unauthorized unless current_customer
  end

end
